import { Actions as routerActions } from 'react-native-router-flux'
import { clearSession } from './CardioSessionActions'
import * as routes from '../constants/routes'
import * as actionTypes from '../constants/actionTypes'

const fetchCardioLogsRequest = () => ({
  type: actionTypes.FETCH_CARDIO_LOGS_REQUEST
})

const fetchCardioLogsSuccess = (cardioLogs) => ({
  type: actionTypes.FETCH_CARDIO_LOGS_SUCCESS,
  payload: cardioLogs
})

const fetchCardioLogsFailure = (error) => ({
  type: actionTypes.FETCH_CARDIO_LOGS_FAILURE,
  payload: error
})

/**
 * Asynchronously opens a web-socket for pulling the user's cardioLogs
 * for Firebase. An initial FETCH_CARDIO_LOGS_REQUEST action is
 * dispatched to notify the store that cardioLogs are being fetched.
 * Once the web-socket opens cardioLogs will automatically be pulled
 * from Firebase as they are updated.
 *
 * FETCH_CARDIO_LOGS_SUCCESS is dispatched with the received cardioLogs
 * as they are acquired from the socket.
 *
 * If an error occurs while opening the socket, FETCH_CARDIO_LOGS_FAILURE
 * is dispatched with the error object.
 *
 * @returns {function(*)} - an action creator function for the redux
 * store dispatcher.
 */
export function fetchCardioLogs() {
  return (dispatch, getState, { api, auth }) => {
    dispatch(fetchCardioLogsRequest())
    try {
      api.child(`cardioLogs/${auth.currentUser.uid}`)
        .on('value', snap => {
          const cardioLogs = snap.val() || {}
          dispatch(fetchCardioLogsSuccess(cardioLogs))
        })
    } catch (error) {
      dispatch(fetchCardioLogsFailure(error))
    }
  }
}

/**
 * Takes a cardio log object, generates a unique Firebase id
 * for the object and adds it to the user's cardio logs on Firebase.
 * Once The cardio log has been added, clearSession() is dispatched
 * to ensure that the cardioSession state has been reset. The route
 * is then changed to the training home screen.

 * @param {Object} cardioLog - An object containing the values from
 * a recorded cardio session.
 *
 * @returns {function(*)} - returns an action creator function for
 * the Redux store's dispatcher.
 */
export function addCardioLog(cardioLog) {
  return (dispatch, getState, { api, auth }) => {
    const ref = api.child(`cardioLogs/${auth.currentUser.uid}`)
    const _id = ref.push().key
    const val = { _id, ...cardioLog }
    ref.child(_id)
      .set(val)
      .then(() => {
        dispatch(clearSession())
        routerActions[routes.TRAINING]()
      })
  }
}

/**
 * Takes a cardioLog id and removes the cardioLog from Firebase. Once
 * removed, the router pops off of the cardioLog screen to the diary
 * screen.
 *
 * @param _cardioLogId {String} - A Firebase unique identifier for a
 * cardio log.
 *
 * @returns {function()} - An action creator function
 * for Redux dispatcher.
 */
export function removeCardioLog(_cardioLogId) {
  return (dispatch, getState, { api, auth }) => {
    api.child(`cardioLogs/${auth.currentUser.uid}/${_cardioLogId}`)
      .remove()
      .then(() => {
        routerActions.pop()
      })
  }
}