import * as actionTypes from '../constants/actionTypes'

const initialState = {
  isFetching: false,
  cardioLogs: {},
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CARDIO_LOGS_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case actionTypes.FETCH_CARDIO_LOGS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        cardioLogs: action.payload,
      }
    case actionTypes.FETCH_CARDIO_LOGS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      }
    default:
      return state
  }
}
