const path = window.location.search.substr(1);

async function getPhotographers() {

    // Penser à remplacer par les données récupérées dans le json
    const response = await fetch('./data/photographers.json');
    const names = await response.json();
    const photographers = names.photographers;
    const img = names.media


    // et bien retourner le tableau photographers seulement une fois
    return ({
        photographers: [...photographers]
    })
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photograph-header");
    const under = document.querySelector(".photograph-pics");
    const prix = document.querySelector(".like");

    

    photographers.forEach((photographer) => {
        const { name, portrait, id, tagline, city, country, price } = photographer;
        if (id == path) {

            //photographer icon
            const picture = `assets/photographers/${portrait}`;
            const img = document.createElement('img');
            img.setAttribute("src", picture);

            //"contactez moi" bouton
            const button = document.createElement('button');
            button.setAttribute("class", 'contact_button');
            button.setAttribute("onclick", 'displayModal()');
            button.textContent = "Contactez-moi";

            //nom
            const photoname = document.createElement('h2');
            photoname.textContent = name;

            //city
            const lieu = document.createElement( 'div' );
            lieu.setAttribute("class", "lieu")
            lieu.textContent = `${city}, ${country}`;

            //quote
            const tag = document.createElement( 'div' );
            tag.setAttribute("class", "tag")
            tag.textContent = tagline;    

            //div contenant nom + city + quote
            const titre = document.createElement('div');
            titre.setAttribute("class", 'Photo_title');
            titre.appendChild(photoname);
            titre.appendChild(lieu);
            titre.appendChild(tag);

            const pri = document.createElement('span');
            pri.textContent = `${price}€/jour`;   
            prix.appendChild(pri);

            photographersSection.appendChild(titre);
            photographersSection.appendChild(button);
            photographersSection.appendChild(img);
        }
    });
};

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();
