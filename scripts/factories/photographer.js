function photographerFactory(data) {
    const { name, portrait, id, tagline, city, country, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {

        const article = document.createElement('article');

        //image
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);

        //nom de l'artiste
        const h2 = document.createElement('h2');
        h2.textContent = name;

        //lien autour de l'image et de h2
        const image = document.createElement('a');
        image.setAttribute("href", `photographer.html?id=${id}`);
        image.appendChild(img);
        image.appendChild(h2); 

        //lieu
        const lieu = document.createElement('div');
        lieu.setAttribute("class", "lieu");
        lieu.textContent = `${city}, ${country}`;

        //commentaire
        const tag = document.createElement('div');
        tag.setAttribute("class", "tag");
        tag.textContent = tagline;

        //prix
        const prix = document.createElement('div');
        prix.setAttribute("class", "prix");
        prix.textContent = `${price}€/jour`;

        //div autour des infos
        const div = document.createElement('div');
        div.setAttribute("tabindex", "0");
        div.appendChild(lieu);
        div.appendChild(tag);
        div.appendChild(prix);

        //construire l'article (grande div)

        article.appendChild(image);
        article.appendChild(div);
        
        return (article);
    }
    return { name, picture, getUserCardDOM };
}
