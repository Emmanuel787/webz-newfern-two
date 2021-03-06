$(document).ready(function () {
  function delay(n) {
    n = n || 2000;
    return new Promise((done) => {
      setTimeout(() => {
        done();
      }, n);
    });
  }

  function pageTransition() {
    var tl = gsap.timeline();

    tl.to(".loading-screen", {
      duration: 1,
      height: "100vh",
      bottom: "0%",
      ease: "Expo.easeInOut",
    });

    tl.to(".loading-screen", {
      duration: 2,
      height: "100vh",
      bottom: "100%",
      ease: "Expo.easeInOut",
      delay: 0.3,
    });

    tl.set(".loading-screen", { bottom: "-100%" });
  }

  function contentAnimation() {
    var tl = gsap.timeline();
  }

  $(function () {
    barba.init({
      sync: false,
      transitions: [
        {
          //Before the transition, this goes
          async leave(data) {
            const done = this.async();

            pageTransition();
            await delay(1000);
            done();

            $(window).scrollTop(0);

          },

          //after the transition this will re-init...//
          async enter(data) {
            contentAnimation();

            $(window).scrollTop(0);

            //divide////////////////////////////////////////////////////////////////////

            const tl = gsap.timeline({ defaults: { ease: 'power1.out' } });

            //divide////////////////////////////////////////////////////////////////////

            var rellax = new Rellax(".rellax", {
              center: false,
            });

            $(function () {
              $(window).scroll(function () {
                var scroll = $(window).scrollTop();
                if (scroll >= 1) {
                  rellax.refresh();
                }
              });
            });

            //divide////////////////////////////////////////////////////////////////////
            //meet-fernmarie-chapters
            var $content = $('.menu-content');
            function showContent(type) {
              $content.hide().filter('.' + type).show();
            }
            $('.menu').on('click', '.menu-btn', function (e) {
              showContent(e.currentTarget.hash.slice(1));
              e.preventDefault();
            });
            // show 'about' content only on page load (if you want)
            showContent('chapterOne');
            //
            //submenus
            var showMeetFernSubMenu = $('.show-mf-sub-menu');
            var meetFernSubMenu = $('.mf-submenu-container');
            //
            showMeetFernSubMenu.on('mouseenter', function(){
              meetFernSubMenu.animate({ top: '4em', opacity: '1' }, 1000, $.bez([0.19, 1, 0.22, 1]));
            });
            //
            meetFernSubMenu.on('mouseleave', function(){
              $(this).delay(100).animate({ top: '-5em', opacity: '0' }, 3000, $.bez([0.19, 1, 0.22, 1]));
            });
            //
            $('body').on('click', function () {
              meetFernSubMenu.delay(100).animate({ top: '-5em', opacity: '0' }, 3000, $.bez([0.19, 1, 0.22, 1]));
            });

            //home.html slider
            (function ($) {
              "use strict";
              $.fn.sliderResponsive = function (settings) {
                var set = $.extend(
                  {
                    slidePause: 5000,
                    fadeSpeed: 800,
                    autoPlay: "off",
                    showArrows: "off",
                    hideDots: "off",
                    hoverZoom: "on",
                    titleBarTop: "off"
                  },
                  settings
                );
                var $slider = $(this);
                var size = $slider.find("> div").length; //number of slides
                var position = 0; // current position of carousal
                var sliderIntervalID; // used to clear autoplay
                // Add a Dot for each slide
                $slider.append("<ul></ul>");
                $slider.find("> div").each(function () {
                  $slider.find("> ul").append('<li></li>');
                });
                // Put .show on the first Slide
                $slider.find("div:first-of-type").addClass("show");
                // Put .showLi on the first dot
                $slider.find("li:first-of-type").addClass("showli");
                //fadeout all items except .show
                $slider.find("> div").not(".show").fadeOut();
                // If Autoplay is set to 'on' than start it
                if (set.autoPlay === "on") {
                  startSlider();
                }
                // If showarrows is set to 'on' then don't hide them
                if (set.showArrows === "on") {
                  $slider.addClass('showArrows');
                }
                // If hideDots is set to 'on' then hide them
                if (set.hideDots === "on") {
                  $slider.addClass('hideDots');
                }
                // If hoverZoom is set to 'off' then stop it
                if (set.hoverZoom === "off") {
                  $slider.addClass('hoverZoomOff');
                }
                // If titleBarTop is set to 'on' then move it up
                if (set.titleBarTop === "on") {
                  $slider.addClass('titleBarTop');
                }
                // function to start auto play
                function startSlider() {
                  sliderIntervalID = setInterval(function () {
                    nextSlide();
                  }, set.slidePause);
                }
                // on mouseover stop the autoplay
                $slider.mouseover(function () {
                  if (set.autoPlay === "on") {
                    clearInterval(sliderIntervalID);
                  }
                });
                // on mouseout starts the autoplay
                $slider.mouseout(function () {
                  if (set.autoPlay === "on") {
                    startSlider();
                  }
                });
                //on right arrow click
                $slider.find("> .right").click(nextSlide);
                //on left arrow click
                $slider.find("> .left").click(prevSlide);
                // Go to next slide
                function nextSlide() {
                  position = $slider.find(".show").index() + 1;
                  if (position > size - 1) position = 0;
                  changeCarousel(position);
                }
                // Go to previous slide
                function prevSlide() {
                  position = $slider.find(".show").index() - 1;
                  if (position < 0) position = size - 1;
                  changeCarousel(position);
                }
                //when user clicks slider button
                $slider.find(" > ul > li").click(function () {
                  position = $(this).index();
                  changeCarousel($(this).index());
                });
                //this changes the image and button selection
                function changeCarousel() {
                  $slider.find(".show").removeClass("show").fadeOut();
                  $slider
                    .find("> div")
                    .eq(position)
                    .fadeIn(set.fadeSpeed)
                    .addClass("show");
                  // The Dots
                  $slider.find("> ul").find(".showli").removeClass("showli");
                  $slider.find("> ul > li").eq(position).addClass("showli");
                }
                return $slider;
              };
            })(jQuery);
            //////////////////////////////////////////////
            // Activate each slider - change options
            //////////////////////////////////////////////
            $(document).ready(function () {
              $("#slider1").sliderResponsive({
                // Using default everything
                // slidePause: 5000,
                // fadeSpeed: 800,
                // autoPlay: "on",
                // showArrows: "off",
                // hideDots: "off",
                // hoverZoom: "on",
                // titleBarTop: "off"
              });
            });

            //HIDDEN MENU COMMANDS
            var overLay = $('.hid-menu-overlayFx');
            var showMbMenu = $('.open-menu');
            var hideMbMenu = $('.close-menu');
            var hiddenMenu = $('.hidden-mb-menu');

            showMbMenu.on('click', function () {
              hiddenMenu.delay(500).animate({ right: '', opacity: '1' }, 1000, $.bez([0.10, 1, 0.4, 1]));
              hideMbMenu.delay(1200).animate({ opacity: '1', top: '0' }, 1000, $.bez([0.19, 1, 0.22, 1]));
              overLay.fadeIn(300);
            });

            hideMbMenu.on('click', function () {
              hiddenMenu.animate({ right: '-50em', opacity: '8' }, 1000, $.bez([0.19, 1, 0.22, 1]));
              hideMbMenu.animate({ right: '0', opacity: '0', top: '-5em' }, 1000, $.bez([0.19, 1, 0.22, 1]));
              overLay.delay(300).fadeOut();
            });
            //on-scroll
            $(function () {
              var backUp = $('.back-up-wrapper');
              $(window).scroll(function () {
                var scroll = $(window).scrollTop();
                if (scroll >= 2000) {
                  backUp.fadeIn();
                } else {
                  backUp.fadeOut();
                }
              });
            });

            /*
            dot-activator an deactivator
            {When click on one chapter activate and deactivate the rest}
            */
            //1
            $('.at1').on('click', function(){
              $('.at1').addClass('active');
              $('.at2').removeClass('active');
              $('.at3').removeClass('active');
              $('.at4').removeClass('active');
              $('.at5').removeClass('active');
            });
            //2
            $('.at2').on('click', function () {
              $('.at2').addClass('active');
              $('.at1').removeClass('active');
              $('.at3').removeClass('active');
              $('.at4').removeClass('active');
              $('.at5').removeClass('active');
            });
            //3
            $('.at3').on('click', function () {
              $('.at3').addClass('active');
              $('.at1').removeClass('active');
              $('.at2').removeClass('active');
              $('.at4').removeClass('active');
              $('.at5').removeClass('active');
            });
            //4
            $('.at4').on('click', function () {
              $('.at4').addClass('active');
              $('.at1').removeClass('active');
              $('.at2').removeClass('active');
              $('.at3').removeClass('active');
              $('.at5').removeClass('active');
            });
            //5
            $('.at5').on('click', function () {
              $('.at5').addClass('active');
              $('.at1').removeClass('active');
              $('.at2').removeClass('active');
              $('.at3').removeClass('active');
              $('.at4').removeClass('active');
            });

            //upcoming-events
            $('.ue2-btn').on('click', function(){
              $('.ue-one-container').hide();
              $('.ue-two-container').show();

              $('.ue-one-transition-effect-box').animate({ height: '100%' }, 0, $.bez([0.19, 1, 0.22, 1])).delay(2000).fadeOut(1000);
              $('.ue-one-transition-effect-box').show();
              $('.ue-one-p').delay(500).fadeIn().delay(200).fadeOut();
            });

            $('.ue2-btn-prev').on('click', function () {
              $('.ue-one-container').show();
              $('.ue-two-container').hide();

              $('.ue-two-transition-effect-box').animate({ height: '100%' }, 0, $.bez([0.19, 1, 0.22, 1])).delay(2000).fadeOut(1000);
              $('.ue-two-transition-effect-box').show();
              $('.ue-two-p').delay(500).fadeIn().delay(200).fadeOut();
            });

            /*
            if !E=doThisHere();start
            */
            function GetIEVersion() {
              var sAgent = window.navigator.userAgent;
              var Idx = sAgent.indexOf("MSIE");
              // If IE, return version number.
              if (Idx > 0)
                return parseInt(sAgent.substring(Idx + 5, sAgent.indexOf(".", Idx)));
              // If IE 11 then look for Updated user agent string.
              else if (!!navigator.userAgent.match(/Trident\/7\./))
                return 11;
              else
                return 0; //It is not IE
            }
            //usage
            if (GetIEVersion() > 0) {
              $('#arrow, #arrow').addClass('arrow-ie');
              $('#arrow, #arrow').css({
                "top":"35%"
              });
              $('.line-tru').css({
                "margin":"0",
                "width":"55%"
              });
              $('.watch-my-latest-wrapper').css({
                "margin-left":"-9em"
              });
            }
            $('.go-meet, .go-consulting, .go-contact, .go-home, .go-chap').on('click', function () {
              $('.transition-fx').fadeIn(500);
            });

            $('.svg-dark').delay(500).fadeOut();

            //hero-center-text:start
            tl.to('.intro-two-title', { y: '0%', duration: 0.7, delay: 1, opacity: 1, stagger: 0.05 });

            tl.to('.intro-two-title', { y: '100%', duration: 1, delay: 1.3, opacity: 1, stagger: 0.05 });
            //hero-center-text:end

            //intro-one:start
            tl.to('.intro-one', {
              y: '-100%',
              duration: 0.7,
              delay: 0.7
            }, '-=.9');

            //intro-two:start
            tl.to('.intro-two', {
              y: '-100%',
              duration: 0.5,
              delay: 0.7,
            }, '-=.7');
            //intro-two:end

            //intro-three:start
            tl.to('.intro-three', {
              y: '-100%',
              duration: 0.5,
              delay: 0.5,
            }, '-=.7');
            //intro-three:end

            tl.to('.dsb-txt-appear', { y: '0%', duration: 1, delay: 3.2, stagger: 0.10 }, "-=1");

            /*
            if !E=doThisHere();end
            */


          },
          async once(data) {
            contentAnimation();
          },
        },
      ],
    });
  });
});


