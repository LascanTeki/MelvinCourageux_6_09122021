let x = 0;

//displays message modal
function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "flex";

    //trap tab in the modal

    document.addEventListener('keydown', trap);

    //events to close modal with keyboard
    const close = document.getElementById('close');
    close.addEventListener('keydown', check3);
    document.addEventListener('keydown', check2);
}

let trap = function (e) {
    let focusableEls = document.querySelectorAll('.focus');
    console.log(focusableEls);

    if (e.keyCode == 9) {

        console.log("tab");
        e.preventDefault();
        if (e.shiftKey) {
            if (x == 0) {
                x = 10;
            }
            else
                x--;
        }
        else {
            console.log("tabbing");
            if (x == 10) {
                x = 0;
            }
            else {
                x++;
            }
        }
        console.log(x);
        focusableEls[x].focus();
    }
}

//closes the message modal
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    document.getElementById("main").style.display = "block";
    document.getElementById('header').style.display = "flex";
    document.removeEventListener('keydown', check2);
    document.removeEventListener('keydown', trap);
}

//puts infos of the message modal in the console 
let submit = function (e) {
    e.preventDefault();
    console.log(document.getElementById("Prénom").value)
    console.log(document.getElementById("Nom").value)
    console.log(document.getElementById("Email").value)
    console.log(document.getElementById("Message").value)
}

//modal closing with keyboard
let check2 = function (e) {
    if (e.keyCode == '27') {
        closeModal();
    }
};
let check3 = function (e) {
    if (e.keyCode == '13') {
        closeModal();
    }
};

//Check which key is pressed when the lightbox is displayed
let check = function (e) {
    if (e.keyCode == '37') {
        lef();
    }
    if (e.keyCode == '39') {
        righ();
    }
    if (e.keyCode == '27') {
        close
        ();
    }
    if (e.keyCode == '13') {
        if (e.target == document.getElementById("rightarrow")) {
            righ();
        }
        if (e.target == document.getElementById("leftarrow")) {
            lef();
        }
        if (e.target == document.getElementById("x")) {
            closelight();
        }
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
    let i;
    let slides = document.getElementsByClassName("mySlides");
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
    document.getElementById('header').style.display = "flex";
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