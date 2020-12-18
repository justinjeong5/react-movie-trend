import {
  LOAD_FAVORITE_NUMBER_REQUEST, LOAD_FAVORITE_NUMBER_SUCCESS, LOAD_FAVORITE_NUMBER_FAILURE,
} from '../_sagas/types'

const initialState = {
  loadFavoriteNumberLoading: false,
  loadFavoriteNumberDone: false,
  loadFavoriteNumberError: null,

  favorite: {
    favoriteNumber: 0,
  },
}

const favorite = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_FAVORITE_NUMBER_REQUEST:
      return {
        ...state,
        loadFavoriteNumberLoading: true,
        loadFavoriteNumberDone: false,
        loadFavoriteNumberError: null,
      }
    case LOAD_FAVORITE_NUMBER_SUCCESS:
      return {
        ...state,
        loadFavoriteNumberLoading: false,
        loadFavoriteNumberDone: true,
        favorite: {
          ...state.favorite,
          favoriteNumber: action.payload.favoriteNumber,
        },
      }
    case LOAD_FAVORITE_NUMBER_FAILURE:
      return {
        ...state,
        loadFavoriteNumberLoading: false,
        loadFavoriteNumberError: action.error
      }

    default:
      return {
        ...state
      }
  }
}

export default favorite;