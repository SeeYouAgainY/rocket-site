import "./src/styles/style.scss";

const sliderTrack = document.querySelector(".slider-track");
const slides = sliderTrack ? Array.from(sliderTrack.children) : [];
const paginationDots = document.querySelectorAll(".slider-dot");
let currentActiveIndex = 0;

if (sliderTrack && slides.length > 0 && paginationDots.length > 0) {
  const updateSliderPosition = (targetIndex) => {
    const slideWidth = slides[0].offsetWidth;
    const gap = parseFloat(getComputedStyle(sliderTrack).gap) || 15;
    let offset = targetIndex * (slideWidth + gap);
    sliderTrack.style.transform = `translateX(-${offset}px)`;
    currentActiveIndex = targetIndex;
    updateSlideStates();
  };
  const updateDots = (activeIndex) => {
    paginationDots.forEach((dot, index) => {
      dot.classList.toggle("active", index === activeIndex);
    });
  };

  const updateSlideStates = () => {
    slides.forEach((slide, index) => {
      slide.classList.remove("is-inactive", "is-partially-visible");
      if (index !== currentActiveIndex) {
        slide.classList.add("is-inactive");
      }
    });
  };

  paginationDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const targetIndex = parseInt(dot.getAttribute("data-slide-index"));
      updateSliderPosition(targetIndex);
      updateDots(targetIndex);
    });
  });

  updateDots(currentActiveIndex);
  updateSliderPosition(currentActiveIndex);
}

document.addEventListener("DOMContentLoaded", function () {
  const popupOverlay = document.getElementById("popupOverlay");
  const closeButton = document.querySelector(".popup-form__close");
  const form = document.getElementById("myForm");
  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("phone");
  const buttonOpenPopup = document.querySelectorAll(".open-popup");
  const nameErrorSpan =
    nameInput.parentElement.querySelector(".popup-form__error");
  const phoneErrorSpan =
    phoneInput.parentElement.querySelector(".popup-form__error");

  popupOverlay.style.display = "none";

  buttonOpenPopup.forEach((button) => {
    button.addEventListener("click", function () {
      popupOverlay.style.display = "flex";
    });
  });

  closeButton.addEventListener("click", closePopup);
  popupOverlay.addEventListener(
    "click",
    (e) => e.target === popupOverlay && closePopup()
  );

  phoneInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 0 && !value.startsWith("7")) value = "7" + value;

    let formatted =
      "+7" +
      (value.length > 1 ? ` (${value.substring(1, 4)}` : "") +
      (value.length >= 5 ? `) ${value.substring(4, 7)}` : "") +
      (value.length >= 8 ? `-${value.substring(7, 9)}` : "") +
      (value.length >= 10 ? `-${value.substring(9, 11)}` : "");

    e.target.value = formatted.substring(0, 18);
    phoneInput.style.borderColor = "#e6e6e6";
    phoneErrorSpan.style.display = "none";
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    if (nameInput.value.trim() === "") {
      nameInput.style.border = "1px solid #e44b4b";
      nameErrorSpan.textContent = "Поле не заполнено";
      nameErrorSpan.style.display = "block";
      nameErrorSpan.style.color = "#e44b4b";
      isValid = false;
    } else {
      nameInput.style.borderColor = "#e6e6e6";
      nameErrorSpan.style.display = "none";
    }

    const phoneDigits = phoneInput.value.replace(/\D/g, "");
    if (phoneDigits.length < 11) {
      phoneInput.style.borderColor = "#e44b4b";
      phoneErrorSpan.textContent = "Введите полный номер";
      phoneErrorSpan.style.display = "block";
      isValid = false;
    } else {
      phoneInput.style.borderColor = "#e6e6e6";
      phoneErrorSpan.style.display = "none";
    }

    if (isValid) {
      closePopup();
    }
  });

  nameInput.addEventListener("input", () => {
    nameInput.style.borderColor = "#e6e6e6";
    nameErrorSpan.style.display = "none";
  });

  function closePopup() {
    popupOverlay.style.display = "none";
    form.reset();
    resetStyles();
  }

  function resetStyles() {
    nameInput.style.borderColor = "#e6e6e6";
    phoneInput.style.borderColor = "#e6e6e6";
    nameErrorSpan.style.display = "none";
    phoneErrorSpan.style.display = "none";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const playButton = document.getElementById("playButton");
  const imageContainer = document.getElementById("imageContainer");
  const videoContainer = document.getElementById("videoContainer");
  const iframePlayer = document.getElementById("heroVideoPlayer");

  const videoId = "qyiEbfYI--c";
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

  playButton.addEventListener("click", function () {
    iframePlayer.src = embedUrl;
    if (imageContainer) {
      imageContainer.style.display = "none";
    }

    if (videoContainer) {
      videoContainer.style.display = "flex";
      videoContainer.style.height = "auto";
    }

    if (iframePlayer) {
      iframePlayer.style.display = "block";
      iframePlayer.style.visibility = "visible";
      iframePlayer.style.opacity = "1";
    }

    playButton.style.display = "none";
  });
});
