import {baseUrl} from "../lib/constants";

const GetMovieDetails = (api_key, movieId) =>{
    let movieDetailsUrl = `${baseUrl}/movie/${movieId}?api_key=${api_key}`;
    return fetch(movieDetailsUrl);
}
export default GetMovieDetails