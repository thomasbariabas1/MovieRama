import './style.css'

class MovieCard {
    constructor(movie) {
        this.movie = movie
    }

    render() {
        return `<div class="movie">${this.movie.original_title}</div>`
    }
}
export default MovieCard