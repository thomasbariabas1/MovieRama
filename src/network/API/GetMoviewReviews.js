import {baseUrl} from "../../lib/constants";
import {get} from '../'

const GetMovieReviews = (api_key, movieId) =>{

    let movieReviewsUrl = `${baseUrl}/movie/${movieId}/reviews?api_key=${api_key}`;

    return get(movieReviewsUrl)
};
export default GetMovieReviews