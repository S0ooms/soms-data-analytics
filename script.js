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

function moveSlider(){

    const cardWidth = cards[0].offsetWidth + 30;

    track.style.transform =
        `translateX(-${currentIndex * cardWidth}px)`;

}

nextBtn.addEventListener("click",()=>{

    if(currentIndex < cards.length - visibleCards){

        currentIndex++;

    }

    else{

        currentIndex = 0;

    }

    moveSlider();

});

prevBtn.addEventListener("click",()=>{

    if(currentIndex > 0){

        currentIndex--;

    }

    else{

        currentIndex = cards.length - visibleCards;

    }

    moveSlider();

});


// =========================
// Drag Support
// =========================

let isDragging = false;

let startX;

let scrollLeft;

const slider = document.querySelector(".slider-window");

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
