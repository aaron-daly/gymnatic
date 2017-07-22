import * as actionTypes from '../constants/actionTypes'

const initialState = {
  isFetching: false,
  customWorkouts: {},
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CUSTOM_WORKOUTS_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case actionTypes.FETCH_CUSTOM_WORKOUTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        customWorkouts: action.payload
      }
    case actionTypes.FETCH_CUSTOM_WORKOUTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      }
    default:
      return state
  }
}
