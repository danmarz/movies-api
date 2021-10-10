//Global APP controller
import Search from './models/Search';

const data = {

};
window.data = data;

const searchController = async () => {
    //GET SEARCH QUERY FROM THE FORM
    const query = `Batman`;
    if(query){
        //CREATE NEW OBJ FROM SEARCH CLASS
        data.search = new Search(query);
        
        //MOVIE SEARCH
        await data.search.getSearchResult();
        //DISPLAY THE DATA TO THE UI
        console.log(data.search.movies);
    }
}

document.querySelector('.movie-search').addEventListener('submit', e => {
    e.preventDefault();
    //CALL SEARCH CONTROLLER
    searchController();
})