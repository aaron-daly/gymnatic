import reducer from '../workoutLogs'
import * as actionTypes from '../../constants/actionTypes'

describe('workoutLogs reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      isFetching: false,
      workoutLogs: {},
      error: null
    })
  })

  it('should handle FETCH_WORKOUT_LOGS_REQUEST', () => {
    expect(
      reducer(undefined, {
        type: actionTypes.FETCH_WORKOUT_LOGS_REQUEST
      })
    ).toEqual({
      isFetching: true,
      workoutLogs: {},
      error: null
    })
  })

  it('should handle FETCH_WORKOUT_LOGS_SUCCESS', () => {
    expect(
      reducer({
        isFetching: true,
        workoutLogs: {},
        error: null
      }, {
        type: actionTypes.FETCH_WORKOUT_LOGS_SUCCESS,
        payload: { log_1: {} }
      })
    ).toEqual({
      isFetching: false,
      workoutLogs: { log_1: {} },
      error: null
    })
  })

  it('should handle FETCH_WORKOUT_LOGS_FAILURE', () => {
    expect(
      reducer({
        isFetching: true,
        workoutLogs: {},
        error: null
      }, {
        type: actionTypes.FETCH_WORKOUT_LOGS_FAILURE,
        payload: { code: 'ERR', message: 'Something went wrong!' }
      })
    ).toEqual({
      isFetching: false,
      workoutLogs: {},
      error: { code: 'ERR', message: 'Something went wrong!' }
    })
  })
})