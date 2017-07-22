import reducer from '../workouts'
import * as actionTypes from '../../constants/actionTypes'

describe('workouts reducer unit tests', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      isFetching: false,
      workouts: {},
      error: null
    })
  })

  it('should handle FETCH_WORKOUTS_REQUEST', () => {
    expect(
      reducer(undefined, {
        type: actionTypes.FETCH_WORKOUTS_REQUEST
      })
    ).toEqual({
      isFetching: true,
      workouts: {},
      error: null
    })
  })

  it('should handle FETCH_WORKOUTS_SUCCESS', () => {
    expect(
      reducer({
        isFetching: true,
        workouts: {},
        error: null
      }, {
        type: actionTypes.FETCH_WORKOUTS_SUCCESS,
        payload: { workout_1: { _id: 'workout_1' } }
      })
    ).toEqual({
      isFetching: false,
      workouts: { workout_1: { _id: 'workout_1' } },
      error: null
    })
  })

  it('should handle FETCH_WORKOUTS_FAILURE', () => {
    expect(
      reducer({
        isFetching: true,
        workouts: {},
        error: null
      }, {
        type: actionTypes.FETCH_WORKOUTS_FAILURE,
        payload: { code: 'ERR', message: 'Something went wrong!' }
      })
    ).toEqual({
      isFetching: false,
      workouts: {},
      error: { code: 'ERR', message: 'Something went wrong!' }
    })
  })
})