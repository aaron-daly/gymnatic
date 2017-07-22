import { Actions as routerActions } from 'react-native-router-flux'
import { clearSession } from './WorkoutSessionActions'
import * as routes from '../constants/routes'
import * as actionTypes from '../constants/actionTypes'

const fetchWorkoutLogsRequest = () => ({
  type: actionTypes.FETCH_WORKOUT_LOGS_REQUEST
})

const fetchWorkoutLogsSuccess = (workoutLogs) => ({
  type: actionTypes.FETCH_WORKOUT_LOGS_SUCCESS,
  payload: workoutLogs
})

const fetchWorkoutLogsFailure = (error) => ({
  type: actionTypes.FETCH_WORKOUT_LOGS_FAILURE,
  payload: error
})

export function fetchWorkoutLogs() {
  return (dispatch, getState, { api, auth }) => {
    dispatch(fetchWorkoutLogsRequest())
    try {
      api.child(`workoutLogs/${auth.currentUser.uid}`)
        .on('value', snap => {
          const workoutLogs = snap.val() || {}
          dispatch(fetchWorkoutLogsSuccess(workoutLogs))
        })
    } catch (error) {
      dispatch(fetchWorkoutLogsFailure(error))
    }
  }
}

export function addWorkoutLog(workoutLog) {
  return (dispatch, getState, { api, auth }) => {
    const ref = api.child(`workoutLogs/${auth.currentUser.uid}`)
    const _id = ref.push().key
    const val = { _id, ...workoutLog }
    ref.child(_id)
      .set(val)
      .then(() => {
        dispatch(clearSession())
        routerActions[routes.TRAINING]()
      })
  }
}

export function removeWorkoutLog(_workoutLogId) {
  return (dispatch, getState, { api, auth }) => {
    api.child(`workoutLogs/${auth.currentUser.uid}/${_workoutLogId}`)
      .remove()
      .then(() => {
        routerActions.pop()
      })
  }
}