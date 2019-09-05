import {baseUrl} from "../../lib/constants";
import {get} from '../'

const GetNowPlaying = (api_key, page) => {
    let gendersUrl = `${baseUrl}/movie/now_playing?page=${page}&&api_key=${api_key}`;
    return get(gendersUrl)
};

export default GetNowPlaying