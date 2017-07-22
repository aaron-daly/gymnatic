import * as actionTypes from '../constants/actionTypes'
import dotProp from 'dot-prop-immutable'

const initialState = {
  title: null,
  category: null,
  description: null,
  session: [],
  error: null
}

function addExercise(session, _exerciseId) {
  return dotProp.set(session, `${session.length}`, { _exerciseId, sets: [{ reps: 0 }] })
}

function removeExercise(session, exerciseIndex) {
  return dotProp.delete(session, `${exerciseIndex}`)
}

function addExerciseSet(session, exerciseIndex) {
  return dotProp.set(session, `${exerciseIndex}.sets.${session[exerciseIndex].sets.length}`, { reps: 0 })
}

function removeExerciseSet(session, { exerciseIndex, setIndex }) {
  return dotProp.delete(session, `${exerciseIndex}.sets.${setIndex}`)
}

function setExerciseSetValue(session, { exerciseIndex, setIndex, key, value }) {
  return dotProp.set(session, `${exerciseIndex}.sets.${setIndex}.${key}`, value)
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_WORKOUT_SET_VALUE:
      return {
        ...state,
        [action.payload.key]: action.payload.value
      }
    case actionTypes.CREATE_WORKOUT_ADD_EXERCISE:
      return {
        ...state,
        session: addExercise(state.session, action.payload)
      }
    case actionTypes.CREATE_WORKOUT_REMOVE_EXERCISE:
      return {
        ...state,
        session: removeExercise(state.session, action.payload)
      }
    case actionTypes.CREATE_WORKOUT_ADD_EXERCISE_SET:
      return {
        ...state,
        session: addExerciseSet(state.session, action.payload)
      }
    case actionTypes.CREATE_WORKOUT_REMOVE_EXERCISE_SET:
      return {
        ...state,
        session: removeExerciseSet(state.session, action.payload)
      }
    case actionTypes.CREATE_WORKOUT_SET_EXERCISE_SET_VALUE:
      return {
        ...state,
        session: setExerciseSetValue(state.session, action.payload)
      }
    case actionTypes.ADD_CUSTOM_WORKOUT_FAILURE:
      return {
        ...state,
        error: action.payload
      }
    case actionTypes.CREATE_WORKOUT_RESET:
    case actionTypes.ADD_CUSTOM_WORKOUT_SUCCESS:
      return {
        ...initialState
      }
    default:
      return state
  }
}
