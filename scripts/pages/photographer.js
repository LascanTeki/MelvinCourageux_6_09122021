const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const path = urlParams.get('id')

//Sort button
async function getPick() {

    var One = "Popularité";
    var Two = "Date";
    var Three = "Titre";
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
        var dateA = new Date(a.likes), dateB = new Date(b.likes)
        return dateB - dateA
    });

    // et bien retourner le tableau photographers seulement une fois
    return ({
        media: [...media]
    })
}

//Display the profile

async function displayData(photographers, likecount) {
    const photographersSection = document.querySelector(".photograph-header");
    const prix = document.querySelector(".like");
    const modal = document.getElementById("contact");

    photographers.forEach((photographer) => {
        const { name, portrait, id, tagline, city, country, price } = photographer;
        if (id == path) {

            //photographer icon
            const picture = `assets/photographers/${portrait}`;
            const img = document.createElement('img');
            img.setAttribute("src", picture);
            img.setAttribute("alt", name);
            img.setAttribute("tabindex", "0")


            //"contactez moi" bouton
            const button = document.createElement('button');
            button.setAttribute("class", 'conta_button');
            button.textContent = "Contactez-moi";

            //nom
            const photoname = document.createElement('h2');
            photoname.textContent = name;
            photoname.setAttribute("tabindex", "0")

            //city
            const lieu = document.createElement('div');
            lieu.setAttribute("class", "lieu")
            lieu.textContent = `${city}, ${country}`;

            //quote
            const tag = document.createElement('div');
            tag.setAttribute("class", "tag")
            tag.textContent = tagline;

            //div city + quote

            const tab = document.createElement('div');
            tab.appendChild(lieu);
            tab.appendChild(tag);
            tab.setAttribute("tabindex", "0")

            //div contenant nom + city + quote
            const titre = document.createElement('div');
            titre.setAttribute("class", 'Photo_title');
            titre.appendChild(photoname);
            titre.appendChild(tab);

            //like count
            const li = document.createElement('span');
            li.setAttribute("class", 'likes');
            li.textContent = likecount;
            prix.appendChild(li);


            //heart
            const he = document.createElement('span');
            he.setAttribute("class", "heart")
            he.textContent = "♥";
            he.setAttribute("aria-label", `likes`)
            prix.appendChild(he);


            //price in corner
            const pri = document.createElement('span');
            pri.textContent = `${price}€/jour`;
            pri.setAttribute("aria-label", `${price}€ par jour`)
            prix.appendChild(pri);

            //contact title
            const ti = document.createElement('spawn');
            ti.textContent =` ${name}`;

            //put everything in right place
            photographersSection.appendChild(titre);
            photographersSection.appendChild(button);
            photographersSection.appendChild(img);
            modal.appendChild(ti);
        }
    });
};

// display images

async function displayMedia(media) {

    n = 0;
    var likecount = 0
    const under = document.querySelector(".photograph-pics");
    const light = document.getElementById("lightbox");

    media.forEach((med) => {
        const { photographerId, title, image, video, likes } = med;
        if (photographerId == path) {

            //n = number of the image
            n++;

            //counts the total number of likes
            likecount = likecount + likes;

            //set up image or video

            if (med.hasOwnProperty('image')) {
                pic = `assets/Sample Photos/${image}`;
                imag = document.createElement('img');
                im = document.createElement('img');
                imag.setAttribute("alt", `${title}, closeup view`);
            }
            else {
                pic = `assets/Sample Photos/${video}`;
                imag = document.createElement('video');
                imag.setAttribute("aria-label", `${title}, closeup view`);
                im = document.createElement('video');
                im.setAttribute("controls", "controls");
            }

            imag.setAttribute("tabindex", "0")
            imag.setAttribute("src", pic);
            imag.setAttribute("onclick", `currentSlide(${n})`);
            imag.setAttribute("onkeypress", `currentSlide(${n})`);

            //likes
            const heart = document.createElement('span');
            heart.setAttribute("class", "heart");
            heart.textContent = `${likes} ♥`;
            heart.setAttribute("aria-label", `${likes} likes`)
            heart.setAttribute("tabindex", "0")

            //title
            const ti = document.createElement('div');
            ti.setAttribute("tabindex", "0")
            ti.textContent = title;

            //title + heart container
            const tit = document.createElement('div');
            tit.setAttribute("class", "title");
            tit.appendChild(ti);
            tit.appendChild(heart);

            //container
            const cont = document.createElement('div');
            cont.setAttribute("class", "cont");
            cont.appendChild(imag);
            cont.appendChild(tit);

            //put it in the page
            under.appendChild(cont);

            //MODAL

            //image
            im.setAttribute("src", pic);
            im.setAttribute("alt", `${title}`);
            im.setAttribute("tabindex", "2")

            //title
            const titl = document.createElement('div');
            titl.setAttribute("class", "titl");
            titl.textContent = title;
            titl.setAttribute("tabindex", "3")

            //modal container
            const ima = document.createElement('div');
            ima.setAttribute("class", `mySlides`);
            ima.setAttribute("aria-label", "image closeup view")
            ima.appendChild(im);
            ima.appendChild(titl);

            //put it in the modal
            light.appendChild(ima);

        }
    });

    return likecount;
}

//deploy sort button

function editNav() {
    var x = document.getElementById("box");
    var arrow = document.getElementById("arrow");
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

//change images and order of list when clicking on filter

function change(media, Two) {

    const box = document.getElementById('box');
    const nav = document.getElementById('one');
    const under = document.querySelector(".photograph-pics");
    const light = document.getElementById("lightbox");

    //stores name of one of the sorting button being swapped, swap them
    var store = Two.textContent;
    Two.textContent = nav.textContent;
    nav.textContent = store;

    //puts arrows and x button back after sorting
    light.innerHTML = `<div class="x" tabindex="6" aria-label="close dialog">x</div>
    <div class="leftarrow" tabindex="4" aria-label="Previous Image"> &lt; </div>
    <div class="rightarrow" tabindex="5" aria-label="Next image"> &gt; </div>`;

    //empties images before replacing them
    under.innerHTML = "";

    //sorting
    media.sort(function (a, b) {
        if (nav.textContent == "Popularité") {
            var dateA = new Date(a.likes), dateB = new Date(b.likes)
            return dateB - dateA
        }
        if (nav.textContent == "Date") {
            var dateA = new Date(a.date), dateB = new Date(b.date)
            return dateB - dateA
        }
        if (nav.textContent == "Titre") {
            return a.title.localeCompare(b.title);
        }
    });
    box.setAttribute("aria-label", `Trier par ${store}`);

    displayMedia(media);

    //consts for lightbox
    const right = document.querySelector('.rightarrow');
    const left = document.querySelector('.leftarrow');
    const lightbox = document.querySelector('.x');

    //events for lightbox (scrolling and closing)
    lightbox.addEventListener("click", closelight);
    right.addEventListener("click", righ);
    left.addEventListener("click", lef);

}

async function init() {

    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    const { media } = await getMedia();
    getPick()
    var like = await displayMedia(media);
    displayData(photographers, like);

    //switch for keyboard sorting
    var n = 0;

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
    const liking = document.getElementsByClassName('heart');
    //modal submit button
    const conta = document.getElementById('contact_button');

    //keyboard events for sorting
    var Nav = function (e) {
        if (e.keyCode == '13') {
            editNav();
        }
        if (e.keyCode == '40') {
            e.preventDefault();
            if (n == 0) {
                change(media, Two);
                n=1;
            }
            else {
                change(media, Three);
                n=0;
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


    //Event like
    for (var i = 0; i < liking.length; i++) {
        liking[i].addEventListener("click", function (e) {
            var target = e.target
            var total = document.getElementsByClassName('likes')[0].textContent;
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

    //modal events
    const clos = document.getElementById("close");
    const button = document.querySelector(".conta_button");
    clos.addEventListener("click", closeModal);
    button.addEventListener("click", displayModal);

};

init();