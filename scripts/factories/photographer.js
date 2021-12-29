function photographerFactory(data) {
    const { name, portrait, id, tagline, city, country, price } = data;

    const picture = `assets/photographers/${portrait}`;



    function getUserCardDOM() {

        const article = document.createElement( 'article' );

        //image
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)

        //lien autour de l'image
        const image = document.createElement( 'a' );
        image.setAttribute("href", `photographer.html?id=${id}`);
        image.appendChild(img);

        //nom de l'artiste
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        //lieu
        const lieu = document.createElement( 'div' );
        lieu.setAttribute("class", "lieu")
        lieu.textContent = `${city}, ${country}`;

        //commentaire
        const tag = document.createElement( 'div' );
        tag.setAttribute("class", "tag")
        tag.textContent = tagline;

        //prix
        const prix = document.createElement( 'div' );
        prix.setAttribute("class", "prix")
        prix.textContent = `${price}€/jour`;

        //construire l'article (grande div)

        article.appendChild(image);
        article.appendChild(h2);
        article.appendChild(lieu);
        article.appendChild(tag);
        article.appendChild(prix);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}
