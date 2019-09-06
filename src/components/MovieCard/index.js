import {baseImagesUrl} from "../../lib/constants";
import InstanceClass from "../../lib/InstanceClass";
import GetMovieVideos from "../../network/API/GetMovieVideos";
import GetMovieDetails from "../../network/API/GetMovieDetails";
import GetMovieReviews from "../../network/API/GetMoviewReviews";
import GetMovieSimilar from "../../network/API/GetMovieSimilar";
import {videoTypes} from "../../lib/enums";
import '../../global/style/card.css'
import './movie-card.css'

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
                GetMovieDetails(this.api_key, movieId),
                GetMovieReviews(this.api_key, movieId),
                GetMovieSimilar(this.api_key, movieId),
                GetMovieVideos(this.api_key, movieId)
            ]).then(res => {
                const details = {};

                const videos = res[3].results;
                const trailer = videos.filter(video=>video.type===videoTypes.TRAILER);
                let reviews = res[1].results;
                if(reviews.length>2){
                    reviews = [reviews[0],reviews[1]]
                }
                let similar = res[2].results
                if(similar.length>7){
                    similar = similar.splice(0,6)
                }
                details['details'] = res[0];
                details['reviews'] = reviews;
                details['similar'] = similar;
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
        //Set the class names into local variable to be used into the re-renders
        this.className = event.currentTarget.classList;
        //Set the class names into local variable to be used into the re-renders
        this.expandedDetailsClassName = extraMovieDetailsElement[0].classList;
        //In Case that list item is expanded
        if (expanded) {
            //Set local variable that is expanded
            this.expanded = true;
            //Get the id of the movie
            const movieId = event.currentTarget.getAttribute("data-movieId");
            //Fetch the extra data for the movie
          this.fetchDetails(movieId)
        } else {
            this.expanded = false;
            this.details = {}
            //wait to end the animation before re-render
            setTimeout(()=>this.render(),300)
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

        let trailerKey = '';
        if( this.expanded && this.details.trailer)
            trailerKey = this.details.trailer.key;

        let reviews = []
        if(this.details.reviews){
            reviews = this.details.reviews.map(review=>`<div class="review">
                                                           <div class="review-content">${review.content}</div>
                                                           <div class="review-author"> "${review.author}"</div>
                                                         </div>`)
        }
        reviews = reviews.length>0?
            reviews.join("<div class='review-separator'></div>"):
            'No reviews'

        let similar = []
        if(this.details.similar){
            similar = this.details.similar.map(similarMovie=>{
                return`<div class="similar-movie" title="${similarMovie.title}">
                        <img   alt=${similarMovie.title} src=${baseImagesUrl + similarMovie.poster_path + '?api_key=' + this.api_key}>
                        </div>`
            }).join('')
        }

        this.#removeEventListeners();

        this.rootElement.innerHTML = (`<div class="${this.className}" data-movieId = ${this.movie.id}>
            <div class="listDetails">
            <div class="poster">
                <img  src=${baseImagesUrl + poster_path + '?api_key=' + this.api_key}
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
                   ${this.details.trailer?`<div class="trailer" data-embed=${trailerKey}> 
                        <div class="play-button"> </div>
                   </div>`:''}
                   <div class="reviews-container">
                   <span style="font-weight: bold">Reviews:</span>
                    <div class="reviews">${reviews}</div>
                    </div>
                   <span class="similar-movies">${similar}</span>
            </div>
            </div>
        `);

        if( this.expanded && this.details.trailer) {
            var trailer = document.querySelectorAll(".trailer");
            for (var i = 0; i < trailer.length; i++) {

                // thumbnail image source.
                var source = "https://img.youtube.com/vi/" + trailer[i].dataset.embed + "/sddefault.jpg";
                // Load the image asynchronously
                var image = new Image();
                image.src = source;
                image.addEventListener("load", function () {
                    trailer[i].appendChild(image);
                }(i));
                trailer[i].addEventListener("click", function (e) {
                    e.stopPropagation()
                    var iframe = document.createElement("iframe");

                    iframe.setAttribute("frameborder", "0");
                    iframe.setAttribute("allowfullscreen", "");
                    iframe.setAttribute("src", "https://www.youtube.com/embed/" + this.dataset.embed + "?rel=0&showinfo=0&autoplay=1");

                    this.innerHTML = "";
                    this.appendChild(iframe);
                });
            }
        }
        this.#setUpEventListeners()
    }
}



export default MovieCard