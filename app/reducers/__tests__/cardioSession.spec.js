import * as actionTypes from '../../constants/actionTypes'
import reducer, { initialState } from '../cardioSession'

describe('cardioSession reducer unit tests', () => {
  it('should provide initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should update session configuration', () => {
    const state = {
      configuration: {
        tickSize: 15,
        numViewableTicks: 30
      }
    }

    const action = {
      type: actionTypes.UPDATE_CARDIO_SESSION_CONFIGURATION,
      payload: {
        tickSize: 20
      }
    }

    const expectedState = {
      configuration: {
        tickSize: 20,
        numViewableTicks: 30
      }
    }

    expect(reducer(state, action)).toEqual(expectedState)
  })

  it('should handle pausing the session', () => {
    const state = {
      isPaused: true
    }

    const action = {
      type: actionTypes.TOGGLE_PAUSE_CARDIO_SESSION
    }

    const expectedState = {
      isPaused: false
    }

    expect(reducer(state, action)).toEqual(expectedState)
  })

  it('should increment seconds elapsed', () => {
    const state = {
      secondsElapsed: 0
    }

    const action = {
      type: actionTypes.INCREMENT_CARDIO_SECONDS_ELAPSED
    }

    const expectedState = {
      secondsElapsed: 1
    }

    expect(reducer(state, action)).toEqual(expectedState)
  })

  it('should add tracked intervals', () => {
    const state = {
      trackedIntervals: []
    }

    const action = {
      type: actionTypes.ADD_TRACKED_INTERVAL,
      payload: { x: 60, y: 500 }
    }

    const expectedState = {
      trackedIntervals: [{ x: 60, y: 500 }]
    }

    expect(reducer(state, action)).toEqual(expectedState)
  })

  it('should clear the session', () => {
    const state = {
      isPaused: false,
      secondsElapsed: 62,
      trackedIntervals: { x: 60, y: 500 },
      configuration: {
        tickSize: 15,
        numViewableTicks: 30
      }
    }

    const action = {
      type: actionTypes.CLEAR_CARDIO_SESSION
    }

    expect(reducer(state, action)).toEqual(initialState)
  })
})