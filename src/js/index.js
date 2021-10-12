//Global APP controller
import { classNames, loader, stopLoader } from './includes/classSelector';
import Search from './models/Search';
import Movie from './models/Movie';
import Cart from './models/Cart';
import Like from './models/Like';
import * as searchMovieView from './views/searchMovieView';
import * as movieView from './views/movieView';
import * as cartView from './views/cartView';
import * as likeView from './views/likeView';

/*
    GLOBAL APPLICATIoN STATE
    1. SEARCH OBJ
    2. MOVIE OBJ
    3. CART OBJ
    4. LIKE OBJ
*/

const data = {

};
// window.data = data;

const searchController = async () => {
    //GET SEARCH QUERY FROM THE FORM
    // const query = `Batman`;
    const query = searchMovieView.getFormInput();
    // console.log(query);
    if (query) {
        //CREATE NEW OBJ FROM SEARCH CLASS
        data.search = new Search(query);

        //CLEAR INPUT SEARCH
        searchMovieView.resetInput();
        //CLEAR MOVIE SLIDER
        searchMovieView.resetMovieSlider();

        //LOADER
        loader(classNames.parentElement);

        try {
            //MOVIE SEARCH
            await data.search.getSearchResult();
            //STOP LOADER
            stopLoader();
            //DISPLAY THE DATA TO THE UI
            // console.log(data.search.movies);
            searchMovieView.displayResults(data.search.movies);
        } catch (error) {
            alert('Error while searching the movie')
        }
    }
};

//MOVIE CONTROLLER (old)
// const movie = new Movie('tt1483013');
// movie.getMovie();
//MOVIE CONTROLLER



const movieController = async () => {
    const id = window.location.hash.replace('#', '');
    // console.log(id);
    if (id) {
        //CREATE NEW MOVIE OBJ
        data.movie = new Movie(id);
        //LOADER
        loader(classNames.parentElement);
        //GET MOVIE DATA
        try {
            await data.movie.getMovie();
            //STOP LOADER
            stopLoader();
            //RESET THE MAIN CONTENT
            movieView.resetMain();
            //DISPLAY THE MOVIE
            movieView.displayMovie(data.movie, data.like.checkMovieLikedStatus(id));
            //DISPLAY THE DESCRIPTIoN TABS
            movieDescription();
            // console.log(data.movie);
        } catch (error) {
            alert('Something went wrong with fetching the movie from the ID')
        }
    }
};
//MOVIE DESCRIPTIoN TABS
const movieDescription = () => {
    const tabs = document.querySelectorAll('[data-tab-target]');
    const tabContent = document.querySelectorAll('[data-tab-content]');
    tabs.forEach(element => {
        element.addEventListener('click', () => {
            //console.log('Tab item was clicked');
            const target = document.querySelector(element.dataset.tabTarget);
            //REMOVE ACTIVETAB CLASS FROM EACH ELEMENT
            tabContent.forEach(el => {
                el.classList.remove('activeTab');
            });
            tabs.forEach(tab => {
                tab.classList.remove('activeTab');
            });
            element.classList.add('activeTab');
            // console.log(target);
            target.classList.add('activeTab');
        });
    });
}

function hashHandler() {
    if (location.hash != '#target-content' && location.hash != '#target-content1' && location.hash != '#') {
        movieController();
    }
}
// window.addEventListener('hashchange', movieController);
window.addEventListener('hashchange', hashHandler);
window.addEventListener('load', movieController);

//CART CONTROLLER

const cartController = () => {
    //CREATE NEW CART
    if (!data.cart) data.cart = new Cart();
    //ADD MOVIE DETAILS
    const movieItem = data.cart.addItem(data.movie.numTickets, data.movie.title, data.movie.price);
    //DISPLAY THE MOVIE ITEM
    cartView.displayMovieItem(movieItem);
    //DISPLAY THE CART NUMBER
    const cartNumber = data.cart.showList();
    cartView.displayCartNumber(cartNumber.length);
}

//LIKE CONTROLLER
const likeController = () => {
    if (!data.like) data.like = new Like();

    const likedId = data.movie.imdbID;

    if (!data.like.checkMovieLikedStatus(likedId)) {

        data.like.addLikedMovie(
            data.movie.imdbID,
            data.movie.poster,
            data.movie.title,
            data.movie.year,
            data.movie.imdbRating);

        //RESET LIKES ON MODEL
        likeView.resetLikeModel();
        //DISPLAY LIKE ON MODEL
        likeView.displayLikeNumber(data.like.numberOfLikes());
        const likes = data.like.showLikes();
        likes.forEach(el => {
            likeView.displayLikeModel(el);
        });
        //CHECK THE STATUS OF THE LIKE BTN
        const checkIsLiked = data.like.checkMovieLikedStatus(data.like.id);
        likeView.displayLike(!checkIsLiked);
    }
    else {
        data.like.deleteLikedMovie(likedId);
        likeView.displayLikeNumber(data.like.numberOfLikes());

        //CHECK THE STATUS OF THE LIKE BTN
        const checkIsLiked = data.like.checkMovieLikedStatus(data.like.id);
        likeView.displayLike(checkIsLiked);

        //RESET LIKES ON MODEL
        likeView.resetLikeModel();
        //DISPLAY LIKE ON MODEL
        likeView.displayLikeNumber(data.like.numberOfLikes());
        const likes = data.like.showLikes();
        likes.forEach(el => {
            likeView.displayLikeModel(el);
        });
    }
};

//EVENT LISTENERS

//1. BROWSER REFRESH LOCALSTORAGE

window.addEventListener('load', () => {
    window.data = data;
    data.like = new Like();
    data.cart = new Cart();

    data.like.restoreDataLocalStorage();
    //DISPLAY THE LIKES FROM LOCALSTORAGE
    const likes = data.like.showLikes();
    likes.forEach(el => {
        likeView.displayLikeModel(el);
    });
    //DISPLAY LIKE NUMBER
    likeView.displayLikeNumber(data.like.numberOfLikes());
    //DISPLAY THE CART FROM LOCAL STORAGE
    data.cart.restoreDataLocalStorage();
    const movies = data.cart.showList();
    movies.forEach(el => {
        cartView.displayMovieItem(el);
    });
    //CART NUMBER
    const cartNumber = data.cart.showList();
    cartView.displayCartNumber(cartNumber.length);
});

//2. SEARCH FORM SUBMIT
classNames.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    //CALL SEARCH CONTROLLER
    searchController();
});

//3. MOVIE SLIDER ARROW BTN LEFT AND RIGHT
classNames.movieSlider.addEventListener('click', e => {
    const sliderBtn = e.target.closest('.arrow-btn');
    // console.log(data.search.movies.length); //10
    //NUMBER OF PAGES
    const pages = Math.ceil(data.search.movies.length / 4); // 2.5 -> 3
    // console.log(pages);

    if (sliderBtn) {
        const pageNum = parseInt(sliderBtn.dataset.goto);
        if (pageNum != 0 && pageNum <= pages) {
            searchMovieView.resetMovieSlider();
            searchMovieView.displayResults(data.search.movies, pageNum)
        };
    };
});

//4. INCREASE OR DECREASE TICKET NUMBER, ADD TICKETS TO CART, LIKE MOVIE
classNames.mainContent.addEventListener('click', e => {
    if (e.target.matches('.main-content__right-social--add, .main-content__right-social--add *')) {
        data.movie.updateTickets('add');
        movieView.updateTicketNumber(data.movie);
    }
    else if (e.target.matches('.main-content__right-social--minus, .main-content__right-social--minus *')) {
        if (data.movie.numTickets > 1) {
            data.movie.updateTickets('minus');
            movieView.updateTicketNumber(data.movie);
        }
    }
    else if (e.target.matches('.main-content__left--buy, .main-content__left--buy *')) {
        cartController();
    }
    else if (e.target.matches('.main-content__right-social--likes, .main-content__right-social--likes *')) {
        likeController();
    }
});

//5. DELETE AND UPDATE THE CART
classNames.cartContainer.addEventListener('click', e => {
    let id = e.target.closest('.target-inner__list');
    id = id.dataset.deleteid;

    if (e.target.matches('.target-inner__list-delete, .target-inner__list-delete *')) {
        //DELETE THE ITEM FROM DATA
        data.cart.deleteItem(id);
        //DELETE FROM UI
        cartView.deleteMovieItem(id);
        //UPDATE CART NUMBER
        const cartNumber = data.cart.showList();
        cartView.displayCartNumber(cartNumber.length);
    }
    else if (e.target.matches('.target-inner__list--tickets, .target-inner__list--tickets *')) {
        const newTicketNumber = parseInt(e.target.value);
        if (newTicketNumber > 1) {
            data.cart.updateNumMovies(id, newTicketNumber);
            //UPDATE THE TICKET NUMBERS FROM CART
            data.movie.updateFromCart(newTicketNumber);
            data.cart.calcPrice(data.movie.numTickets);
        }
    }
});