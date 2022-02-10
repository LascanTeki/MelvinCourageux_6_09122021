class Card {
    static title( tagline, city, country, name) {
        return `<div class="Photo_title">
                    <h2 tabindex="0">${name}</h2>
                    <div tabindex="0"> 
                        <div class="lieu"> ${city}, ${country}</div> 
                        <div class="tag"> ${tagline}</div>
                    </div>
                </div>`
    }
    static img(name, portrait) {
        return `
        <button class="conta_button">Contactez-moi</button>
        <img tabindex="0" src="assets/photographers/${portrait}" alt="${name}">`
    }
}

class Corner {
    static Like(likecount) {
        return ` <span class="likes">${likecount}</span>
        <span class="heart" aria-label="likes" >♥</span>`
    }
    static Prix(price) {
        return `<span class="likes" aria-label="${price}€ par jour">${price}€/jour</span>`
    }
}

class Images {
    static image(middle, image) {
        return `<img src="assets/Sample Photos/${image}" alt${middle}img>`
    }
    static video(middle, video, control) {
        return `<video ${control} src="assets/Sample Photos/${video}" aria-label${middle}video>`
    }
    static media(title, n) {
        return `="${title}, closeup view" class="likes" tabindex="0" onclick="currentSlide(${n})" onkeypress="currentSlide(${n})" ></`
    }
    static lightbox(title){
        return  `="${title}, closeup view" class="likes" tabindex="0" ></`
    }

}

class Media{

    static Titre(title, likes) {
        return `<div class="title"> <div tabindex="0">${title}</div> <span tabindex="0" class="heart" aria-label="${likes} likes" >${likes} ♥</span> </div>`
    }
    static container(title, image){
        return `<div class="cont"> ${image} ${title}</div>`
    }

}


class Light {
    
    static title(title){
        return `<div class="titl" tabindex="0" >${title}</div>`
    }

    static cont(title, image){
        return `<div class="mySlides" aria-label="image closeup view" >${image} ${title}</div>`
    }
}