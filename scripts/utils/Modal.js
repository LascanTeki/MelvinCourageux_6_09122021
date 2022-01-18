
function displayModal() {
    console.log("start");
    const modal = document.getElementById("contact_modal");
	modal.style.display = "flex";
    document.getElementById("main").style.display = "none";
    document.getElementById('header').style.display = "none";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    document.getElementById("main").style.display = "block";
    document.getElementById('header').style.display = "block";
}

var submit = function(e){  
    e.preventDefault();
    console.log(document.getElementById("Prénom").value)
    console.log(document.getElementById("Nom").value)
    console.log( document.getElementById("Email").value)
    console.log( document.getElementById("Message").value)
}

var check =  function(e) {
    if (e.keyCode == '37') {
        lef();
     }
     else if (e.keyCode == '39') {
        righ();
     }
     else if (e.keyCode == '27') {
        closelight();
     }
};

function currentSlide(n) {
    showSlides(slideIndex = n);
        //lightbox arrows
        document.addEventListener('keydown', check);
}


function showSlides(n) {
    document.getElementById("lightbox").style.display = "flex";
    document.getElementById("main").style.display = "none";
    document.getElementById('header').style.display = "none";
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
    document.getElementById("main").style.display = "block";
    document.getElementById('header').style.display = "block";
    //remove lightbox arrows
    document.removeEventListener('keydown', check);
}

function righ() {
    showSlides(slideIndex += 1);
}

function lef() {
    showSlides(slideIndex += -1);
}