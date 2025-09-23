//===============================================================
// debounce function
//===============================================================
function debounce(func, wait) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

//===============================================================
// Menu-related
//===============================================================

// Manage selectors with variables
var $menubar = $('#menubar');
var $menubarHdr = $('#menubar_hdr');
var $headerNav = $('header nav');

// menu
$(window).on(
  'load resize',
  debounce(function () {
    if (window.innerWidth < 9999) {
      // This is the breakpoint setting
      // Processing for small devices
      $('body').addClass('small-screen').removeClass('large-screen');
      $menubar.addClass('display-none').removeClass('display-block');
      $menubarHdr.removeClass('display-none ham').addClass('display-block');
    } else {
      // Processing for large devices
      $('body').addClass('large-screen').removeClass('small-screen');
      $menubar.addClass('display-block').removeClass('display-none');
      $menubarHdr.removeClass('display-block').addClass('display-none');

      // If dropdown menu is open, close it
      $('.ddmenu_parent > ul').hide();
    }
  }, 10)
);

$(function () {
  // Process when hamburger menu is clicked
  $menubarHdr.click(function () {
    $(this).toggleClass('ham');
    if ($(this).hasClass('ham')) {
      $menubar.addClass('display-block');
    } else {
      $menubar.removeClass('display-block');
    }
  });

  // Process to close menu when anchor link is clicked
  $menubar.find('a[href*="#"]').click(function () {
    $menubar.removeClass('display-block');
    $menubarHdr.removeClass('ham');
  });

  // Prevent default behavior of a tags with empty links (for dropdown parent li tags)
  $menubar.find('a[href=""]').click(function () {
    return false;
  });
  $headerNav.find('a[href=""]').click(function () {
    return false;
  });

  // Dropdown menu processing
  $menubar.find('li:has(ul)').addClass('ddmenu_parent');
  $('.ddmenu_parent > a').addClass('ddmenu');
  $headerNav.find('li:has(ul)').addClass('ddmenu_parent');
  $('.ddmenu_parent > a').addClass('ddmenu');

  // Variable to store touch start position
  var touchStartY = 0;

  // For touch devices
  $('.ddmenu')
    .on('touchstart', function (e) {
      // Record touch start position
      touchStartY = e.originalEvent.touches[0].clientY;
    })
    .on('touchend', function (e) {
      // Get touch end position
      var touchEndY = e.originalEvent.changedTouches[0].clientY;

      // Calculate the difference between touch start and touch end positions
      var touchDifference = touchStartY - touchEndY;

      // Control dropdown only if it's not a scroll action (small difference)
      if (Math.abs(touchDifference) < 10) {
        // Treat as a tap if movement is less than 10px
        var $nextUl = $(this).next('ul');
        if ($nextUl.is(':visible')) {
          $nextUl.stop().hide();
        } else {
          $nextUl.stop().show();
        }
        $('.ddmenu').not(this).next('ul').hide();
        return false; // Prevent following the dropdown link
      }
    });

  // For PC
  $('.ddmenu_parent').hover(
    function () {
      $(this).children('ul').stop().show();
    },
    function () {
      $(this).children('ul').stop().hide();
    }
  );

  // Close dropdown if using in-page links within the dropdown
  $('.ddmenu_parent ul a').click(function () {
    $('.ddmenu_parent > ul').hide();
  });
});

//===============================================================
// Prevent body scrolling only when the small menu is open.
//===============================================================
$(function () {
  function toggleBodyScroll() {
    // Check condition
    if (
      $('#menubar_hdr').hasClass('ham') &&
      !$('#menubar_hdr').hasClass('display-none')
    ) {
      // If #menubar_hdr has 'ham' class and does not have 'display-none' class, prevent scrolling
      $('body').css({
        overflow: 'hidden',
        height: '100%',
      });
    } else {
      // Otherwise, re-enable scrolling
      $('body').css({
        overflow: '',
        height: '',
      });
    }
  }

  // Check on initial load
  toggleBodyScroll();

  // Use MutationObserver for dynamic class changes
  const observer = new MutationObserver(toggleBodyScroll);
  observer.observe(document.getElementById('menubar_hdr'), {
    attributes: true,
    attributeFilter: ['class'],
  });
});

//===============================================================
// Smooth scroll (Version 2024-1) - Standard type
//===============================================================
$(function () {
  // Selector for the "back to top" button
  var topButton = $('.pagetop');
  // Class name for displaying the "back to top" button
  var scrollShow = 'pagetop-show';

  // Function to perform smooth scrolling
  // target specifies the selector for the destination element or '#' for page top
  function smoothScroll(target) {
    // Calculate the scroll destination (0 for page top, otherwise element's position)
    var scrollTo = target === '#' ? 0 : $(target).offset().top;
    // Animate the smooth scroll
    $('html, body').animate({ scrollTop: scrollTo }, 500);
  }

  // Set click events for in-page links and the "back to top" button
  $('a[href^="#"], .pagetop').click(function (e) {
    e.preventDefault(); // Cancel default anchor behavior
    var id = $(this).attr('href') || '#'; // Get the href attribute of the clicked element, or '#' if none
    smoothScroll(id); // Execute smooth scroll
  });

  // Toggle display of the "back to top" button based on scroll position
  $(topButton).hide(); // Hide button initially
  $(window).scroll(function () {
    if ($(this).scrollTop() >= 300) {
      // If scroll position exceeds 300px
      $(topButton).fadeIn().addClass(scrollShow); // Show the button
    } else {
      $(topButton).fadeOut().removeClass(scrollShow); // Otherwise hide it
    }
  });

  // Process if a URL hash exists on page load
  if (window.location.hash) {
    // Immediately scroll to the top of the page
    $('html, body').scrollTop(0);
    // Wait a little and then perform smooth scroll
    setTimeout(function () {
      smoothScroll(window.location.hash);
    }, 10);
  }
});

//===============================================================
// General open/close process
//===============================================================
$(function () {
  $('.openclose').next().hide();
  $('.openclose').click(function () {
    $(this).next().slideToggle();
    $('.openclose').not(this).next().slideUp();
  });
});

//===============================================================
// Text fade-in effect
//===============================================================
$(function () {
  $('.fade-in-text').on('inview', function (event, isInView) {
    // Check if this element has already been animated
    if (isInView && !$(this).data('animated')) {
      // If the animation hasn't run yet
      let innerHTML = '';
      const text = $(this).text();
      $(this).text('');

      for (let i = 0; i < text.length; i++) {
        innerHTML += `<span class="char" style="animation-delay: ${
          i * 0.1
        }s;">${text[i] === ' ' ? '&nbsp;' : text[i]}</span>`;
      }

      $(this).html(innerHTML).css('visibility', 'visible');
      // Mark that the animation has been executed
      $(this).data('animated', true);
    }
  });
});

//===============================================================
// Thumbnail switching on detail pages
//===============================================================
$(function () {
  // Initial display: For each .thumbnail-view, show the first image of the immediately following .thumbnail
  $('.thumbnail-view').each(function () {
    var firstThumbnailSrc = $(this)
      .next('.thumbnail')
      .find('img:first')
      .attr('src');
    var defaultImage = $('<img>').attr('src', firstThumbnailSrc);
    $(this).append(defaultImage);
  });

  // Action when a thumbnail is clicked
  $('.thumbnail img').click(function () {
    var imgSrc = $(this).attr('src');
    var newImage = $('<img>').attr('src', imgSrc).hide();

    // Get the .thumbnail-view element immediately before this thumbnail
    var targetPhoto = $(this).parent('.thumbnail').prev('.thumbnail-view');

    targetPhoto.find('img').fadeOut(400, function () {
      targetPhoto.empty().append(newImage);
      newImage.fadeIn(400);
    });
  });
});

//===============================================================
// Slideshow
//===============================================================
$(function () {
  var slides = $('#mainimg .slide');
  var slideCount = slides.length;
  var currentIndex = 0;

  slides.eq(currentIndex).css('opacity', 1).addClass('active');

  setInterval(function () {
    var nextIndex = (currentIndex + 1) % slideCount;
    slides.eq(currentIndex).css('opacity', 0).removeClass('active');
    slides.eq(nextIndex).css('opacity', 1).addClass('active');
    currentIndex = nextIndex;
  }, 4000); // Switch slides every 4 seconds
});

//===============================================================
// Image scroll fade-in animation
//===============================================================
$(function () {
  const photoFadeinElements = document.querySelectorAll(".photo-fadein");

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.2
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-inview");
        observer.unobserve(entry.target);
      }
    });
  }, options);

  photoFadeinElements.forEach(el => {
    observer.observe(el);
  });
});