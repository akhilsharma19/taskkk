const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel-button.next');
const prevButton = document.querySelector('.carousel-button.prev');
const slideWidth = slides[0].getBoundingClientRect().width;

// Clone first and last slides
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

firstClone.id = 'first-clone';
lastClone.id = 'last-clone';

track.appendChild(firstClone);
track.insertBefore(lastClone, slides[0]);

const allSlides = Array.from(track.children);
let currentIndex = 1; // Start from the real first slide

// Adjust track position to show the first real slide initially
track.style.transform = 'translateX(' + (-slideWidth * currentIndex) + 'px)';

function updateSlidePosition() {
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = 'translateX(' + (-slideWidth * currentIndex) + 'px)';
}

function moveToNextSlide() {
    if (currentIndex >= allSlides.length - 1) {
        currentIndex = 1;
        track.style.transition = 'none';
        track.style.transform = 'translateX(' + (-slideWidth * currentIndex) + 'px)';
    }
    currentIndex++;
    setTimeout(updateSlidePosition, 20); // Add a small delay to ensure the transition occurs
}

function moveToPrevSlide() {
    if (currentIndex <= 0) {
        currentIndex = allSlides.length - 2;
        track.style.transition = 'none';
        track.style.transform = 'translateX(' + (-slideWidth * currentIndex) + 'px)';
    }
    currentIndex--;
    setTimeout(updateSlidePosition, 20); // Add a small delay to ensure the transition occurs
}

nextButton.addEventListener('click', moveToNextSlide);
prevButton.addEventListener('click', moveToPrevSlide);

updateSlidePosition();

document.addEventListener('DOMContentLoaded', function () {
    const toggleSwitch = document.getElementById('toggleSwitch');
    const monthlyOption = document.getElementById('monthly');
    const yearlyOption = document.getElementById('yearly');

    const prices = {
        monthly: ['$19', '$49', '$99'],
        yearly: ['$119', '$499', '$999']
    };

    const priceElements = [
        document.getElementById('price1'),
        document.getElementById('price2'),
        document.getElementById('price3')
    ];

    function updateToggle() {
        if (toggleSwitch.checked) {
            yearlyOption.classList.add('active');
            yearlyOption.classList.remove('inactive');
            monthlyOption.classList.add('inactive');
            monthlyOption.classList.remove('active');
            updatePrices('yearly');
        } else {
            monthlyOption.classList.add('active');
            monthlyOption.classList.remove('inactive');
            yearlyOption.classList.add('inactive');
            yearlyOption.classList.remove('active');
            updatePrices('monthly');
        }
    }

    function updatePrices(planType) {
        priceElements.forEach((priceElement, index) => {
            priceElement.textContent = prices[planType][index];
        });
    }

    // Initialize toggle state
    updateToggle();

    // Update on toggle switch change
    toggleSwitch.addEventListener('change', updateToggle);

    // Update on click on options
    monthlyOption.addEventListener('click', function () {
        toggleSwitch.checked = false;
        updateToggle();
    });

    yearlyOption.addEventListener('click', function () {
        toggleSwitch.checked = true;
        updateToggle();
    });
});

