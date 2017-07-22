import * as actionTypes from '../constants/actionTypes'
import dotProp from 'dot-prop-immutable'

const initialState = {
  isLoading: true,
  isPaused: false,
  secondsElapsed: 0,
  exerciseIndex: 0,
  setIndex: 0,
  recordedSession: []
}

/**
 * @param exerciseIndex - index of the current exercise
 * @param setIndex - index of the current set
 * @param recordedSession - array of current recorded exercises and sets
 * If we are on the last set of an exercise, go to the next exercise
 * If we are on the last set of the last exercise, we can't increment again
 * @returns {*} - new state after incrementing the set
 */
const incrementSet = (exerciseIndex, setIndex, recordedSession) => {
  const setIndexUpperBound = recordedSession[exerciseIndex].sets.length-1
  if (setIndex < setIndexUpperBound) {
    return { setIndex: setIndex+1 }
  } else if (exerciseIndex < recordedSession.length-1) {
    return { setIndex: 0, exerciseIndex: exerciseIndex+1 }
  }
  return {}
}

/**
 * @param exerciseIndex - index of the current exercise
 * @param setIndex - index of the current set
 * @param recordedSession - array of current recorded exercises and sets
 * If we are on the first set of an exercise, go to the previous exercise
 * If we are on the first set of the first exercise, we can't decrement again
 * @returns {*} - new state after incrementing the set
 */
const decrementSet = (exerciseIndex, setIndex, recordedSession) => {
  if (setIndex > 0) {
    return { setIndex: setIndex-1 }
  } else if (exerciseIndex > 0) {
    const newExerciseIndex = exerciseIndex-1
    const nextSetIndex = recordedSession[newExerciseIndex].sets.length-1
    return { setIndex: nextSetIndex, exerciseIndex: newExerciseIndex }
  }
  return {}
}

const recordedSession = (state = initialState.recordedSession, action) => {
  switch(action.type) {
    case actionTypes.CONSTRUCT_SESSION:
      return [
        ...action.payload
      ]
    case actionTypes.UPDATE_CURRENT_SET_VALUES:
      const { exerciseIndex, setIndex, values } = action.payload
      const targetSetIndex = `${exerciseIndex}.sets.${setIndex}`
      return dotProp.set(state, targetSetIndex, {
        ...dotProp.get(state, targetSetIndex),
        ...values
      })
    default:
      return state
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CONSTRUCT_SESSION:
      return {
        ...state,
        isLoading: false,
        recordedSession: recordedSession(state.recordedSession, action)
      }
    case actionTypes.TOGGLE_PAUSE_SESSION:
      return {
        ...state,
        isPaused: !state.isPaused
      }
    case actionTypes.INCREMENT_SECONDS_ELAPSED:
      return {
        ...state,
        secondsElapsed: state.secondsElapsed+1
      }
    case actionTypes.INCREMENT_CURRENT_SET:
      return {
        ...state,
        ...incrementSet(state.exerciseIndex, state.setIndex, state.recordedSession)
      }
    case actionTypes.DECREMENT_CURRENT_SET:
      return {
        ...state,
        ...decrementSet(state.exerciseIndex, state.setIndex, state.recordedSession)
      }
    case actionTypes.UPDATE_CURRENT_SET_VALUES:
      return {
        ...state,
        recordedSession: recordedSession(state.recordedSession, action)
      }
    case actionTypes.CLEAR_SESSION:
      return {
        ...initialState
      }
    default:
      return state
  }
}
