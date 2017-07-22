import * as actionTypes from '../constants/actionTypes'

const initialState = {
  isFetching: false,
  aggregatedCardioTimes: {},
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_AGGREGATED_CARDIO_TIMES_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case actionTypes.FETCH_AGGREGATED_CARDIO_TIMES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        aggregatedCardioTimes: action.payload,
      }
    case actionTypes.FETCH_AGGREGATED_CARDIO_TIMES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      }
    default:
      return state
  }
}