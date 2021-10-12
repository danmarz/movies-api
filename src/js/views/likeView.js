import { classNames } from "../includes/classSelector";

export const displayLikeModel = like => {

    const markup = `
                <li class="likes__container--item">
                    <a href="#${like.id}">
                        <img src="${like.poster}">
                        <h2 class="title">${like.title}</h2>
                        <span class="year">${like.year}</span>
                        <span class="imdb-score">${like.imdbRating}/10</span>
                    </a> 
                </li>`;

    classNames.likeContainer.insertAdjacentHTML('beforeend', markup);
};

export const resetLikeModel = () => {
    classNames.likeContainer.innerHTML = '';
};

export const displayLike = likedStatus => {
    const fullHeart = 'img/svg/icons.svg#icon-heart';
    const emptyHeart = 'img/svg/icons.svg#icon-heart-o';

    if (likedStatus){
        document.querySelector('.icon-heart').setAttribute('href', fullHeart);
    }
    else {
        document.querySelector('.icon-heart').setAttribute('href', emptyHeart);
    }
};

export const displayLikeNumber = likedNumber => {
    classNames.likeCircle.textContent = likedNumber;
};


