$(document).ready(function () {
  const buttonPrev = $('.prev');
  const buttonNext = $('.next');

  function getActiveSlide(currentSlider){
    let sliderElement = $('#' + currentSlider)[0];
    let activeSlide = $(sliderElement).find('.active')[0];
    return activeSlide;
  }

  function getFirstSlide(currentSlider) {
    let sliderElement = $('#' + currentSlider)[0];
    let firstSlide = $(sliderElement).children()[0];
    return firstSlide;
  }

  function getSlideBeforeLast(currentSlider) {
    let sliderElement = $('#' + currentSlider)[0];
    let activeSlide = $(sliderElement).find('.active')[0];
    let activeIndex = $(activeSlide).index();
    activeIndex -= 1;
    let SlideBeforeLast = $(sliderElement).children().eq(activeIndex);
    return SlideBeforeLast;
  }

  function getSlideAfterLast(currentSlider) {
    let sliderElement = $('#' + currentSlider)[0];
    let activeSlide = $(sliderElement).find('.active')[0];
    let activeIndex = $(activeSlide).index();
    activeIndex += 1;
    let SlideAfterLast = $(sliderElement).children().eq(activeIndex);
    return SlideAfterLast;
  }

  function prevSlide(slider) {
    let activeSlide = getActiveSlide(slider);
    let activeWidth = $(activeSlide).width();
    let nextActiveSlide = getSlideBeforeLast(slider);
    const clone = $(activeSlide).clone();
    $(clone).removeClass("active");
    let sliderParent = $('#' + slider)[0];
    $(sliderParent).prepend(clone);
    let totalMove = 0 - activeWidth - 10;
    $("#" + slider).animate({
      right: totalMove
    });
    $(activeSlide).removeClass("active");
    $(nextActiveSlide).addClass("active");
    $(buttonPrev).prop('disabled', true);
    $(buttonNext).prop('disabled', true);
    setTimeout(function () {
      sliderParent.removeChild(activeSlide);
      $("#" + slider).css({
        right: 0
      });
      $(buttonPrev).prop('disabled', false);
      $(buttonNext).prop('disabled', false);
    }, 500);
  }

  function nextSlide(slider) {
    let firstSlide = getFirstSlide(slider);
    let activeSlide = getActiveSlide(slider);
    let firstSlideWidth = $(firstSlide).width();
    const clone = $(firstSlide).clone();
    let sliderParent = $('#' + slider)[0];
    let currentPosition = 0 - firstSlideWidth - 10;
    $("#" + slider).css({
      right: currentPosition
    });
    $(sliderParent).append(clone);
    let totalMove = currentPosition + firstSlideWidth + 10;
    $("#" + slider).animate({
      right: totalMove
    });
    let nextActiveSlide = getSlideAfterLast(slider);
    $(nextActiveSlide).addClass("active");
    $(activeSlide).removeClass("active");
    $(buttonPrev).prop('disabled', true);
    $(buttonNext).prop('disabled', true);
    setTimeout(function () {
      $(sliderParent).find('img:first').remove();
      $("#" + slider).css({
        right: 0
      });
      $(buttonPrev).prop('disabled', false);
      $(buttonNext).prop('disabled', false);
    }, 500);
  }

  buttonPrev.on('click', () => {
    prevSlide('slider-top');
    prevSlide('slider-bottom');
  });
  buttonNext.on('click', () => {
    nextSlide('slider-top');
    nextSlide('slider-bottom');
  });
});