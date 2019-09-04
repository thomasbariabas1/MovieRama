import './style.css'
import {baseImagesUrl, youtubeEmbedVideo} from "../../lib/constants";
import InstanceClass from "../../lib/InstanceClass";
import GetMovieVideos from "../../network/GetMovieVideos";
import GetMovieDetails from "../../network/GetMovieDetails";
import GetMovieReviews from "../../network/GetMoviewReviews";
import GetMovieSimilar from "../../network/GetMovieSimilar";
import {videoTypes} from "../../lib/enums";

class MovieCard extends InstanceClass{

    constructor({movie, api_key, genres}) {
        super();
        this.movie = movie;
        this.api_key = api_key;
        this.genres = genres;
        this.details = {};
        this.expanded = false;
        this.className = `card ${this.movie.id}`;
        this.expandedDetailsClassName = `expandedDetails ${this.movie.id} hide`;
    }

    #removeEventListeners = () =>{
        const cardElements =  this.rootElement.getElementsByClassName(`card ${this.movie.id}`);

        if(cardElements[0])
            cardElements[0].removeEventListener('click', this.expandCard, false)
    };

    #setUpEventListeners = () =>{

        const cardElements =  this.rootElement.getElementsByClassName(`card ${this.movie.id}`);

        if(cardElements[0])
            cardElements[0].addEventListener('click', this.expandCard, false)

    };

    fetchDetails = async (movieId) => {

            const response = await Promise.all([
                GetMovieDetails(this.api_key, movieId).then(res => res.json()),
                GetMovieReviews(this.api_key, movieId).then(res => res.json()),
                GetMovieSimilar(this.api_key, movieId).then(res => res.json()),
                GetMovieVideos(this.api_key, movieId).then(res => res.json())
            ]).then(res => {
                const details = {};

                const videos = res[3].results;
                const trailer = videos.filter(video=>video.type===videoTypes.TRAILER);
                let reviews = res[1].results;
                if(reviews.length>2){
                    reviews = [reviews[0],reviews[1]]
                }
                details['details'] = res[0];
                details['reviews'] = reviews;
                details['similar'] = res[2];
                details['trailer'] = trailer.length>0?trailer[0]:null;

                return details
            });

            this.details = {...response};

            //wait to end the animation before re-render
        setTimeout(()=>this.render(),300)
    };

    expandCard = (event) =>{
        //Toggle the class name of the list item
        event.currentTarget.classList.toggle("expanded");
        //Check if it is extended
        const expanded = event.currentTarget.classList.contains("expanded");
        //Get the div that hosts the details about the trailer, reviews and similar movies
        const extraMovieDetailsElement = document.getElementsByClassName(`expandedDetails ${this.movie.id}`);
        //Toggle the visibility of the div that has the extra details of the movie
        extraMovieDetailsElement[0].classList.toggle('hide');

        //In Case that list item is expanded
        if (expanded) {
            //Set local variable that is expanded
            this.expanded = true;
            //Set the class names into local variable to be used into the re-renders
            this.className = event.currentTarget.classList;
            //Set the class names into local variable to be used into the re-renders
            this.expandedDetailsClassName = extraMovieDetailsElement[0].classList;
            //Get the id of the movie
            const movieId = event.currentTarget.getAttribute("data-movieId");
            //Fetch the extra data for the movie
          this.fetchDetails(movieId)
        } else {
            this.expanded = false;
            this.details = {}
        }
    };

    render() {
        const {release_date, poster_path, genre_ids, overview, vote_average, title} = this.movie;

        const yearOfRelease = new Date(release_date).getFullYear();

        let genreName = [];
        this.genres.map(genre => {
            if (genre_ids.indexOf(genre.id) > -1) {
                genreName.push(genre.name)
            }
        });

        let trailerIframe = '';
        if( this.expanded && this.details.trailer)
            trailerIframe = youtubeEmbedVideo(this.details.trailer.key);

        this.#removeEventListeners();

        this.rootElement.innerHTML = (`<div class="${this.className}" data-movieId = ${this.movie.id}>
            <div class="listDetails">
            <div class="poster">
                <img src=${baseImagesUrl + poster_path + '?api_key=' + this.api_key}
                     alt=${title}>
            </div>
            <div class="details">
                   <div class="overlay"></div>
                <span class="title">
                     ${title}
                     <span class="yearOfRelease">(${yearOfRelease})</span>
                </span>
                <span class="genders">
                    Genders: ${genreName.join('<span class="separator">|</span>')}
                </span>
                <span class="voteAvg">
                    Vote Average:
                    <span>${vote_average}</span>
                </span>
                <span class="overview">
                    ${overview}
                </span>
            </div>
         </div>
            <div class="${this.expandedDetailsClassName}">
                   <div class="trailer">${trailerIframe}</div>
                   <span class="reviews"></span>
                   <span class="similar"></span>
            </div>
            </div>
        `);

        this.#setUpEventListeners()
    }
}



export default MovieCard