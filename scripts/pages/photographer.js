const path = window.location.search.substr(1);

console.log(path);

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

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photograph-header");

    photographers.forEach((photographer) => {
        const { name, portrait, id, tagline, city, country, price } = photographer;
        if (id == path){
            console.log(id);
            const picture = `assets/photographers/${portrait}`;
            const img = document.createElement( 'img' );
            img.setAttribute("src", picture)
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
