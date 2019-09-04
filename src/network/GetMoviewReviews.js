import {baseUrl} from "../lib/constants";

const GetMovieReviews = (api_key, movieId) =>{

    let movieReviewsUrl = `${baseUrl}/movie/${movieId}/reviews?api_key=${api_key}`;

    return fetch(movieReviewsUrl);
}
export default GetMovieReviews