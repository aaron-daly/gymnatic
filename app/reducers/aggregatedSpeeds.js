import * as actionTypes from '../constants/actionTypes'

const initialState = {
  isFetching: false,
  error: null,
  filter: 'test',             // default cardioPresetId (Beginner Run Preset)
  visibilityFilter: 7,        // default number of speed values to show on the graph (last 7 tracked)
  aggregatedSpeeds: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_AGGREGATED_SPEEDS_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case actionTypes.FETCH_AGGREGATED_SPEEDS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        aggregatedSpeeds: action.payload,
      }
    case actionTypes.FETCH_AGGREGATED_SPEEDS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      }
    case actionTypes.UPDATE_AGGREGATED_SPEEDS_FILTER:
      return {
        ...state,
        filter: action.payload
      }
    case actionTypes.UPDATE_AGGREGATED_SPEEDS_VISIBILITY_FILTER:
      return {
        ...state,
        visibilityFilter: action.payload
      }
    default:
      return state
  }
}
