
//displays message modal
function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "flex";

    //make background elements disapear
    document.getElementById("main").style.display = "none";
    document.getElementById('header').style.display = "none";

    //events to close modal with keyboard
    const close = document.querySelector('.close');
    close.addEventListener('keydown', check3);
    document.addEventListener('keydown', check2);
}

//closes the message modal
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    document.getElementById("main").style.display = "block";
    document.getElementById('header').style.display = "block";
    document.removeEventListener('keydown', check2);
}

//puts infos of the message modal in the console 
var submit = function(e){  
    e.preventDefault();
    console.log(document.getElementById("Prénom").value)
    console.log(document.getElementById("Nom").value)
    console.log( document.getElementById("Email").value)
    console.log( document.getElementById("Message").value)
}

//modal closing with keyboard
var check2 =  function(e) {
    if (e.keyCode == '27') {
        closeModal();
     }
};
var check3=  function(e) {
    if (e.keyCode == '13') {
        closeModal();
     }
};

//Check which key is pressed when the lightbox is displayed

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

//Opens the lightbox
function currentSlide(n) {
    showSlides(slideIndex = n);
        //lightbox arrows
        document.addEventListener('keydown', check);
}

//changes which slide (image) appears
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

//closes lightbox
function closelight() {
    document.getElementById("lightbox").style.display = "none";
    document.getElementById("main").style.display = "block";
    document.getElementById('header').style.display = "block";
    //remove lightbox arrows
    document.removeEventListener('keydown', check);
}

//goes to next image
function righ() {
    showSlides(slideIndex += 1);
}

//goes to previous image
function lef() {
    showSlides(slideIndex += -1);
}