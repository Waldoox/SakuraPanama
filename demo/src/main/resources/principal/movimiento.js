let currentIndex = 0;

function changeSlide(n) {
    currentIndex += n;
    showSlide(currentIndex);
}

function showSlide(index) {
    const slides = document.querySelector('.carousel');
    const totalSlides = document.querySelectorAll('.slide').length;

    if (index < 0) {
        currentIndex = totalSlides - 1;
    } else if (index >= totalSlides) {
        currentIndex = 0;
    }

    const translateValue = -currentIndex * 100 + '%';
    slides.style.transform = 'translateX(' + translateValue + ')';
}

