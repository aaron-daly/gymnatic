import * as actionTypes from '../constants/actionTypes'

const initialState = {
  isFetching: false,
  cardioPresets: {},
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CARDIO_PRESETS_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case actionTypes.FETCH_CARDIO_PRESETS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        cardioPresets: action.payload
      }
    case actionTypes.FETCH_CARDIO_PRESETS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      }
    default:
      return state
  }
}