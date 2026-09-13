// ===============================
// S.O.M.S Portfolio Slider v3
// Native Scroll Version
// Supports multiple sliders (Projects + Capstone)
// ===============================

// Reusable setup so we don't repeat the same code for every slider on the page.
function setupSlider(sliderId, prevBtnId, nextBtnId, autoScrollDelay = 5000) {

    const slider = document.getElementById(sliderId);
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);

    // If this slider isn't on the page, just skip it quietly.
    if (!slider || !prevBtn || !nextBtn) return;

    // Width of one card including gap
    function getScrollAmount() {

        const card = slider.querySelector(".project-card");
        if (!card) return 0;

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
    // (only acts when this slider was the last one the mouse was over)
    // ===============================

    slider.addEventListener("mouseenter", () => {
        activeSlider = { prevBtn, nextBtn };
    });

    // ===============================
    // Auto Play (pauses while hovered)
    // ===============================

    let autoScroll = setInterval(() => {
        slider.scrollBy({
            left: getScrollAmount(),
            behavior: "smooth"
        });
    }, autoScrollDelay);

    slider.addEventListener("mouseenter", () => {
        clearInterval(autoScroll);
    });

    slider.addEventListener("mouseleave", () => {
        autoScroll = setInterval(() => {
            slider.scrollBy({
                left: getScrollAmount(),
                behavior: "smooth"
            });
        }, autoScrollDelay);
    });

}

// Tracks whichever slider the mouse most recently entered,
// so ArrowLeft / ArrowRight controls that slider specifically.
let activeSlider = null;

document.addEventListener("keydown", (e) => {

    if (!activeSlider) return;

    if (e.key === "ArrowRight") {
        activeSlider.nextBtn.click();
    }

    if (e.key === "ArrowLeft") {
        activeSlider.prevBtn.click();
    }

});

// ===============================
// Initialize both sliders
// ===============================

setupSlider("projectSlider", "prevBtn", "nextBtn", 60000); 
setupSlider("capstoneSlider", "prevBtnCapstone", "nextBtnCapstone", 60000);
