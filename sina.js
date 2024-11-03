    // Existing JavaScript Code

    function toggleMenu() {
        var mobileNav = document.getElementById('mobileNav');
        var hamburgerMenu = document.querySelector('.hamburger-menu');
        var mobileOverlay = document.getElementById('mobileOverlay');
    
        // Toggle the 'show' class for mobile navigation and overlay
        mobileNav.classList.toggle('show');
        mobileOverlay.classList.toggle('show');
    
        // Toggle the 'hide' class for the hamburger menu
        hamburgerMenu.classList.toggle('hide');
    }

    const typedSpan = document.getElementById("typed");
    const cursorSpan = document.createElement("span");
    cursorSpan.classList.add("cursor");
    cursorSpan.textContent = "|";
    typedSpan.parentNode.appendChild(cursorSpan);

    const totype = ["Full Stack Developer", "Drone pilot", "Photographer"];
    const delayTyping_char = 90;
    const delayErasing_text = 50;
    const delayTyping_text = 1500;
    const delayBeforeErase = 1000;
    let totypeIndex = 0;
    let charIndex = 0;
    let isTyping = true;

    function typeText() {
        if (charIndex < totype[totypeIndex].length) {
            typedSpan.textContent += totype[totypeIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeText, delayTyping_char);
        } else {
            isTyping = false;
            cursorSpan.classList.add("blinking");
            setTimeout(eraseText, delayBeforeErase);
        }
    }

    function eraseText() {
        if (charIndex > 0) {
            typedSpan.textContent = totype[totypeIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(eraseText, delayErasing_text);
        } else {
            totypeIndex++;
            if (totypeIndex >= totype.length) totypeIndex = 0;
            cursorSpan.classList.remove("blinking");
            setTimeout(typeText, delayTyping_text);
        }
    }

    window.onload = function () {
        setTimeout(typeText, delayTyping_text);
    };

    document.addEventListener('DOMContentLoaded', () => {
        const video = document.getElementById('bg-video');
        const muteButton = document.querySelector('.mute-button');
        const aboutSection = document.getElementById('about');
        video.pause();

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play();
                    video.muted = false;
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.5 });
        observer.observe(aboutSection);

        function toggleMute() {
            video.muted = !video.muted;
            muteButton.textContent = video.muted ? 'Unmute' : 'Mute';
        }
        muteButton.addEventListener('click', toggleMute);
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
            });
        });
    });



    // JavaScript to enable touch-triggered animations

    document.addEventListener("DOMContentLoaded", function () {
        const aboutSection = document.getElementById("about");
        const words = Array.from(document.querySelectorAll("#about .mobile-about-content p span"));
        let animationRunning = false; // Track if animation is currently running
        let intervalId;

        // Observer to start and stop the animation based on About section visibility
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    if (!animationRunning) {
                        animationRunning = true;
                        startAnimation();
                    }
                } else {
                    if (animationRunning) {
                        animationRunning = false;
                        clearInterval(intervalId); // Stop animation when out of view
                    }
                }
            });
        }, { threshold: 0.5 });

        observer.observe(aboutSection);

        function startAnimation() {
            let currentIndex = 0;

            function animateNextWord() {
                if (!animationRunning) return; // Stop if no longer in view

                // Reset to start if at the end of words array
                if (currentIndex >= words.length) {
                    currentIndex = 0;
                }

                const word = words[currentIndex];
                word.classList.add("animate-charcter");

                // Remove the class after animation completes to enable restart
                setTimeout(() => {
                    word.classList.remove("animate-charcter");
                }, 700); // Animation duration of 0.7s

                currentIndex++;

                // Start the next word slightly before the previous ends for smooth flow
                setTimeout(animateNextWord, 500); // Delay of 0.5s between words
            }

            animateNextWord();

            // Loop the entire animation every 15 seconds (adjust based on speed)
            intervalId = setInterval(() => {
                currentIndex = 0;
                animateNextWord();
            }, words.length * 1500); // 15-second loop duration
        }
    });



    document.addEventListener("DOMContentLoaded", function () {
        const mobileImage = document.querySelector("#about .mobile-overlay-image");
        const hoverMessage = document.querySelector("#about .mobile-hover-message");

        // Function to add the 'touched' class on touchstart and remove it after a delay
        function handleTouchStart() {
            mobileImage.classList.add("touched");
            hoverMessage.classList.add("touched");

            // Remove the 'touched' class after a timeout to reset
            setTimeout(() => {
                mobileImage.classList.remove("touched");
                hoverMessage.classList.remove("touched");
            }, 1500); // Duration in ms to keep the class active
        }

        // Add touch event listener for the image
        if (mobileImage) {
            mobileImage.addEventListener("touchstart", handleTouchStart);
        }
    });
