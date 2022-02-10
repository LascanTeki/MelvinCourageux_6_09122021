const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

let path = urlParams.get('id')
path = parseInt(path);

//Sort button
async function getPick() {

    let One = "Popularité";
    let Two = "Date";
    let Three = "Titre";
    const box = document.getElementById("box");

    const first = document.createElement('a');
    first.textContent = One;
    first.setAttribute("id", "one");

    const arrow = document.createElement('span');
    arrow.textContent = "ˇ";
    arrow.setAttribute("id", "arrow");
    arrow.setAttribute("class", "arrow");
    box.appendChild(arrow);

    const second = document.createElement('a');
    second.textContent = Two;
    second.setAttribute("class", "trie-box2");

    const third = document.createElement('a');
    third.textContent = Three;
    third.setAttribute("class", "trie-box3");

    box.appendChild(first);
    box.appendChild(second);
    box.appendChild(third);

}


async function getPhotographers() {

    // Penser à remplacer par les données récupérées dans le json
    const response = await fetch('./data/photographers.json');
    const names = await response.json();
    const photographers = names.photographers;


    // et bien retourner le tableau photographers seulement une fois
    return ({
        photographers: [...photographers]
    })
}

async function getMedia() {

    // Penser à remplacer par les données récupérées dans le json
    const response = await fetch('./data/photographers.json');
    const names = await response.json();
    const media = names.media;

    media.sort(function (a, b) {
        let dateA = new Date(a.likes), dateB = new Date(b.likes)
        return dateB - dateA
    });

    // et bien retourner le tableau photographers seulement une fois
    return ({
        media: [...media]
    })
}

class Filter {
    static filterphoto(path, photographers) {
        return photographers.filter(d => d.id === path);

    }
    static filtermedia(path, media) {
        return media.filter(d => d.photographerId === path);
    }
}

//Display the profile

function displayData(photographers, likecount) {
    const photographersSection = document.querySelector(".photograph-header");
    const prix = document.querySelector(".like");
    const modal = document.getElementById("contact");
    console.log(path);
    photographers = Filter.filterphoto(path, photographers);
    console.log(photographers);

    photographers.forEach((photographer) => {
        const { name, portrait, tagline, city, country, price } = photographer;

        //photographer icon + button

        const img = Card.img(name, portrait);

        //div contenant nom + city + quote

        const titre = Card.title(tagline, city, country, name);

        //like count
        const like = Corner.Like(likecount);

        //price in corner
        const pri = Corner.Prix(price);

        //contact title
        const ti = document.createElement('spawn');
        ti.textContent = ` ${name}`;

        //put everything in right place
        photographersSection.innerHTML= titre + img;
        prix.innerHTML= like + pri;
        modal.appendChild(ti);
    }
    );
};

// display images

function displayMedia(media) {

    n = 0;
    let likecount = 0
    const under = document.querySelector(".photograph-pics");
    const light = document.getElementById("images");
    media = Filter.filtermedia(path, media);
    media.forEach((med) => {
        const { title, image, video, likes } = med;

        //n = number of the image
        n++;

        //counts the total number of likes
        likecount = likecount + likes;

        //set up image or video

        if (med.hasOwnProperty('image')) {
            imag = Images.image(Images.media(title, n), image)
            im = Images.image(Images.lightbox(title), image)
        }
        else {
            imag = Images.video(Images.media(title, n), video, null)
            im = Images.video(Images.lightbox(title), video, "controls")
        }

        //title + heart container
        const tit = Media.Titre(title, likes);

        //container
        const cont = Media.container(tit,imag);

        //put it in the page
        under.innerHTML += cont;

        //MODAL

        ima = Light.cont(Light.title(title), im)

        //put it in the modal
        light.innerHTML+= ima;

    });

    return likecount;
}

//deploy sort button

function editNav() {
    let x = document.getElementById("box");
    let arrow = document.getElementById("arrow");
    if (x.className == "") {
        x.className += " responsive";
        x.setAttribute("aria-haspopup", "listbox");
        x.setAttribute("aria-expanded", "true");
        arrow.className += "2";
    } else {
        x.className = "";
        x.removeAttribute("aria-haspopup");
        x.setAttribute("aria-expanded", "false");
        arrow.className = "arrow";
    }
}

//Event like
function iflike() {
    const liking = document.getElementsByClassName('heart');

    for (let i = 0; i < liking.length; i++) {
        liking[i].addEventListener("click", function (e) {
            let target = e.target
            let total = document.getElementsByClassName('likes')[0].textContent;
            text = target.textContent.match(/\d+/)[0];
            if (e.target.id != "check") {
                text++;
                total++;
                e.target.id = "check";
            }
            else {
                text--;
                total--;
                e.target.id = "";

            }
            document.getElementsByClassName('likes')[0].textContent = total;
            e.target.textContent = `${text} ♥`;

        });
    }
}

//change images and order of list when clicking on filter


function change(media, Two) {

    const box = document.getElementById('box');
    const nav = document.getElementById('one');
    const under = document.querySelector(".photograph-pics");
    const light = document.getElementById("lightbox");

    //stores name of one of the sorting button being swapped, swap them
    let store = Two.textContent;
    Two.textContent = nav.textContent;
    nav.textContent = store;

    //puts arrows and x button back after sorting
    light.innerHTML = `<div id = "images"></div>
    <div id="leftarrow" tabindex="0" aria-label="Previous Image"> &lt; </div>
    <div id="rightarrow" tabindex="0" aria-label="Next image"> &gt; </div>
    <div id="x" tabindex="0" aria-label="close dialog">x</div>`;

    //empties images before replacing them
    under.innerHTML = "";

    //sorting
    media.sort(function (a, b) {
        if (nav.textContent == "Popularité") {
            let dateA = new Date(a.likes), dateB = new Date(b.likes)
            return dateB - dateA
        }
        if (nav.textContent == "Date") {
            let dateA = new Date(a.date), dateB = new Date(b.date)
            return dateB - dateA
        }
        if (nav.textContent == "Titre") {
            return a.title.localeCompare(b.title);
        }
    });
    box.setAttribute("aria-label", `Trier par ${store}`);

    displayMedia(media);

    //consts for lightbox
    const right = document.querySelector('#rightarrow');
    const left = document.querySelector('#leftarrow');
    const lightbox = document.querySelector('#x');

    //events for lightbox (scrolling and closing)
    lightbox.addEventListener("click", closelight);
    right.addEventListener("click", righ);
    left.addEventListener("click", lef);
    iflike()

}

async function init() {

    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    const { media } = await getMedia();
    getPick()
    let like = await displayMedia(media);
    displayData(photographers, like);

    //switch for keyboard sorting
    let n = 0;

    //consts for sorting
    const nav = document.getElementById('one');
    const box = document.getElementById('box');
    const Two = document.querySelector('.trie-box2');
    const Three = document.querySelector('.trie-box3');
    //consts for lightbox
    const light = document.getElementById('x');
    const right = document.getElementById('rightarrow');
    const left = document.getElementById('leftarrow');
    //like consts

    //modal submit button
    const conta = document.getElementById('contact_button');

    //keyboard events for sorting
    let Nav = function (e) {
        if (e.keyCode == '13') {
            editNav();
        }
        if (e.keyCode == '40') {
            e.preventDefault();
            if (n == 0) {
                change(media, Two);
                n = 1;
            }
            else {
                change(media, Three);
                n = 0;
            }
        }
    }

    //events for sorting
    box.addEventListener('keydown', Nav);
    nav.addEventListener("click", editNav);
    Two.addEventListener("click", chan);
    Three.addEventListener("click", chang);
    //events for lightbox
    light.addEventListener("click", closelight);
    right.addEventListener("click", righ);
    left.addEventListener("click", lef);
    //modal event
    conta.addEventListener("click", submit);

    //boot sorting
    function chan() {
        change(media, Two);
    }
    function chang() {
        change(media, Three);
    }

    iflike()

    //modal events
    const clos = document.getElementById("close");
    const button = document.querySelector(".conta_button");
    clos.addEventListener("click", closeModal);
    button.addEventListener("click", displayModal);

};

init();