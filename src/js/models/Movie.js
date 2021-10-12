import { key, api, movieUrl } from '../config/config';

export default class Movie {
    constructor(imdbID) {
        this.imdbID = imdbID;
    }

    async getMovie() {
        try {
            const result = await fetch(`${api}i=${this.imdbID}&apikey=${key}`);
            const data = await result.json();
            // console.log(data);
            this.title = data.Title;
            this.rated = data.Rated;
            this.imdbRating = data.imdbRating;
            this.runtime = data.Runtime;
            this.actors = data.Actors;
            this.production = data.Production;
            this.poster = data.Poster;
            this.plot = data.Plot;
            this.boxOffice = data.BoxOffice;
            this.awards = data.Awards;
            this.director = data.Director;
            this.imdbVotes = data.imdbVotes;
            this.url = `${movieUrl}${this.imdbID}/`;
            this.numTickets = 1; 
            this.price = 10;
            this.getMainActor();
            this.movieCrew(data.Writer);
            this.movieRating(data.imdbRating);
        } catch (err) {
            alert('Something went wrong loading the movie');
        }
    }
//GET THE MAIN ACTOR FROM AN ARRAY
    getMainActor() {
        const newActor = this.actors.split(', ');
        this.actors = newActor;
        this.mainActor = newActor[0];
    };
//CREATING MOVIE CREW
    movieCrew(writer) {
        this.writer = writer.split(', ');
    };
//MOVIE RATING
    movieRating(imdbRating) {
        // imdbRating = '10';
        this.ratingArray = [];
        if (imdbRating === '10') {
            for (let i = 0; i < parseInt(imdbRating); i++) {
                this.ratingArray.push(i);
            }
        }
        else {
            let theArray = imdbRating.split(".");
            let intPart = parseInt(theArray[0]);
            let decPart = parseInt(theArray[1]);
            if (decPart > 0) {
                for(let i = 0; i < intPart; i++){
                    this.ratingArray.push(i);
                }
                this.ratingArray.push(0.5);
            }
            else {
                for(let i = 0; i < intPart; i++){
                    this.ratingArray.push(i);
                }
            }
        }
    };
//ADD A TICKET OR REMOVE A TICKET
    updateTickets(ticketType){
        const newTicketsNum = ticketType === 'add' ? this.numTickets + 1 : this.numTickets - 1;
        this.numTickets = newTicketsNum;
    }

    updateFromCart(num) {
        this.numTickets = num;
    }
    
}