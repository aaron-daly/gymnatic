import * as actionTypes from '../constants/actionTypes'

export const constructSession = (session) => ({
    type: actionTypes.CONSTRUCT_SESSION,
    payload: session
})

export const togglePauseSession = () => ({
  type: actionTypes.TOGGLE_PAUSE_SESSION
})

export const incrementSecondsElapsed = () => ({
  type: actionTypes.INCREMENT_SECONDS_ELAPSED
})

export const incrementSet = () => ({
  type: actionTypes.INCREMENT_CURRENT_SET
})

export const decrementSet = () => ({
  type: actionTypes.DECREMENT_CURRENT_SET
})

export const updateSetValues = (exerciseIndex, setIndex, values) => ({
  type: actionTypes.UPDATE_CURRENT_SET_VALUES,
  payload: {
    exerciseIndex,
    setIndex,
    values
  }
})

export const clearSession = () => ({
  type: actionTypes.CLEAR_SESSION
})