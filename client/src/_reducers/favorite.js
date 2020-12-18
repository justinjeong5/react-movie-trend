import {
  LOAD_FAVORITE_NUMBER_REQUEST, LOAD_FAVORITE_NUMBER_SUCCESS, LOAD_FAVORITE_NUMBER_FAILURE,
  CHANGE_FAVORITE_REQUEST, CHANGE_FAVORITE_SUCCESS, CHANGE_FAVORITE_FAILURE,
} from '../_sagas/types'

const initialState = {
  loadFavoriteNumberLoading: false,
  loadFavoriteNumberDone: false,
  loadFavoriteNumberError: null,
  changeFavoriteLoading: false,
  changeFavoriteDone: false,
  changeFavoriteError: null,

  favorite: {
    favoriteNumber: 0,
    isFavorited: false,
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
    case CHANGE_FAVORITE_REQUEST:
      return {
        ...state,
        changeFavoriteLoading: true,
        changeFavoriteDone: false,
        changeFavoriteError: null,
      }
    case CHANGE_FAVORITE_SUCCESS:
      return {
        ...state,
        changeFavoriteLoading: false,
        changeFavoriteDone: true,
        favorite: {
          ...state.favorite,
          isFavorited: action.payload.isFavorited,
        },
      }
    case CHANGE_FAVORITE_FAILURE:
      return {
        ...state,
        changeFavoriteLoading: false,
        changeFavoriteError: action.error
      }
    default:
      return {
        ...state
      }
  }
}

export default favorite;