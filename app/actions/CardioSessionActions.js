import { Actions as routerActions } from 'react-native-router-flux'
import { map } from 'lodash'
import { Alert } from 'react-native'
import {
  generateLinearIntervals,
  generateGradientIntervals,
  generateAugmentedIntervals
} from '../utils/CardioIntervalGenerators'
import * as cardioBotTypes from '../constants/cardioBotTypes'
import * as actionTypes from '../constants/actionTypes'
import * as routes from '../constants/routes'

const botColors = ['blue', 'purple', 'orange', 'green', 'pink']

export const clearSession = () => ({
  type: actionTypes.CLEAR_CARDIO_SESSION
})

/*********************************************/
/* Actions performed before a cardio session */
/*********************************************/

export const updateSessionConfiguration = (configuration) => ({
  type: actionTypes.UPDATE_CARDIO_SESSION_CONFIGURATION,
  payload: configuration
})

export const updateBotConfiguration = (key, configuration) => ({
  type: actionTypes.UPDATE_CARDIO_BOT_CONFIGURATION,
  payload: {
    key,
    configuration
  }
})

export const removeBot = (key) => ({
  type: actionTypes.REMOVE_CARDIO_BOT,
  payload: key
})

/**
 * When the bot type is changed, the default configuration is set
 * depending on the bot type.
 */
export function updateBotType(key, botType) {
  return (dispatch, getState) => {
    const { cardioSession } = getState()
    const oldBotConfiguration = cardioSession.botConfigurations[key]

    if (oldBotConfiguration.botType !== botType) {

      let newBotConfiguration = {}
      switch(botType) {
        case cardioBotTypes.LINEAR:
          newBotConfiguration = {
            ...oldBotConfiguration,
            velocity: oldBotConfiguration.velocity || 3.5,
            gradient: null,
            botType
          }
          break
        case cardioBotTypes.GRADIENT:
          newBotConfiguration = {
            ...oldBotConfiguration,
            velocity: oldBotConfiguration.velocity || 3.5,
            gradient: oldBotConfiguration.gradient || 0.05,
            botType
          }
          break
      }

      dispatch(updateBotConfiguration(key, newBotConfiguration))
    }
  }
}

function getDefaultVelocityForExercise(exercise) {
  switch(exercise) {
    case 'BIKE':
      return 8
    case 'TREADMILL':
    default:
      return 3.5
  }
}

/**
 * dispatches an action to add a new bot
 * botKey is a random key generated for serialising the bots
 */
export function addNewBot(_cardioPresetId) {
  return (dispatch, getState) => {
    const { cardioPresets, cardioSession } = getState()
    const cardioPreset = cardioPresets.cardioPresets[_cardioPresetId]
    const botKey = Math.random().toString(36).substr(2, 12)
    const botNumber = cardioSession.bots.length+1
    const defaultVelocity = getDefaultVelocityForExercise(cardioPreset.exercise)
    const botConfig = {
      name: `Bot ${botNumber}`,
      color: botColors[botNumber-1],
      botType: cardioBotTypes.LINEAR,
      velocity: defaultVelocity
    }

    dispatch({
      type: actionTypes.ADD_CARDIO_BOT,
      payload: {
        key: botKey,
        configuration: botConfig
      }
    })
  }
}

/**
 * Takes a cardio presetId and performs the following operations:
 * 1. validate the session config
 * 2. validate the bot configs
 * 3. if validation is successful, bots are generated and dispatched to store, and the route
 *    is changes to the cardio session screen
 *
 */
export function startSession(_cardioPresetId) {
  return (dispatch, getState) => {
    const { cardioPresets, cardioSession } = getState()
    const { configuration, botConfigurations } = cardioSession

    const sessionConfigValid = validateSessionConfig(configuration)
    const botConfigsValid = validateBotConfigs(botConfigurations)

    if (sessionConfigValid && botConfigsValid) {
      const cardioPreset = cardioPresets.cardioPresets[_cardioPresetId]

      map(botConfigurations, (botConfig, key) => {
        const intervals = generateBotIntervals(botConfig, cardioPreset)
        if (intervals) {
          dispatch({
            type: actionTypes.UPDATE_CARDIO_BOT_INTERVALS,
            payload: { key, intervals }
          })
        }
      })

      routerActions[routes.CARDIO_SESSION]({
        _cardioPresetId
      })
    }
  }
}

function generateBotIntervals(botConfig, cardioPreset) {
  const { distance, intervalDistance } = cardioPreset
  const { velocity, gradient } = botConfig

  switch (botConfig.botType) {
    case cardioBotTypes.LINEAR:
      return generateLinearIntervals(distance, intervalDistance, velocity)
    case cardioBotTypes.GRADIENT:
      return generateGradientIntervals(distance, intervalDistance, velocity, gradient)
    default:
      return null
  }
}

/**
 * 5 < tickSize <= 120
 * 1 < numViewableTicks <= 8
 * If validation fails display an alert and return false
 * If validation succeeds return true
 */
function validateSessionConfig(sessionConfig) {
  const { tickSize, numViewableTicks } = sessionConfig

  if (tickSize === null || tickSize === undefined ||
      tickSize < 5 || tickSize > 120) {
    Alert.alert(
      'Invalid Tick Size',
      'Tick Size must be between 5 and 120.',
      [{ text: 'Close' }]
    )
    return false
  }

  if (numViewableTicks === null || numViewableTicks === undefined ||
      numViewableTicks < 1 || numViewableTicks > 8) {
    Alert.alert(
      'Invalid Number of Ticks',
      'Must be between 1 and 8',
      [{ text: 'Close' }]
    )
    return false
  }

  return true
}

/**
 * 0 < botVelocity <= 30
 * If validation fails display an alert and return false
 * If validation succeeds return true
 */
function validateBotConfigs(botConfigs) {
  let botConfig
  for (let i = 0; i < botConfigs; i++) {
    botConfig = botConfigs[i]
    if (botConfig.velocity < 0 || botConfig.velocity > 30) {
      Alert.alert(
        'Invalid bot config.',
        'Bot velocity must be between 1 and 30',
        [{ text: 'Close' }]
      )
      return false
    }
  }
  return true
}

/*********************************************/
/* Actions performed during a cardio session */
/*********************************************/

export const togglePauseSession = () => ({
  type: actionTypes.TOGGLE_PAUSE_CARDIO_SESSION
})

export function handleTimeInterval() {
  return (dispatch, getState) => {
    const { cardioSession } = getState()

    if (!cardioSession.isPaused) {
      dispatch({
        type: actionTypes.INCREMENT_CARDIO_SECONDS_ELAPSED
      })
    }
  }
}

export function trackInterval(intervalPoint) {
  return (dispatch, getState) => {
    const { cardioSession } = getState()
    const { secondsElapsed } = cardioSession

    const trackedInterval = {
      timestamp: + new Date(),
      x: secondsElapsed,
      y: intervalPoint
    }

    dispatch({
      type: actionTypes.ADD_TRACKED_INTERVAL,
      payload: trackedInterval
    })
  }
}