import './style.css'
import {baseImagesUrl} from "../../lib/constants";

class MovieCard {
    constructor({movie, api_key, genres}) {
        this.movie = movie
        this.api_key = api_key
        this.genres = genres
    }

    render() {
        const yearOfRelease = new Date(this.movie.release_date).getFullYear()
        let genreName = []
        this.genres.map(genre=>{
            if(this.movie.genre_ids.indexOf(genre.id)>-1){
                genreName.push(genre.name)
            }
        })

        return `<div class="movieCard">
<div class="poster">
<img src=${baseImagesUrl + this.movie.poster_path + '?api_key=' + this.api_key}  height="400px" width="300px">
</div>
<div class="movieDetails">
<span>${this.movie.title}(${yearOfRelease})</span>
<span>${genreName.join('|')}</span>
<span>${this.movie.vote_average}</span>
<span>${this.movie.overview}</span>
</div>
</div>`
    }
}

export default MovieCard