var slides = document.querySelectorAll(".slider__list .slider__item");
var currentSlide = 0;
var slideInterval = setInterval(nextSlide, 5000);

function nextSlide() {
  slides[currentSlide].className = "slider__item";
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].className = "slider__item slider__item--show";
}

function initMap() {
  var uluru = { lat: 59.93912426, lng: 30.32130726 };
  var map = new google.maps.Map(document.querySelector(".map__container"), {
    zoom: 17,
    center: uluru
  });
  var image = "img/map-marker.png";
  var markercenter = { lat: 59.93876956, lng: 30.32377489 };
  var marker = new google.maps.Marker({
    position: markercenter,
    map: map,
    icon: image
  });
}