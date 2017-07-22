import * as actionTypes from '../constants/actionTypes'

const initialState = {
  isFetching: false,
  exercises: {},
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_EXERCISES_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case actionTypes.FETCH_EXERCISES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        exercises: action.payload
      }
    case actionTypes.FETCH_EXERCISES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      }
    default:
      return state
  }
}
