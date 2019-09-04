import {baseUrl} from "../lib/constants";

const GetMovieSimilar = (api_key, movieId) =>{

    let movieSimiralUrl = `${baseUrl}/movie/${movieId}/similar?api_key=${api_key}`;

    return fetch(movieSimiralUrl);
}
export default GetMovieSimilar