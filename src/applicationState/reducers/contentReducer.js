import constants from '../actions/contentActions'

const initialState = {
    movieSearchCriteria: '',
    data: [],
    loading: false,
    error: null,
    page: 0,
    totalPages: 0,
    genres:[]
};

const Reducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case constants.ON_SEARCH:
            return {...state, movieSearchCriteria: payload, page: 0};
        case constants.FETCH_MOVIES_GENRE_PENDING:
        case constants.FETCH_MOVIES_PENDING:
            return {...state, loading: true};
        case constants.FETCH_MOVIES_SUCCESS:
            return {
                ...state,
                loading: false,
                data: payload.results,
                page: payload.page,
                totalPages: payload.total_pages,
                movieSearchCriteria:payload.searchCriteria
            };
        case constants.FETCH_MOVIES_GENRE_FAILURE:
        case constants.FETCH_MOVIES_FAILURE:
            return {...state, loading: false, error: payload};
        case constants.FETCH_MOVIES_GENRE_SUCCESS:
            return {...state, genres: payload};
        default:
            return state
    }

};

export default Reducer