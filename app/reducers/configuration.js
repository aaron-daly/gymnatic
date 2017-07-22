import * as actionTypes from '../constants/actionTypes'
import * as strings from '../constants/strings/settings'

const initialState = {
  isFetching: false,
  configuration: {
    weightMetric: strings.DEFAULT_WEIGHT_METRIC,
    distanceMetric: strings.DEFAULT_DISTANCE_METRIC
  },
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CONFIGURATION_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case actionTypes.FETCH_CONFIGURATION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        configuration: {
          ...state.configuration,
          ...action.payload
        }
      }
    case actionTypes.FETCH_CONFIGURATION_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      }
    default:
      return state
  }
}
