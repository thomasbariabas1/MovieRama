import {baseUrl} from "../../lib/constants";
import {get} from '../'

const GetMovieDetails = (api_key, movieId) =>{
    let movieDetailsUrl = `${baseUrl}/movie/${movieId}?api_key=${api_key}`;
    return get(movieDetailsUrl)
};
export default GetMovieDetails