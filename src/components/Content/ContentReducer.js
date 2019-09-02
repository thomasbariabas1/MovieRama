import {createAction} from "../../lib/utils";
import {baseUrl} from "../../lib/constants";

const constants = {}

constants.ON_SEARCH = 'content/ON_SEARCH'
constants.FETCH_MOVIES_PENDING = 'content/FETCH_MOVIES_PENDING'
constants.FETCH_MOVIES_SUCCESS = 'content/FETCH_MOVIES_SUCCESS'
constants.FETCH_MOVIES_FAILURE = 'content/FETCH_MOVIES_FAILURE'
constants.FETCH_MOVIES_GENRE_PENDING = 'content/FETCH_MOVIES_GENRE_PENDING'
constants.FETCH_MOVIES_GENRE_SUCCESS = 'content/FETCH_MOVIES_GENRE_SUCCESS'
constants.FETCH_MOVIES_GENRE_FAILURE = 'content/FETCH_MOVIES_GENRE_FAILURE'

const onFetchMoviesPending = createAction(constants.FETCH_MOVIES_PENDING)
const onFetchMoviesSuccess = createAction(constants.FETCH_MOVIES_SUCCESS)
const onFetchMoviesFailure = createAction(constants.FETCH_MOVIES_FAILURE)
const onFetchMoviesGenrePending = createAction(constants.FETCH_MOVIES_GENRE_PENDING)
const onFetchMoviesGenreSuccess = createAction(constants.FETCH_MOVIES_GENRE_SUCCESS)
const onFetchMoviesGenreFailure = createAction(constants.FETCH_MOVIES_GENRE_FAILURE)

const fetchMovieGenders = (dispatch, getState) => async () => {
    const api_key = getState().api_key;

    dispatch(onFetchMoviesGenrePending())
    let url = `${baseUrl}/genre/movie/list?api_key=${api_key}`;

    await fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function ({genres}) {
            dispatch(onFetchMoviesGenreSuccess(genres))
        }).catch(error => dispatch(onFetchMoviesGenreFailure(error)));

}

const onSearchMovie = (dispatch, getState) => async (searchCriteria) => {
    dispatch(onFetchMoviesPending())

    const api_key = getState().api_key;


    let url = `${baseUrl}/movie/now_playing?page=${1}&&api_key=${api_key}`;

    if(searchCriteria !== '')
        url = `${baseUrl}/search/movie?page=${1}&&api_key=${api_key}&&query=${searchCriteria}`;

    await fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function ({total_pages, page, results}) {
            dispatch(onFetchMoviesSuccess({total_pages, page, results:results,searchCriteria}))
        }).catch(error => dispatch(onFetchMoviesFailure(error)));


}

const onScrollFetchMovie = (dispatch, getState) => async () => {

    dispatch(onFetchMoviesPending())

    const page = getState().ContentReducer.page;
    const api_key = getState().api_key;
    const searchCriteria = getState().ContentReducer.movieSearchCriteria;
    const data = getState().ContentReducer.data

    const baseUrl = 'https://api.themoviedb.org/3'

    let url = `${baseUrl}/movie/now_playing?page=${page + 1}&&api_key=${api_key}`;

    if(searchCriteria !== '')
        url = `${baseUrl}/search/movie?page=${page + 1}&&api_key=${api_key}&&query=${searchCriteria}`;

    await fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function ({total_pages, page, results}) {
            dispatch(onFetchMoviesSuccess({total_pages, page, results:[...data, ...results],searchCriteria}))
        }).catch(error => dispatch(onFetchMoviesFailure(error)));

}


export const actions = {
    onSearchMovie,
    onScrollFetchMovie,
    fetchMovieGenders
}

const initialState = {
    movieSearchCriteria: '',
    data: [],
    loading: false,
    error: null,
    page: 0,
    totalPages: 0,
    genres:[]
}
const Reducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case constants.ON_SEARCH:
            return {...state, movieSearchCriteria: payload, page: 0}
        case constants.FETCH_MOVIES_GENRE_PENDING:
        case constants.FETCH_MOVIES_PENDING:
            return {...state, loading: true}
        case constants.FETCH_MOVIES_SUCCESS:
            return {
                ...state,
                loading: false,
                data: payload.results,
                page: payload.page,
                totalPages: payload.total_pages,
                movieSearchCriteria:payload.searchCriteria
            }
        case constants.FETCH_MOVIES_GENRE_FAILURE:
        case constants.FETCH_MOVIES_FAILURE:
            return {...state, loading: false, error: payload}
        case constants.FETCH_MOVIES_GENRE_SUCCESS:
            return {...state, genres: payload}
        default:
            return state
    }

}

export default Reducer