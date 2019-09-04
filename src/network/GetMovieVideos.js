import {baseUrl} from "../lib/constants";

const GetMovieVideos = (api_key, movieId) =>{

    let movieVideosUrl = `${baseUrl}/movie/${movieId}/videos?api_key=${api_key}`;

    return fetch(movieVideosUrl);
}
export default GetMovieVideos