// up
$('.up').on('inview', function (event, isInView) {
  if (isInView) {
    $(this).addClass('upstyle');
  } else {
    $(this).removeClass('upstyle');
  }
});

// down
$('.down').on('inview', function (event, isInView) {
  if (isInView) {
    $(this).addClass('downstyle');
  } else {
    $(this).removeClass('downstyle');
  }
});

// transform1
$('.transform1').on('inview', function (event, isInView) {
  if (isInView) {
    $(this).addClass('transform1style');
  } else {
    $(this).removeClass('transform1style');
  }
});

// transform2
$('.transform2').on('inview', function (event, isInView) {
  if (isInView) {
    $(this).addClass('transform2style');
  } else {
    $(this).removeClass('transform2style');
  }
});

// transform3
$('.transform3').on('inview', function (event, isInView) {
  if (isInView) {
    $(this).addClass('transform3style');
  } else {
    $(this).removeClass('transform3style');
  }
});

// blur
$('.blur').on('inview', function (event, isInView) {
  if (isInView) {
    $(this).addClass('blurstyle');
  } else {
    $(this).removeClass('blurstyle');
  }
});
