import {baseUrl} from "../../lib/constants";
import {get} from '../'

const SearchMovie = (api_key,page,criteria) =>{
    let gendersUrl = `${baseUrl}/search/movie?page=${page}&&api_key=${api_key}&&query=${criteria}`;
    return get(gendersUrl)
};
export default SearchMovie