import * as actionTypes from '../constants/actionTypes'

const fetchWorkoutsRequest = () => ({
  type: actionTypes.FETCH_WORKOUTS_REQUEST
})

const fetchWorkoutsSuccess = (workouts) => ({
  type: actionTypes.FETCH_WORKOUTS_SUCCESS,
  payload: workouts
})

const fetchWorkoutsFailure = (error) => ({
  type: actionTypes.FETCH_WORKOUTS_FAILURE,
  payload: error
})

export function fetchWorkouts() {
  return (dispatch, getState, { api }) => {
    dispatch(fetchWorkoutsRequest())
    try {
      api.child('workouts')
        .on('value', snap => {
          const workouts = snap.val() || {}
          dispatch(fetchWorkoutsSuccess(workouts))
        })
    } catch (error) {
      dispatch(fetchWorkoutsFailure(error))
    }
  }
}