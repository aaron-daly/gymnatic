import { combineReducers } from 'redux'
import * as actionTypes from '../constants/actionTypes'
import user from './user'
import configuration from './configuration'
import exercises from './exercises'
import workouts from './workouts'
import customWorkouts from './customWorkouts'
import createWorkoutForm from './createWorkoutForm'
import workoutSession from './workoutSession'
import cardioPresets from './cardioPresets'
import cardioSession from './cardioSession'
import workoutLogs from './workoutLogs'
import cardioLogs from './cardioLogs'
import aggregatedReps from './aggregatedReps'
import aggregatedCardioTimes from './aggregatedCardioTimes'
import aggregatedMaxLifts from './aggregatedMaxLifts'
import aggregatedSpeeds from './aggregatedSpeeds'

const appReducer = combineReducers({
  user,
  configuration,
  exercises,
  workouts,
  customWorkouts,
  createWorkoutForm,
  workoutSession,
  cardioPresets,
  cardioSession,
  workoutLogs,
  cardioLogs,
  aggregatedReps,
  aggregatedCardioTimes,
  aggregatedMaxLifts,
  aggregatedSpeeds
})

export default (state, action) => {
  if (action.type === actionTypes.LOGOUT_SUCCESS) {
    state = undefined
  }

  return appReducer(state, action)
}
