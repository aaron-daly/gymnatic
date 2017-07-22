import { Actions as routerActions } from 'react-native-router-flux'
import * as actionTypes from '../constants/actionTypes'

// ****************************************
// Fetch Custom Workouts Async

const fetchCustomWorkoutsRequest = () => ({
  type: actionTypes.FETCH_CUSTOM_WORKOUTS_REQUEST
})

const fetchCustomWorkoutsSuccess = (customWorkouts) => ({
  type: actionTypes.FETCH_CUSTOM_WORKOUTS_SUCCESS,
  payload: customWorkouts
})

const fetchCustomWorkoutsFailure = (error) => ({
  type: actionTypes.FETCH_CONFIGURATION_FAILURE,
  payload: error
})

export function fetchCustomWorkouts() {
  return (dispatch, getState, { api, auth }) => {
    dispatch(fetchCustomWorkoutsRequest())
    try {
      api.child(`customWorkouts/${auth.currentUser.uid}`)
        .on('value', snap => {
          const customWorkouts = snap.val() || {}
          dispatch(fetchCustomWorkoutsSuccess(customWorkouts))
        })
    } catch (error) {
      dispatch(fetchCustomWorkoutsFailure(error))
    }
  }
}

// ****************************************
// Add Custom Workout Async

const addCustomWorkoutFailure = (error) => ({
  type: actionTypes.ADD_CUSTOM_WORKOUT_FAILURE,
  payload: error
})

export const addCustomWorkout = (customWorkout: Object) => {
  return (dispatch, getState, { api, auth }) => {
    const ref = api.child(`customWorkouts/${auth.currentUser.uid}`)
    const _id = ref.push().key
    const val = { _id, ...customWorkout }
    ref.child(_id)
      .set(val)
      .then(routerActions.pop)
      .catch((error) => dispatch(addCustomWorkoutFailure(error)))
  }
}

// ****************************************
// Remove Custom Workout Async

export const removeCustomWorkout = (_customWorkoutId) => {
  return (dispatch, getState, { api, auth }) => {
    api.child(`customWorkouts/${auth.currentUser.uid}/${_customWorkoutId}`)
      .remove()
      .then(routerActions.pop)
  }
}