/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuButton = document.getElementById("menuButton");
const navigation = document.getElementById("navigation");

if (menuButton && navigation) {

    menuButton.addEventListener("click", () => {

        const isOpen =
            navigation.classList.toggle("active");

        menuButton.setAttribute(
            "aria-expanded",
            isOpen
        );

    });


    navigation
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener("click", () => {

                navigation.classList.remove(
                    "active"
                );

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

}


/* =========================================
   HEADER SCROLL EFFECT
========================================= */

const header =
    document.querySelector(".site-header");

function updateHeader() {

    if (!header) return;

    if (window.scrollY > 40) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}

window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
);

updateHeader();


/* =========================================
   HERO SLIDER
========================================= */

const slides =
    document.querySelectorAll(".hero-slide");

const previousButton =
    document.getElementById("heroPrev");

const nextButton =
    document.getElementById("heroNext");

const currentCounter =
    document.getElementById("heroCurrent");

const totalCounter =
    document.getElementById("heroTotal");


let currentSlide = 0;

let sliderTimer;


/* Set total */

if (totalCounter) {

    totalCounter.textContent =
        String(slides.length).padStart(2, "0");

}


/* Stop all videos */

function stopAllHeroVideos() {

    slides.forEach(slide => {

        const video =
            slide.querySelector("video");

        if (video) {

            video.pause();

            video.currentTime = 0;

        }

    });

}


/* Play active video */

function playActiveVideo() {

    const activeSlide =
        slides[currentSlide];

    if (!activeSlide) return;

    const video =
        activeSlide.querySelector("video");

    if (video) {

        video.currentTime = 0;

        const playPromise =
            video.play();

        if (
            playPromise !== undefined
        ) {

            playPromise.catch(() => {
                // Browser may block autoplay.
                // Controls remain available.
            });

        }

    }

}


/* Show slide */

function showSlide(index) {

    if (!slides.length) return;


    stopAllHeroVideos();


    slides.forEach(slide => {

        slide.classList.remove("active");

    });


    currentSlide =
        (index + slides.length)
        % slides.length;


    slides[currentSlide]
        .classList.add("active");


    if (currentCounter) {

        currentCounter.textContent =
            String(currentSlide + 1)
                .padStart(2, "0");

    }


    playActiveVideo();

}


/* Next */

function nextSlide() {

    showSlide(
        currentSlide + 1
    );

    restartSliderTimer();

}


/* Previous */

function previousSlide() {

    showSlide(
        currentSlide - 1
    );

    restartSliderTimer();

}


/* Buttons */

if (nextButton) {

    nextButton.addEventListener(
        "click",
        nextSlide
    );

}

if (previousButton) {

    previousButton.addEventListener(
        "click",
        previousSlide
    );

}


/* Automatic slider */

function startSliderTimer() {

    clearInterval(sliderTimer);

    sliderTimer =
        setInterval(() => {

            nextSlide();

        }, 3000);

}


function restartSliderTimer() {

    startSliderTimer();

}


/* Pause autoplay when browser tab is hidden */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden
        ) {

            clearInterval(
                sliderTimer
            );

        } else {

            startSliderTimer();

        }

    }
);


/* Keyboard navigation */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "ArrowRight") {

            nextSlide();

        }

        if (event.key === "ArrowLeft") {

            previousSlide();

        }

    }
);


/* Start slider */

if (slides.length) {

    showSlide(0);

    startSliderTimer();

}


/* =========================================
   SCROLL REVEAL ANIMATION
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================
   SMOOTH INTERNAL LINKS
========================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");

                const target =
                    document.querySelector(
                        targetId
                    );

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


/* =========================================
   PROJECT VIDEO INTERACTION
========================================= */

const projectVideos =
    document.querySelectorAll(
        ".project-video"
    );


projectVideos.forEach(video => {

    /*
       When one portfolio video starts,
       pause the others.
    */

    video.addEventListener(
        "play",
        () => {

            projectVideos.forEach(
                otherVideo => {

                    if (
                        otherVideo !== video
                    ) {

                        otherVideo.pause();

                    }

                }
            );

        }
    );

});