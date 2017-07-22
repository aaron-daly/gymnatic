import reducer from '../exercises'
import * as actionTypes from '../../constants/actionTypes'

describe('exercises reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      isFetching: false,
      exercises: {},
      error: null
    })
  })
  it('should handle FETCH_EXERCISES_REQUEST', () => {
    expect(
      reducer(undefined, {
        type: actionTypes.FETCH_EXERCISES_REQUEST
      })
    ).toEqual({
      isFetching: true,
      exercises: {},
      error: null
    })
  })
  it('should handle FETCH_EXERCISES_SUCCESS', () => {
    expect(
      reducer({
        isFetching: true,
        exercises: {},
        error: null
      }, {
        type: actionTypes.FETCH_EXERCISES_SUCCESS,
        payload: { 1: {} }
      })
    ).toEqual({
      isFetching: false,
      exercises: { 1: {} },
      error: null
    })
  })
  it('should handle FETCH_EXERCISES_FAILURE', () => {
    expect(
      reducer({
        isFetching: true,
        exercises: {},
        error: null
      }, {
        type: actionTypes.FETCH_EXERCISES_FAILURE,
        payload: { code: 'ERR', message: 'Something went wrong!' }
      })
    ).toEqual({
      isFetching: false,
      exercises: {},
      error: { code: 'ERR', message: 'Something went wrong!' }
    })
  })
})