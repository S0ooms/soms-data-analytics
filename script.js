console.log("NEW SCRIPT LOADED");
const track = document.querySelector(".slider-track");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

const cards = document.querySelectorAll(".project-card");

let currentIndex = 0;

// How many cards are visible at once
let visibleCards = 3;

function updateVisibleCards(){

    if(window.innerWidth < 768){

        visibleCards = 1;

    }

    else if(window.innerWidth < 1200){

        visibleCards = 2;

    }

    else{

        visibleCards = 3;

    }

}

updateVisibleCards();

window.addEventListener("resize",()=>{

    updateVisibleCards();

    moveSlider();

});

function moveSlider(animate = true){

    const gap = parseInt(getComputedStyle(track).gap) || 30;

    const cardWidth = cards[0].offsetWidth + gap;

    if(!animate){

        track.style.transition = "none";

    }else{

        track.style.transition =
            "transform .55s cubic-bezier(.22,.61,.36,1)";

    }

    track.style.transform =
        `translateX(-${currentIndex * cardWidth}px)`;

}

nextBtn.addEventListener("click",()=>{

    currentIndex++;

    moveSlider();

    if(currentIndex >= cards.length){

        setTimeout(()=>{

            currentIndex = 0;

            moveSlider(false);

        },550);

    }

});

prevBtn.addEventListener("click",()=>{

    currentIndex--;

    moveSlider();

    if(currentIndex < 0){

        setTimeout(()=>{

            currentIndex = cards.length - visibleCards;

            moveSlider(false);

        },550);

    }

});


// =========================
// Drag Support
// =========================

let isDragging = false;

let startX;

let scrollLeft;

const slider = document.querySelector(".slider");

slider.addEventListener("mousedown",(e)=>{

    isDragging = true;

    startX = e.pageX;

    scrollLeft = currentIndex;

});

slider.addEventListener("mouseleave",()=>{

    isDragging = false;

});

slider.addEventListener("mouseup",()=>{

    isDragging = false;

});

slider.addEventListener("mousemove",(e)=>{

    if(!isDragging) return;

    e.preventDefault();

    const walk = e.pageX - startX;

    if(Math.abs(walk) > 80){

        if(walk < 0){

            nextBtn.click();

        }

        else{

            prevBtn.click();

        }

        isDragging = false;

    }

});


// =========================
// Touch Support
// =========================

let touchStart = 0;

slider.addEventListener("touchstart",(e)=>{

    touchStart = e.touches[0].clientX;

});

slider.addEventListener("touchend",(e)=>{

    let touchEnd = e.changedTouches[0].clientX;

    if(touchStart - touchEnd > 70){

        nextBtn.click();

    }

    else if(touchEnd - touchStart > 70){

        prevBtn.click();

    }

});
