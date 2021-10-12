import { classNames } from "../includes/classSelector";

const movieRating = el => {
    let markup = `
                <svg class="icon icon-star">
                    <use xlink:href="img/svg/icons.svg#icon-star"></use>
                </svg>`;
    if (el !== 0.5) {
        return markup;
    }
    else {
        markup = `
                <svg class="icon icon-star">
                    <use xlink:href="img/svg/icons.svg#icon-star-half"></use>
                </svg>`;
        return markup;
    }
};

const actors = (actor, index) => `${index}. ${actor}`;
export const displayMovie = movie => {
    const markup = `
    <div class="main-content__left">
        
    <div class="main-content__left--img">
        <img src="${movie.poster}" alt="${movie.title}">
    </div>
    <div class="main-content__left--watch">
        <button class='btn-watch'>
            <a href="${movie.url}">
            <svg class="icon  icon-watch">
            <use xlink:href="img/svg/icons.svg#icon-youtube"></use></svg> watch trailer
            </a>
        </button>
    </div>
    <div class="main-content__left--buy">
        <button class='btn-watch'>
            <svg class="icon  icon-buy">
                <use xlink:href="img/svg/icons.svg#icon-ticket"></use></svg>
                <span class="num-tickets">1</span> buy tickets
        </button>
    </div>
    </div>
    <div class="main-content__right">
    <div class="main-content__right-title">${movie.title}</div>
    <div class="main-content__right-social">
        <div class="main-content__right-social--likes">
           <button class="main-content__right-circle">
            <svg class="icon likes">
                <use xlink:href="img/svg/icons.svg#icon-heart-o"></use>
            </svg>
           
           </button>
        
        </div>
        <div class="main-content__right-social--add">
            <button class="main-content__right-circle">
            <svg class="icon  add-ticket">
                <use xlink:href="img/svg/icons.svg#icon-plus-circle"></use>
            </svg>
            
            </button>
        
        </div>
        <div class="main-content__right-social--minus">
            <button class="main-content__right-circle">
            <svg class="icon  minus-ticket">
                <use xlink:href="img/svg/icons.svg#icon-minus-circle1"></use>
            </svg>
            </button>
        </div>
    </div>
    <div class="main-content__right-reviews">
        <div class="main-content__right-reviews-stars">
           
                <svg class="icon icon-star">
                    <use xlink:href="img/svg/icons.svg#icon-star"></use>
                </svg>
            
            <div class="main-content__right-reviews--numbers">
                    <span class="review--number">${movie.imdbRating}/10</span>
                <span class="review--people">  ${movie.imdbVotes} reviews</span>

            </div>
            <span class="rate-this-movie">
                Rate This Movie:
                ${movie.ratingArray.map((el)=>movieRating(el)).join('')}
            </span>
        </div>
        <div class="main-content__right-description">
            <ul class="description">
                <li data-tab-target ="#overview" class="description-tab activeTab">Overview</li>
                <li data-tab-target ="#reviews" class="description-tab">Reviews</li>
                <li data-tab-target ="#castCrews" class="description-tab">Cast & Crew</li>
                <li data-tab-target ="#media" class="description-tab">Media</li>
            </ul>
            <div class="description-content">
                <div id="overview" class="description-content__item activeTab" data-tab-content>
                   
                    <p>${movie.plot}</p>
                </div>
                <div id="reviews" class="description-content__item" data-tab-content>
                   
                    <p>
                        The official IMDB score is ${movie.imdbRating}.
                        This has been calculated based on ${movie.imdbVotes} votes recorded.
                    </p>
                </div>
                <div id="castCrews" class="description-content__item" data-tab-content>
                <p>${movie.actors.map((el,index) => actors(el, index))}</p>    
                </div>
                <div id="media" class="description-content__item" data-tab-content>
                    
                    <p>
                        ${movie.writer}
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>`;
    classNames.mainContent.insertAdjacentHTML('afterbegin', markup);
};

//RESET THE MAIN PANEL
export const resetMain = () => {
    classNames.mainContent.innerHTML = '';
};

//UPDATE NUMBER OF TICKETS
export const updateTicketNumber = movie => {
    document.querySelector('.num-tickets').textContent = movie.numTickets;
};