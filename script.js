/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuButton =
    document.getElementById("menuButton");

const navigation =
    document.getElementById("navigation");


if (menuButton && navigation) {

    menuButton.addEventListener(
        "click",
        () => {

            const isOpen =
                navigation.classList.toggle(
                    "active"
                );

            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        }
    );


    navigation
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    navigation.classList.remove(
                        "active"
                    );

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        });

}


/* =========================================
   HEADER SCROLL EFFECT
========================================= */

const header =
    document.querySelector(
        ".site-header"
    );


function updateHeader() {

    if (!header) return;


    if (window.scrollY > 40) {

        header.classList.add(
            "scrolled"
        );

    } else {

        header.classList.remove(
            "scrolled"
        );

    }

}


window.addEventListener(
    "scroll",
    updateHeader,
    {
        passive: true
    }
);


updateHeader();


/* =========================================
   HERO SLIDER
========================================= */

const slides =
    document.querySelectorAll(
        ".hero-slide"
    );


const previousButton =
    document.getElementById(
        "heroPrev"
    );


const nextButton =
    document.getElementById(
        "heroNext"
    );


const currentCounter =
    document.getElementById(
        "heroCurrent"
    );


const totalCounter =
    document.getElementById(
        "heroTotal"
    );


let currentSlide = 0;

let sliderTimer = null;


/* Total slides */

if (totalCounter) {

    totalCounter.textContent =
        String(
            slides.length
        ).padStart(2, "0");

}


/* =========================================
   HERO VIDEO CONTROL
========================================= */

function stopAllHeroVideos() {

    slides.forEach(
        slide => {

            const video =
                slide.querySelector(
                    "video"
                );


            if (!video) return;


            video.pause();


            try {

                video.currentTime = 0;

            } catch (error) {

                // Ignore video reset errors.

            }

        }
    );

}


function playActiveVideo() {

    const activeSlide =
        slides[currentSlide];


    if (!activeSlide) return;


    const video =
        activeSlide.querySelector(
            "video"
        );


    if (!video) return;


    try {

        video.currentTime = 0;

    } catch (error) {

        // Ignore reset errors.

    }


    const playPromise =
        video.play();


    if (
        playPromise &&
        typeof playPromise.catch ===
        "function"
    ) {

        playPromise.catch(
            () => { }
        );

    }

}


/* =========================================
   SHOW SLIDE
========================================= */

function showSlide(index) {

    if (!slides.length) return;


    stopAllHeroVideos();


    slides.forEach(
        slide => {

            slide.classList.remove(
                "active"
            );

        }
    );


    currentSlide =
        (
            index +
            slides.length
        ) % slides.length;


    slides[currentSlide]
        .classList.add(
            "active"
        );


    if (currentCounter) {

        currentCounter.textContent =
            String(
                currentSlide + 1
            ).padStart(2, "0");

    }


    playActiveVideo();

}


/* =========================================
   SLIDER NAVIGATION
========================================= */

function nextSlide() {

    showSlide(
        currentSlide + 1
    );

    restartSliderTimer();

}


function previousSlide() {

    showSlide(
        currentSlide - 1
    );

    restartSliderTimer();

}


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


/* =========================================
   SLIDER AUTOPLAY
========================================= */

function startSliderTimer() {

    clearInterval(
        sliderTimer
    );


    if (slides.length <= 1) return;


    sliderTimer =
        setInterval(
            () => {

                nextSlide();

            },
            3000
        );

}


function restartSliderTimer() {

    startSliderTimer();

}


/* =========================================
   VISIBILITY CHANGE
========================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (document.hidden) {

            clearInterval(
                sliderTimer
            );

            stopAllHeroVideos();

        } else {

            startSliderTimer();

            playActiveVideo();

        }

    }
);


/* =========================================
   KEYBOARD NAVIGATION
========================================= */

document.addEventListener(
    "keydown",
    event => {

        /*
         Do not change slides when the user
         is typing inside a form field.
        */

        const activeElement =
            document.activeElement;


        const isTyping =
            activeElement &&
            (
                activeElement.tagName ===
                "INPUT" ||

                activeElement.tagName ===
                "TEXTAREA" ||

                activeElement.tagName ===
                "SELECT"
            );


        if (isTyping) return;


        if (
            event.key ===
            "ArrowRight"
        ) {

            nextSlide();

        }


        if (
            event.key ===
            "ArrowLeft"
        ) {

            previousSlide();

        }

    }
);


/* =========================================
   START HERO
========================================= */

if (slides.length) {

    showSlide(0);

    startSliderTimer();

}


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


if (
    "IntersectionObserver"
    in window
) {

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add(
                                    "visible"
                                );


                            revealObserver
                                .unobserve(
                                    entry.target
                                );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(
        element => {

            revealObserver.observe(
                element
            );

        }
    );

} else {

    /*
       Fallback for older browsers.
    */

    revealElements.forEach(
        element => {

            element.classList.add(
                "visible"
            );

        }
    );

}


/* =========================================
   SMOOTH INTERNAL LINKS
========================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(
        link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {

                        return;

                    }


                    let target = null;


                    try {

                        target =
                            document.querySelector(
                                targetId
                            );

                    } catch (error) {

                        return;

                    }


                    if (!target) return;


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        }
    );


/* =========================================
   PROJECT VIDEO INTERACTION
========================================= */

const projectVideos =
    document.querySelectorAll(
        ".project-video"
    );


projectVideos.forEach(
    video => {

        video.addEventListener(
            "play",
            () => {

                projectVideos.forEach(
                    otherVideo => {

                        if (
                            otherVideo !==
                            video
                        ) {

                            otherVideo.pause();

                        }

                    }
                );

            }
        );

    }
);


/* =========================================
   CINEMATIC WORK SECTION
   MOUSE PARALLAX
========================================= */

const workSection =
    document.querySelector(
        "#work"
    );


if (workSection) {

    const editingBackground =
        workSection.querySelector(
            ".editing-background"
        );


    if (editingBackground) {

        let mouseAnimationFrame =
            null;


        workSection.addEventListener(
            "mousemove",
            event => {

                /*
                   Avoid unnecessary calculations
                   on small screens.
                */

                if (
                    window.innerWidth <=
                    768
                ) {

                    return;

                }


                const rect =
                    workSection
                        .getBoundingClientRect();


                const x =
                    (
                        event.clientX -
                        rect.left
                    ) /
                    rect.width -
                    0.5;


                const y =
                    (
                        event.clientY -
                        rect.top
                    ) /
                    rect.height -
                    0.5;


                if (
                    mouseAnimationFrame
                ) {

                    cancelAnimationFrame(
                        mouseAnimationFrame
                    );

                }


                mouseAnimationFrame =
                    requestAnimationFrame(
                        () => {

                            editingBackground
                                .style
                                .setProperty(
                                    "--mouse-x",
                                    `${x * 18}px`
                                );


                            editingBackground
                                .style
                                .setProperty(
                                    "--mouse-y",
                                    `${y * 18}px`
                                );

                        }
                    );

            }
        );


        workSection.addEventListener(
            "mouseleave",
            () => {

                editingBackground
                    .style
                    .setProperty(
                        "--mouse-x",
                        "0px"
                    );


                editingBackground
                    .style
                    .setProperty(
                        "--mouse-y",
                        "0px"
                    );

            }
        );

    }

}


/* =========================================
   CLOSE MOBILE NAV WHEN CLICKING OUTSIDE
========================================= */

document.addEventListener(
    "click",
    event => {

        if (
            !menuButton ||
            !navigation
        ) {

            return;

        }


        const clickedInsideMenu =
            navigation.contains(
                event.target
            );


        const clickedButton =
            menuButton.contains(
                event.target
            );


        if (
            !clickedInsideMenu &&
            !clickedButton
        ) {

            navigation.classList.remove(
                "active"
            );


            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }
);


/* =========================================
   PREVENT HERO SLIDER TIMER FROM RUNNING
   FOREVER IF PAGE IS NOT VISIBLE
========================================= */

window.addEventListener(
    "pagehide",
    () => {

        clearInterval(
            sliderTimer
        );

        stopAllHeroVideos();

    }
);