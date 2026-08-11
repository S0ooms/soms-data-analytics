// ===============================
// S.O.M.S Portfolio Slider v2
// Native Scroll Version
// ===============================

const slider = document.getElementById("projectSlider");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
console.log(slider);
console.log(prevBtn);
console.log(nextBtn);


// Width of one card including gap
function getScrollAmount() {

    const card = slider.querySelector(".project-card");

    const style = window.getComputedStyle(slider);

    const gap = parseInt(style.columnGap || style.gap) || 28;

    return card.offsetWidth + gap;

}

// Scroll Right
nextBtn.addEventListener("click", () => {

    slider.scrollBy({

        left: getScrollAmount(),

        behavior: "smooth"

    });

});

// Scroll Left
prevBtn.addEventListener("click", () => {

    slider.scrollBy({

        left: -getScrollAmount(),

        behavior: "smooth"

    });

});

// ===============================
// Mouse Drag Support
// ===============================

let isDown = false;

let startX;

let scrollLeft;

slider.addEventListener("mousedown", (e) => {

    isDown = true;

    slider.style.cursor = "grabbing";

    startX = e.pageX - slider.offsetLeft;

    scrollLeft = slider.scrollLeft;

});

slider.addEventListener("mouseleave", () => {

    isDown = false;

    slider.style.cursor = "grab";

});

slider.addEventListener("mouseup", () => {

    isDown = false;

    slider.style.cursor = "grab";

});

slider.addEventListener("mousemove", (e) => {

    if (!isDown) return;

    e.preventDefault();

    const x = e.pageX - slider.offsetLeft;

    const walk = (x - startX) * 1.5;

    slider.scrollLeft = scrollLeft - walk;

});

// ===============================
// Mouse Wheel Horizontal Scroll
// ===============================

slider.addEventListener("wheel", (e) => {

    e.preventDefault();

    slider.scrollLeft += e.deltaY;

}, { passive: false });

// ===============================
// Keyboard Navigation
// ===============================

document.addEventListener("keydown", (e) => {

    if (e.key === "ArrowRight") {

        nextBtn.click();

    }

    if (e.key === "ArrowLeft") {

        prevBtn.click();

    }

});

// ===============================
// Auto Play
// ===============================

let autoScroll = setInterval(() => {

    slider.scrollBy({

        left: getScrollAmount(),

        behavior: "smooth"

    });

}, 45000);

// Pause on hover

slider.addEventListener("mouseenter", () => {

    clearInterval(autoScroll);

});

slider.addEventListener("mouseleave", () => {

    autoScroll = setInterval(() => {

        slider.scrollBy({

            left: getScrollAmount(),

            behavior: "smooth"

        });

    }, 5000);

});
