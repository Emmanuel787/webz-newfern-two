//dot-navigation
$(document).ready(function () {
  $('.awesome-tooltip').tooltip({
    placement: 'left'
  });
  // $(window).bind('scroll', function (e) {
  //   dotnavigation();
  // });
  function dotnavigation() {
    var numSections = $('.section').length;
    $('#dot-nav li a').removeClass('active').parent('li').removeClass('active');
    $('.section').each(function (i, item) {
      var ele = $(item), nextTop;
      if (typeof ele.next().offset() != "undefined") {
        nextTop = ele.next().offset().top;
      }
      else {
        nextTop = $(document).height();
      }
      if (ele.offset() !== null) {
        thisTop = ele.offset().top - ((nextTop - ele.offset().top) / numSections);
      }
      else {
        thisTop = 0;
      }
      var docTop = $(document).scrollTop();
      if (docTop >= thisTop && (docTop < nextTop)) {
        $('#dot-nav li').eq(i).addClass('active');
      }
    });
  }
  /* get clicks working */
  $('#dot-nav li').click(function () {
    var id = $(this).find('a').attr("href"),
      posi,
      ele,
      padding = 0;
    ele = $(id);
    posi = ($(ele).offset() || 0).top - padding;
    $('html, body').animate({ scrollTop: posi }, 'slow');
    return false;
  });
  /* end dot nav */
});
//stick-to-top
var startProductBarPos = -1;
window.onscroll = function () {
  var bar = document.getElementById("dot-nav");
  if (startProductBarPos < 0) startProductBarPos = findPosY(bar);

  if (pageYOffset > startProductBarPos) {
    bar.style.position = 'fixed';
    bar.style.top = 0;
    $(".chap-one-wrapper-mf, .ab-box-1-img").css({
      "padding-top": "8.5em"
    });
    $(".chapter-one-container-mf2").css({
      "margin-top": "9em"
    });

  } else {
    bar.style.position = 'relative';
    $(".chap-one-wrapper-mf, .ab-box-1-img").css({
      "padding-top": ""
    });
    $(".chapter-one-container-mf2").css({
      "margin-top": ""
    });
  }
};
function findPosY(obj) {
  var curtop = 0;
  if (typeof (obj.offsetParent) != 'undefined' && obj.offsetParent) {
    while (obj.offsetParent) {
      curtop += obj.offsetTop;
      obj = obj.offsetParent;
    }
    curtop += obj.offsetTop;
  }
  else if (obj.y)
    curtop += obj.y;
  return curtop;
}
