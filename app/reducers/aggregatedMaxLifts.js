import * as actionTypes from '../constants/actionTypes'

const initialState = {
  isFetching: false,
  error: null,
  filter: '-KdSHwZzvhuJjjKLsgs7',   // default exerciseId (squat)
  visibilityFilter: 7,              // default number of max lift values to show on the graph (last 7 tracked)
  aggregatedMaxLifts: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_AGGREGATED_MAX_LIFTS_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case actionTypes.FETCH_AGGREGATED_MAX_LIFTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        aggregatedMaxLifts: action.payload,
      }
    case actionTypes.FETCH_AGGREGATED_MAX_LIFTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      }
    case actionTypes.UPDATE_AGGREGATED_MAX_LIFTS_FILTER:
      return {
        ...state,
        filter: action.payload
      }
    case actionTypes.UPDATE_AGGREGATED_MAX_LIFTS_VISIBILITY_FILTER:
      return {
        ...state,
        visibilityFilter: action.payload
      }
    default:
      return state
  }
}
