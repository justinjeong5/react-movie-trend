import {
  LOAD_MOVIES_REQUEST, LOAD_MOVIES_SUCCESS, LOAD_MOVIES_FAILURE,
} from '../_sagas/types'

const initialState = {
  loadMoviesLoading: false,
  loadMoviesDone: false,
  loadMoviesError: null,

  pageNumber: 1,
  movieData: [],
}

const movie = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_MOVIES_REQUEST:
      return {
        ...state,
        loadMoviesLoading: true,
        loadMoviesDone: false,
        loadMoviesError: null,
      }
    case LOAD_MOVIES_SUCCESS:
      return {
        ...state,
        loadMoviesLoading: false,
        loadMoviesDone: true,
        movieData: [...state.movieData, ...action.payload.results],
        pageNumber: state.pageNumber + 1,
      }
    case LOAD_MOVIES_FAILURE:
      return {
        ...state,
        loadMoviesLoading: false,
        loadMoviesError: action.error
      }
    default:
      return {
        ...state
      }
  }
}

export default movie;