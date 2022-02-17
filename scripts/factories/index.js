function photographerFactory(data) {
    const { name, portrait, id, tagline, city, country, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {

        const article = document.createElement('article');

        //image + h2

        const image = UserCard.image(picture, name, id);

        //infos
        const div = UserCard.div(tagline, city, country, price);

        //construire l'article (grande div)

        article.innerHTML = image + div ;

        return (article);
    }
    return { name, picture, getUserCardDOM };
}


class UserCard {

    //image + h2
    static div( tagline, city, country, price) {
        return `<div tabindex="0">
                    <div class="lieu"> ${city}, ${country}</div>
                    <div class="tag"> ${tagline}</div>
                    <div class="prix" aria-label="${price}€ par jour">${price}€/jour</div>
                </div>`
    }

    //infos
    static image(picture, name, id) {
        return `<a href="photographer.html?id=${id}" >
                    <img src="${picture}" alt="${name}">
                    <h2 aria-hidden="true">${name}</h2>
                </a>`
    }
}