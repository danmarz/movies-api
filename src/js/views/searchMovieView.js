import { classNames } from "../includes/classSelector";

export const getFormInput = () => classNames.formInput.value;

const displayMovie = movie => {
    const markup = `
    <div class="movie__slider-item">
        <a href="#${movie.imdbID}">
            <img src="${movie.Poster}" alt="${movie.Title}" >
        </a>
    </div>`;
    classNames.movieSlider.insertAdjacentHTML('beforeend', markup);
};

const arrowBtn = (page) => {
    const arrowBtns = `
        <button class="movie__slider-left arrow-btn" data-goto=${page-1}>
            <svg class="icon">
                <use xlink:href="img/svg/icons.svg#icon-arrow_back_ios"></use>
            </svg>
        </button>

        <button class="movie__slider-right arrow-btn" data-goto=${page+1}>
            <svg class="icon">
                <use xlink:href="img/svg/icons.svg#icon-arrow_forward_ios"></use>
            </svg>
        </button>
    `;
    classNames.movieSlider.insertAdjacentHTML('beforeend', arrowBtns);
};

export const displayResults = (movies, page = 1, itemsPerPage = 4) => {
    const first = (page - 1) * itemsPerPage;
    const last = page * itemsPerPage;

    movies.slice(first, last).forEach(displayMovie);
    arrowBtn(page);
};

//CLEAR INPUT SEARCH
export const resetInput = () => {
    classNames.formInput.value = '';
};

//CLEAR MOVIE SLIDER
export const resetMovieSlider = () => {
    classNames.movieSlider.innerHTML = '';
};

