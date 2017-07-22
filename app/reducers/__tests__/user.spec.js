import reducer from '../user'
import * as actionTypes from '../../constants/actionTypes'

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      isFetching: false,
      user: {},
      error: null
    })
  })

  it('should handle AUTH_REQUEST', () => {
    expect(
      reducer(undefined, {
        type: actionTypes.AUTH_REQUEST
      })
    ).toEqual({
      isFetching: true,
      user: {},
      error: null
    })
  })

  it('should handle AUTH_SUCCESS', () => {
    expect(
      reducer({
        isFetching: true,
        user: {},
        error: null
      }, {
        type: actionTypes.AUTH_SUCCESS,
        payload: { _id: 'user_1' }
      })
    ).toEqual({
      isFetching: false,
      user: { _id: 'user_1' },
      error: null
    })
  })

  it('should handle AUTH_FAILURE', () => {
    expect(
      reducer({
        isFetching: true,
        user: {},
        error: null
      }, {
        type: actionTypes.AUTH_FAILURE,
        payload: { code: 'ERR', message: 'Something went wrong!' }
      })
    ).toEqual({
      isFetching: false,
      user: {},
      error: { code: 'ERR', message: 'Something went wrong!' }
    })
  })

  it('should handle LOGOUT_SUCCESS', () => {
    expect(
      reducer({
        isFetching: false,
        user: { _id: 'user_1' },
        error: null
      }, {
        type: actionTypes.LOGOUT_SUCCESS
      })
    ).toEqual({
      isFetching: false,
      user: {},
      error: null
    })
  })

  it('should handle AUTH_DISMISS_ERROR', () => {
    expect(
      reducer({
        isFetching: false,
        user: {},
        error: { code: 'ERR', message: 'Something went wrong!' }
      }, {
        type: actionTypes.LOGOUT_SUCCESS
      })
    ).toEqual({
      isFetching: false,
      user: {},
      error: null
    })
  })
})