import {baseUrl} from "../../lib/constants";
import {get} from '../'

const GetMovieSimilar = (api_key, movieId) =>{

    let movieSimiralUrl = `${baseUrl}/movie/${movieId}/similar?api_key=${api_key}`;

    return get(movieSimiralUrl)
}
export default GetMovieSimilar