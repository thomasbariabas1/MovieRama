import {createAction} from "../../lib/utils";
import GetGenders from "../../network/API/GetGenders";
import GetNowPlaying from "../../network/API/GetNowPlaying";
import SearchMovie from "../../network/API/SearchMovie";

const constants = {};

constants.ON_SEARCH = 'content/ON_SEARCH';
constants.FETCH_MOVIES_PENDING = 'content/FETCH_MOVIES_PENDING';
constants.FETCH_MOVIES_SUCCESS = 'content/FETCH_MOVIES_SUCCESS';
constants.FETCH_MOVIES_FAILURE = 'content/FETCH_MOVIES_FAILURE';
constants.FETCH_MOVIES_GENRE_PENDING = 'content/FETCH_MOVIES_GENRE_PENDING';
constants.FETCH_MOVIES_GENRE_SUCCESS = 'content/FETCH_MOVIES_GENRE_SUCCESS';
constants.FETCH_MOVIES_GENRE_FAILURE = 'content/FETCH_MOVIES_GENRE_FAILURE';

export default constants

const onFetchMoviesPending = createAction(constants.FETCH_MOVIES_PENDING);
const onFetchMoviesSuccess = createAction(constants.FETCH_MOVIES_SUCCESS);
const onFetchMoviesFailure = createAction(constants.FETCH_MOVIES_FAILURE);
const onFetchMoviesGenrePending = createAction(constants.FETCH_MOVIES_GENRE_PENDING);
const onFetchMoviesGenreSuccess = createAction(constants.FETCH_MOVIES_GENRE_SUCCESS);
const onFetchMoviesGenreFailure = createAction(constants.FETCH_MOVIES_GENRE_FAILURE);

const fetchMovieGenders = (dispatch, getState) => async () => {
    const api_key = getState().api_key;

    dispatch(onFetchMoviesGenrePending());

    await GetGenders(api_key)
        .then(function ({genres}) {
            dispatch(onFetchMoviesGenreSuccess(genres))
        }).catch(error => dispatch(onFetchMoviesGenreFailure(error)));

};

const onSearchMovie = (dispatch, getState) => async (searchCriteria) => {
    try {
        dispatch(onFetchMoviesPending());
        const api_key = getState().api_key;
        let response;
        const criteria = searchCriteria.trim();
        if (criteria !== '') {
            response = await SearchMovie(api_key, 1, criteria)
        } else {
            response = await GetNowPlaying(api_key, 1)
        }
        const {total_pages, page, results} = response
        dispatch(onFetchMoviesSuccess({total_pages, page, results: results, searchCriteria}))
    }catch (e) {
        dispatch(onFetchMoviesFailure(e))
    }
 };

const onScrollFetchMovie = (dispatch, getState) => async () => {

    try {
        dispatch(onFetchMoviesPending());

        const page = getState().ContentReducer.page;
        const api_key = getState().api_key;
        const searchCriteria = getState().ContentReducer.movieSearchCriteria;
        const data = getState().ContentReducer.data;
        let response;
        const criteria = searchCriteria.trim();
        if (criteria !== '') {
            response = await SearchMovie(api_key, page+1, criteria)
        } else {
            response = await GetNowPlaying(api_key, page+1)
        }
        const {total_pages,  results} = response
        dispatch(onFetchMoviesSuccess({total_pages, page:page+1, results: [...data,...results], searchCriteria}))
    }catch (e) {
        dispatch(onFetchMoviesFailure(e))
    }
};


export const actions = {
    onSearchMovie,
    onScrollFetchMovie,
    fetchMovieGenders
};