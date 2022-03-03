$(document).ready(function(){

	const buttonPrev = $('.prev');
	const buttonNext = $('.next');

	function getActiveSlide(currentSlider){
		let sliderElement = document.getElementById(currentSlider);
		let activeSlide = sliderElement.querySelector('.active');
		return activeSlide;
	}

	function getFirstSlide(currentSlider){
		let sliderElement = document.getElementById(currentSlider);
		let firstSlide = sliderElement.children[0];
		return firstSlide;
	}

	function getSlideBeforeLast(currentSlider){
		let sliderElement = document.getElementById(currentSlider);
		let activeSlide = sliderElement.querySelector('.active');
		let activeIndex = $(activeSlide).index();
		
		activeIndex -= 1;
		let SlideBeforeLast = sliderElement.children[activeIndex];
		return SlideBeforeLast;
	}

	function getSlideAfterLast(currentSlider){
		let sliderElement = document.getElementById(currentSlider);
		let activeSlide = sliderElement.querySelector('.active');
		let activeIndex = $(activeSlide).index();
		
		activeIndex += 1;
		let SlideAfterLast = sliderElement.children[activeIndex];
		return SlideAfterLast;
	}

	function prevSlide(slider){
		let activeSlide = getActiveSlide(slider);
		let activeWidth = activeSlide.offsetWidth;
		let nextActiveSlide = getSlideBeforeLast(slider);
		const clone = activeSlide.cloneNode(true);

		$(clone).removeClass("active");

		let sliderParent = document.getElementById(slider);
		sliderParent.insertAdjacentElement ('afterBegin', clone);

		let totalMove = 0 - activeWidth - 10;
		$("#" + slider).animate({right: totalMove});

		$(activeSlide).removeClass("active");
		$(nextActiveSlide).addClass("active");

		let buttonTop = document.querySelector('.prev');
		let buttonBottom = document.querySelector('.next');
		buttonTop.disabled = true;
		buttonBottom.disabled = true;
	
		setTimeout(function () {
			sliderParent.removeChild(activeSlide);
			$("#" + slider).css({right: 0});
			buttonTop.disabled = false;
			buttonBottom.disabled = false;
		}, 500);
	}

	function nextSlide(slider){
		let firstSlide = getFirstSlide(slider);
		let activeSlide = getActiveSlide(slider);
		let firstSlideWidth = firstSlide.offsetWidth;

		const clone = firstSlide.cloneNode(true);

		let sliderParent = document.getElementById(slider);
		let currentPosition =  0 - firstSlideWidth - 10;

		$("#" + slider).css({right: currentPosition});
		sliderParent.insertAdjacentElement ('beforeEnd', clone);

		let totalMove =  currentPosition + firstSlideWidth + 10;
		$("#" + slider).animate({right: totalMove});

		let nextActiveSlide = getSlideAfterLast(slider);

		$(nextActiveSlide).addClass("active");
		$(activeSlide).removeClass("active");

		let buttonTop = document.querySelector('.prev');
		let buttonBottom = document.querySelector('.next');
		buttonTop.disabled = true;
		buttonBottom.disabled = true;

		setTimeout(function () {
			sliderParent.removeChild(firstSlide);
			$("#" + slider).css({right: 0});
			buttonTop.disabled = false;
			buttonBottom.disabled = false;
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