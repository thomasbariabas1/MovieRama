import {baseUrl} from "../../lib/constants";
import {get} from '../'

const GetGenders = (api_key,) =>{
    let gendersUrl = `${baseUrl}/genre/movie/list?api_key=${api_key}`;
    return get(gendersUrl)
};
export default GetGenders