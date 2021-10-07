export default class Search {

    constructor(query) {
        this.query = query;
    }

    async getSearchResult() {
        // API key: ac8e4d79
        const key = `ac8e4d79`;

        // OMDB API: http://www.omdbapi.com/?i=xxx&apikey=ac8e4d79
        // THIS WILL RETURN A MOVIE BASED ON THE ID
        // const result = await fetch(`http://www.omdbapi.com/?i=tt2313197&apikey=${key}`);    
        try {
            // THIS WILL RETURN A MOVIE BASED ON A QUERY
            const result = await fetch(`http://www.omdbapi.com/?apikey=${key}&s=${this.query}`);
            const data = await result.json();
            // console.log(data.Search);
            this.movies = data.Search;
            // console.log(this.movies);
        } catch (err) {
            console.log(err);
        }
    }
}