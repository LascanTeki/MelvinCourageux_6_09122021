
function displayModal() {
    console.log("start");
    const modal = document.getElementById("contact_modal");
	modal.style.display = "flex";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}


var check =  function(e) {
    if (e.keyCode == '37') {
        lef();
     }
     else if (e.keyCode == '39') {
        righ();
     }
};

function currentSlide(n) {
    showSlides(slideIndex = n);
        //lightbox arrows
        document.addEventListener('keydown', check);
}


function showSlides(n) {
    document.getElementById("lightbox").style.display = "flex";
    var i;
    var slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[slideIndex - 1].style.display = "flex";
}

function closelight() {
    document.getElementById("lightbox").style.display = "none";
    document.removeEventListener('keydown', check);
}

function righ() {
    showSlides(slideIndex += 1);
}

function lef() {
    showSlides(slideIndex += -1);
}