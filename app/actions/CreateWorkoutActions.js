import * as actionTypes from '../constants/actionTypes'

export const reset = () => ({
  type: actionTypes.CREATE_WORKOUT_RESET
})

export const setValue = (key, value) => ({
  type: actionTypes.CREATE_WORKOUT_SET_VALUE,
  payload: { key, value }
})

export const addExercise = (_exerciseId) => ({
  type: actionTypes.CREATE_WORKOUT_ADD_EXERCISE,
  payload: _exerciseId
})

export const removeExercise = (exerciseIndex) => ({
  type: actionTypes.CREATE_WORKOUT_REMOVE_EXERCISE,
  payload: exerciseIndex
})

export const addExerciseSet = (exerciseIndex) => ({
  type: actionTypes.CREATE_WORKOUT_ADD_EXERCISE_SET,
  payload: exerciseIndex

})

export const removeExerciseSet = (exerciseIndex, setIndex) => ({
  type: actionTypes.CREATE_WORKOUT_REMOVE_EXERCISE_SET,
  payload: {
    exerciseIndex,
    setIndex
  }
})

export const setExerciseSetValue = (exerciseIndex, setIndex, key, value) => ({
  type: actionTypes.CREATE_WORKOUT_SET_EXERCISE_SET_VALUE,
  payload: {
    exerciseIndex,
    setIndex,
    key,
    value
  }
})