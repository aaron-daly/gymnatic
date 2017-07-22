import * as actionTypes from '../constants/actionTypes'

const initialState = {
  isFetching: false,
  user: {},
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        user: action.payload,
      }
    case actionTypes.AUTH_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      }
    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...initialState
      }
    case actionTypes.DISMISS_AUTH_ERROR:
      return {
        ...state,
        error: null
      }
    default:
      return state
  }
}
