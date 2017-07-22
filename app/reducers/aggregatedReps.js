import * as actionTypes from '../constants/actionTypes'

const initialState = {
  isFetching: false,
  aggregatedReps: {},
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_AGGREGATED_REPS_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case actionTypes.FETCH_AGGREGATED_REPS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        aggregatedReps: action.payload,
      }
    case actionTypes.FETCH_AGGREGATED_REPS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      }
    default:
      return state
  }
}
