export default class Like {

    constructor() {
        this.likes = [];
    }

    addLikedMovie(id, poster, title, year, imdbRating) {
        const like = {
            id,
            poster,
            title,
            year,
            imdbRating
        };
        this.likes.push(like);
        this.persistDataLocally();
        return like;
    }

    deleteLikedMovie(id) {
        const index = this.likes.findIndex(curr => curr.id === id);
        this.likes.splice(index, 1);
        this.persistDataLocally();
    }

    showLikes() {
        return this.likes;
    }

    numberOfLikes() {
        return this.likes.length;
    }

    checkMovieLikedStatus(id) {
        return this.likes.findIndex(curr => curr.id === id) !== -1;
    }

    persistDataLocally() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    restoreDataLocalStorage() {
        const data = JSON.parse(localStorage.getItem('likes'));
        if (data) this.likes = data;
    }
}