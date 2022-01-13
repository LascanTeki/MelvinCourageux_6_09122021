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

    photographers.forEach((photographer) => {
        const { name, portrait, id, tagline, city, country, price } = photographer;
        if (id == path) {

            //photographer icon
            const picture = `assets/photographers/${portrait}`;
            const img = document.createElement('img');
            img.setAttribute("src", picture);
            img.setAttribute("alt", name);


            //"contactez moi" bouton
            const button = document.createElement('button');
            button.setAttribute("class", 'conta_button');
            button.textContent = "Contactez-moi";

            //nom
            const photoname = document.createElement('h2');
            photoname.textContent = name;

            //city
            const lieu = document.createElement('div');
            lieu.setAttribute("class", "lieu")
            lieu.textContent = `${city}, ${country}`;

            //quote
            const tag = document.createElement('div');
            tag.setAttribute("class", "tag")
            tag.textContent = tagline;

            //div contenant nom + city + quote
            const titre = document.createElement('div');
            titre.setAttribute("class", 'Photo_title');
            titre.appendChild(photoname);
            titre.appendChild(lieu);
            titre.appendChild(tag);

            //like count
            const li = document.createElement('span');
            li.textContent = likecount;
            prix.appendChild(li);


            //heart
            const he = document.createElement('span');
            he.setAttribute("class", "heart")
            he.textContent = "♥";
            prix.appendChild(he);


            //price in corner
            const pri = document.createElement('span');
            pri.textContent = `${price}€/jour`;
            prix.appendChild(pri);



            //put everything in right place
            photographersSection.appendChild(titre);
            photographersSection.appendChild(button);
            photographersSection.appendChild(img);
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

            n = n + 1;
            var imag = 0;
            var pic = 0;
            likecount = likecount + likes;

            //set up image or video

            if (med.hasOwnProperty('image')) {
                pic = `assets/Sample Photos/${image}`;
                imag = document.createElement('img');
                im = document.createElement('img');
            }
            else {
                pic = `assets/Sample Photos/${video}`;
                imag = document.createElement('video');
                imag.setAttribute("controls", "controls");
                im = document.createElement('video');
                im.setAttribute("controls", "controls");
            }

            imag.setAttribute("src", pic);
            imag.setAttribute("alt", title);
            imag.setAttribute("onclick", `currentSlide(${n})`);

            //likes
            const heart = document.createElement('span');
            heart.setAttribute("class", "heart");
            heart.textContent = `${likes} ♥`;

            //title
            const ti = document.createElement('div');
            ti.setAttribute("class", "title");
            ti.textContent = title;
            ti.appendChild(heart);

            //container

            const cont = document.createElement('div');
            cont.setAttribute("class", "cont");
            cont.appendChild(imag);
            cont.appendChild(ti);

            //put it in the page
            under.appendChild(cont);


            //MODAL

            //image
            im.setAttribute("src", pic);
            im.setAttribute("alt", `${title} zoomed`);

            //title
            const titl = document.createElement('div');
            titl.setAttribute("class", "titl");
            titl.textContent = title;

            //modal container
            const ima = document.createElement('div');
            ima.setAttribute("class", `mySlides`);
            
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
        arrow.className += "2";
    } else {
        x.className = "";
        arrow.className = "arrow";
    }
}

//change images and order of list when clicking on filter

function change2(media, Two) {

    const nav = document.getElementById('one');
    const under = document.querySelector(".photograph-pics");
    const light = document.getElementById("lightbox");

    var store = Two.textContent;

    Two.textContent = nav.textContent;
    nav.textContent = store;
    light.innerHTML = `<div class="x">x</div><div class="leftarrow"> &lt; </div><div class="rightarrow"> &gt; </div>`;
    under.innerHTML = "";

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

    displayMedia(media);

    //consts pour lightbox
    const right = document.querySelector('.rightarrow');
    const left = document.querySelector('.leftarrow');
    const lightbox = document.querySelector('.x');
    //events pour lightbox
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

    //consts pour trier
    const nav = document.getElementById('one');
    const Two = document.querySelector('.trie-box2');
    const Three = document.querySelector('.trie-box3');
    //consts pour lightbox
    const light = document.querySelector('.x');
    const right = document.querySelector('.rightarrow');
    const left = document.querySelector('.leftarrow');

    //events pour trier
    nav.addEventListener("click", editNav);
    Two.addEventListener("click", change);
    Three.addEventListener("click", chang);
    //events pour lightbox
    light.addEventListener("click", closelight);
    right.addEventListener("click", righ);
    left.addEventListener("click", lef);

    //boot trier
    function change() {
        change2(media, Two);
    }
    function chang() {
        change2(media, Three);
    }

    //modal events
    const clos = document.querySelector(".close");
    const button = document.querySelector(".conta_button");
    clos.addEventListener("click", closeModal);
    button.addEventListener("click", displayModal);

};

init();





