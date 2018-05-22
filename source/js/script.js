var slides = document.querySelectorAll(".slider__list .slider__item");
var currentSlide = 0;
var slideInterval = setInterval(nextSlide, 10000);

function nextSlide() {
  slides[currentSlide].className = "slider__item";
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].className = "slider__item slider__item--show";
}
