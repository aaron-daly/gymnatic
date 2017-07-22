import * as actions from '../WorkoutSessionActions'
import * as actionTypes from '../../constants/actionTypes'

jest.mock('react-native-router-flux', () => {
  return {
    Actions: {
      workouts: jest.fn()
    }
  }
})

describe('workout session actions', () => {

  it('should create an action to construct a workout session', () => {
    const session = [
      {
        "exerciseId": "-KdSHw_4EztQRv7NAQgx",
        "sets": [
          {
            reps: 10
          }
        ]

      }
    ]

    const expectedAction = {
      type: actionTypes.CONSTRUCT_SESSION,
      payload: session
    }
    expect(actions.constructSession(session)).toEqual(expectedAction)
  })

  it('should create an action to toggle pause session', () => {
    const expectedAction = {
      type: actionTypes.TOGGLE_PAUSE_SESSION
    }
    expect(actions.togglePauseSession()).toEqual(expectedAction)
  })
  it('should create an action to increment seconds elapsed', () => {
    const expectedAction = {
      type: actionTypes.INCREMENT_SECONDS_ELAPSED
    }
    expect(actions.incrementSecondsElapsed()).toEqual(expectedAction)
  })
  it('should create an action to increment the current set', () => {
    const expectedAction = {
      type: actionTypes.INCREMENT_CURRENT_SET
    }
    expect(actions.incrementSet()).toEqual(expectedAction)
  })
  it('should create an action to decrement the current set', () => {
    const expectedAction = {
      type: actionTypes.DECREMENT_CURRENT_SET
    }
    expect(actions.decrementSet()).toEqual(expectedAction)
  })
  it('should create an action to update the current set values', () => {
    const exerciseIndex = 2
    const setIndex = 2
    const reps = 10
    const payload = {
      exerciseIndex,
      setIndex,
      values: {
        reps
      }
    }
    const expectedAction = {
      type: actionTypes.UPDATE_CURRENT_SET_VALUES,
      payload

    }
    expect(actions.updateSetValues(exerciseIndex, setIndex, { reps })).toEqual(expectedAction)
  })
  it('should create an action to clear the session', () => {
    const expectedAction = {
      type: actionTypes.CLEAR_SESSION
    }
    expect(actions.clearSession()).toEqual(expectedAction)
  })
})