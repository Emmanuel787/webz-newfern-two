$(window).on('load', function () {
  const tl = gsap.timeline({ defaults: { ease: 'power1.out' } });

  $('.svg-dark').delay(500).fadeOut();

  //hero-center-text:start
  tl.to('.intro-two-title', { y: '0%', duration: 0.7, delay: 1, opacity: 1, stagger: 0.05 });

  tl.to('.intro-two-title', { y: '100%', duration: 1, delay: 0.2, opacity: 1, stagger: 0.05 });
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

});
