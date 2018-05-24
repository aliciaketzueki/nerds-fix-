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

var button = document.querySelector(".map__button");
var modal = document.querySelector(".modal");
var closeButton = modal.querySelector(".modal__close");
var login = modal.querySelector("[name=login]");
var email = modal.querySelector("[name=email]");
var text = modal.querySelector("[name=text]");
var form = modal.querySelector("form");

var isStorageSupport = true;
var storage = "";

try {
  storage = localStorage.getItem("login");
} catch (err) {
  isStorageSupport = false;
}

button.addEventListener("click", function(evt) {
  evt.preventDefault();
  modal.classList.add("modal--show");
  login.focus();

  if (storage) {
    login.value = storage;
    email.focus();
  } else {
    login.focus();
  }
});

closeButton.addEventListener("click", function(evt) {
  evt.preventDefault();
  modal.classList.remove("modal--show");
});

form.addEventListener("submit", function(evt) {
  if (!login.value || !email.value || !text.value) {
    evt.preventDefault();
    console.log("Пожалуйста, заполните все поля");
  } else {
    if (isStorageSupport) {
      localStorage.setItem("login", login.value);
    }
  }
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (modal.classList.contains("modal--show")) {
      modal.classList.remove("modal--show");
    }
  }
});
