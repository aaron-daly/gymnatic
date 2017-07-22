import { Actions as routerActions } from 'react-native-router-flux'
import { fetchConfiguration } from './ConfigurationActions'
import * as actionTypes from '../constants/actionTypes'
import * as routes from '../constants/routes'

const authRequest = () => ({
  type: actionTypes.AUTH_REQUEST
})

export const authSuccess = (user) => ({
  type: actionTypes.AUTH_SUCCESS,
  payload: user
})

const authFailure = (error) => ({
  type: actionTypes.AUTH_FAILURE,
  payload: error
})

const logoutSuccess = () => ({
  type: actionTypes.LOGOUT_SUCCESS
})

export const dismissError = () => ({
  type: actionTypes.DISMISS_AUTH_ERROR
})

export function register(email, password, profileCreds) {
  return (dispatch, getState, { auth }) => {
    dispatch(authRequest())
    auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        user.updateProfile({ ...profileCreds })
          .then(() => {
            dispatch(authSuccess(user))
            routerActions[routes.APP]()
          })
      })
      .catch((error) => dispatch(authFailure(error)))
  }
}

export function login(email,  password) {
  return (dispatch, getState, { auth }) => {
    dispatch(authRequest())
    return auth.signInWithEmailAndPassword(email, password)
      .then(res => {
        dispatch(authSuccess(res))
        dispatch(fetchConfiguration())
        routerActions[routes.APP]()
      })
      .catch(err => dispatch(authFailure(err)))
  }
}

export function logout() {
  return (dispatch, getState, { auth }) => {
    return auth.signOut()
      .then(() => {
        dispatch(logoutSuccess())
        routerActions[routes.LOGIN]()
      })
      .catch(routerActions[routes.LOGIN])
  }
}