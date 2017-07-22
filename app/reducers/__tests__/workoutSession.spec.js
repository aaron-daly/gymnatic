import reducer from '../workoutSession'
import * as actionTypes from '../../constants/actionTypes'

describe('configuration reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})
    ).toEqual({
      isLoading: true,
      isPaused: false,
      secondsElapsed: 0,
      exerciseIndex: 0,
      setIndex: 0,
      recordedSession: []
    })
  })

  it('should handle CONSTRUCT_SESSION', () => {
    const payload = [1, 2, 3]
    const expectedState = {
      isLoading: false,
      isPaused: false,
      secondsElapsed: 0,
      exerciseIndex: 0,
      setIndex: 0,
      recordedSession: payload
    }
    expect(reducer(undefined, {
        type: actionTypes.CONSTRUCT_SESSION,
        payload
      })
    ).toEqual(expectedState)
  })

  it('should handle TOGGLE_PAUSE_SESSION', () => {
    const state = {
      isPaused: false
    }
    const expectedState = {
      isPaused: !state.isPaused
    }
    expect(reducer(state, {
        type: actionTypes.TOGGLE_PAUSE_SESSION
      })
    ).toEqual(expectedState)
  })

  it('should handle INCREMENT_SECONDS_ELAPSED', () => {
    const state = {
      secondsElapsed: 0
    }
    const expectedState = {
      secondsElapsed: 1
    }
    expect(
      reducer(state, {
        type: actionTypes.INCREMENT_SECONDS_ELAPSED
      })
    ).toEqual(expectedState)
  })

  it('should handle CLEAR_SESSION', () => {
    expect(reducer({
      isLoading: false,
      isPaused: false,
      secondsElapsed: 0,
      exerciseIndex: 0,
      setIndex: 0,
      recordedSession: [1, 2, 3]
    }, {
      type: actionTypes.CLEAR_SESSION
    })).toEqual({
      isLoading: true,
      isPaused: false,
      secondsElapsed: 0,
      exerciseIndex: 0,
      setIndex: 0,
      recordedSession: []
    })
  })
})
