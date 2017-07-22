import * as actionTypes from '../constants/actionTypes'

const fetchExercisesRequest = () => ({
  type: actionTypes.FETCH_EXERCISES_REQUEST
})

const fetchExercisesSuccess = (exercises) => ({
  type: actionTypes.FETCH_EXERCISES_SUCCESS,
  payload: exercises
})

const fetchExercisesFailure = (error) => ({
  type: actionTypes.FETCH_EXERCISES_FAILURE,
  payload: error
})

export function fetchExercises() {
  return (dispatch, getState, { api }) => {
    dispatch(fetchExercisesRequest())
    try {
      api.child('exercises')
        .on('value', snap => {
          const exercises = snap.val() || {}
          dispatch(fetchExercisesSuccess(exercises))
        })
    } catch(error) {
      dispatch(fetchExercisesFailure(error))
    }
  }
}
