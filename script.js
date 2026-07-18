/* ==========================================
   Portfolio JavaScript
   Quang Hung Nguyen
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ======================================
       SCROLL PROGRESS BAR
    ====================================== */

    const progress = document.createElement("div");
    progress.id = "scroll-progress";

    progress.style.position = "fixed";
    progress.style.top = "0";
    progress.style.left = "0";
    progress.style.height = "3px";
    progress.style.width = "0%";
    progress.style.background = "#ffffff";
    progress.style.zIndex = "99999";
    progress.style.transition = "width .1s linear";

    document.body.appendChild(progress);

    window.addEventListener("scroll", () => {

        const scroll =
            document.documentElement.scrollTop;

        const height =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const percent = (scroll / height) * 100;

        progress.style.width = percent + "%";

    });

    /* ======================================
       NAVBAR EFFECT
    ====================================== */

    const nav = document.querySelector("nav");

    function updateNavbar() {

        if (window.scrollY > 80) {

            nav.style.background =
                "rgba(5,5,5,.92)";

            nav.style.boxShadow =
                "0 10px 35px rgba(0,0,0,.45)";

        }

        else {

            nav.style.background =
                "rgba(0,0,0,.45)";

            nav.style.boxShadow = "none";

        }

    }

    updateNavbar();

    window.addEventListener("scroll", updateNavbar);

    /* ======================================
       SMOOTH SCROLL
    ====================================== */

    document.querySelectorAll('nav a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener("click", function(e) {

                e.preventDefault();

                const target =
                    document.querySelector(
                        this.getAttribute("href")
                    );

                if (!target) return;

                target.scrollIntoView({

                    behavior: "smooth"

                });

            });

        });

    /* ======================================
       ACTIVE NAVIGATION
    ====================================== */

    const sections =
        document.querySelectorAll("section");

    const navLinks =
        document.querySelectorAll("nav a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 180;

            if (window.scrollY >= top) {

                current = section.id;

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                "#" + current
            ) {

                link.classList.add("active");

            }

        });

    });

    /* ======================================
       REVEAL ANIMATION
    ====================================== */

    const revealElements = document.querySelectorAll(
        ".card, .project-card, .skills span, section h2, section p"
    );

    const observer = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0px)";

                }

            });

        },

        {

            threshold: 0.15

        }

    );

    revealElements.forEach(element => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(40px)";

        element.style.transition =
            "all .7s ease";

        observer.observe(element);

    });

    /* ======================================
       TYPING EFFECT
    ====================================== */

    const heroText =
        document.querySelector(".hero-description");

    if (heroText) {

        const message =
            heroText.textContent.trim();

        heroText.textContent = "";

        let i = 0;

        function type() {

            if (i < message.length) {

                heroText.textContent += message.charAt(i);

                i++;

                setTimeout(type, 22);

            }

        }

        type();

    }

    /* ======================================
       PROJECT CARD TILT
    ====================================== */

    document.querySelectorAll(".project-card")
        .forEach(card => {

            card.addEventListener("mousemove", e => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    e.clientX - rect.left;

                const y =
                    e.clientY - rect.top;

                const rotateX =
                    (y - rect.height / 2) / 20;

                const rotateY =
                    -(x - rect.width / 2) / 20;

                card.style.transform =
                    `perspective(900px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-8px)`;

            });

            card.addEventListener("mouseleave", () => {

                card.style.transform =
                    "perspective(900px) rotateX(0deg) rotateY(0deg)";

            });

        });

    /* ======================================
       BUTTON RIPPLE
    ====================================== */

    document.querySelectorAll(
        ".primary-btn,.secondary-btn"
    ).forEach(button => {

        button.addEventListener("click", function(e) {

            const ripple =
                document.createElement("span");

            const diameter =
                Math.max(
                    this.clientWidth,
                    this.clientHeight
                );

            ripple.style.width =
                ripple.style.height =
                diameter + "px";

            ripple.style.position = "absolute";

            ripple.style.borderRadius = "50%";

            ripple.style.background =
                "rgba(255,255,255,.25)";

            ripple.style.pointerEvents = "none";

            ripple.style.left =
                e.offsetX - diameter / 2 + "px";

            ripple.style.top =
                e.offsetY - diameter / 2 + "px";

            ripple.style.transform =
                "scale(0)";

            ripple.style.transition =
                ".6s ease";

            this.style.position = "relative";

            this.style.overflow = "hidden";

            this.appendChild(ripple);

            requestAnimationFrame(() => {

                ripple.style.transform =
                    "scale(4)";

                ripple.style.opacity = "0";

            });

            setTimeout(() => {

                ripple.remove();

            }, 600);

        });

    });

    /* ======================================
       AUTO FOOTER YEAR
    ====================================== */

    const footer =
        document.querySelector("footer p");

    if (footer) {

        footer.innerHTML =
            `© ${new Date().getFullYear()} Quang Hung Nguyen`;

    }

});