import reducer from '../cardioLogs'
import * as actionTypes from '../../constants/actionTypes'

describe('cardioLogs reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      isFetching: false,
      cardioLogs: {},
      error: null
    })
  })

  it('should handle FETCH_CARDIO_LOGS_REQUEST', () => {
    expect(
      reducer(undefined, {
        type: actionTypes.FETCH_CARDIO_LOGS_REQUEST
      })
    ).toEqual({
      isFetching: true,
      cardioLogs: {},
      error: null
    })
  })

  it('should handle FETCH_CARDIO_LOGS_SUCCESS', () => {
    expect(
      reducer({
        isFetching: true,
        cardioLogs: {},
        error: null
      }, {
        type: actionTypes.FETCH_CARDIO_LOGS_SUCCESS,
        payload: { log_1: {} }
      })
    ).toEqual({
      isFetching: false,
      cardioLogs: { log_1: {} },
      error: null
    })
  })

  it('should handle FETCH_CARDIO_LOGS_FAILURE', () => {
    expect(
      reducer({
        isFetching: true,
        cardioLogs: {},
        error: null
      }, {
        type: actionTypes.FETCH_CARDIO_LOGS_FAILURE,
        payload: { code: 'ERR', message: 'Something went wrong!' }
      })
    ).toEqual({
      isFetching: false,
      cardioLogs: {},
      error: { code: 'ERR', message: 'Something went wrong!' }
    })
  })
})