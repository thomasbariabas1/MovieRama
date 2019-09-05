import {baseUrl} from "../../lib/constants";
import {get} from '../'

const GetMovieVideos = (api_key, movieId) =>{

    let movieVideosUrl = `${baseUrl}/movie/${movieId}/videos?api_key=${api_key}`;

    return get(movieVideosUrl)
}
export default GetMovieVideos