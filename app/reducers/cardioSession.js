import { filter, omit } from 'lodash'
import * as actionTypes from '../constants/actionTypes'

export const initialState = {
  isPaused: false,
  secondsElapsed: 0,
  trackedIntervals: [],
  configuration: {
    tickSize: 15,
    numViewableTicks: 30
  },
  bots: [],
  botConfigurations: {},
  botIntervals: {}
}

export default (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.UPDATE_CARDIO_SESSION_CONFIGURATION:
      return {
        ...state,
        configuration: {
          ...state.configuration,
          ...action.payload
        }
      }
    case actionTypes.ADD_CARDIO_BOT:
      return {
        ...state,
        bots: [
          ...state.bots,
          action.payload.key
        ],
        botConfigurations: {
          ...state.botConfigurations,
          [action.payload.key]: action.payload.configuration
        }
      }
    case actionTypes.UPDATE_CARDIO_BOT_CONFIGURATION:
      return {
        ...state,
        botConfigurations: {
          ...state.botConfigurations,
          [action.payload.key]: {
            ...state.botConfigurations[action.payload.key],
            ...action.payload.configuration
          }
        }
      }
    case actionTypes.UPDATE_CARDIO_BOT_INTERVALS:
      return {
        ...state,
        botIntervals: {
          ...state.botIntervals,
          [action.payload.key]: action.payload.intervals
        }
      }
    case actionTypes.REMOVE_CARDIO_BOT:
      return {
        ...state,
        bots: filter(state.bots, botKey => botKey !== action.payload),
        botConfigurations: omit(state.botConfigurations, action.payload)
      }
    case actionTypes.TOGGLE_PAUSE_CARDIO_SESSION:
      return {
        ...state,
        isPaused: !state.isPaused
      }
    case actionTypes.INCREMENT_CARDIO_SECONDS_ELAPSED:
      return {
        ...state,
        secondsElapsed: state.secondsElapsed + 1
      }
    case actionTypes.ADD_TRACKED_INTERVAL:
      return {
        ...state,
        trackedIntervals: [
          ...state.trackedIntervals,
          action.payload
        ]
      }
    case actionTypes.CLEAR_CARDIO_SESSION:
      return {
        ...initialState
      }
    default:
      return state
  }
}