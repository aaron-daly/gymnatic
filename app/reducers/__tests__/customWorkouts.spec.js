import reducer from '../customWorkouts'
import * as actionTypes from '../../constants/actionTypes'

describe('customWorkouts reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      isFetching: false,
      customWorkouts: {},
      error: null
    })
  })

  it('should handle FETCH_CUSTOM_WORKOUTS_REQUEST', () => {
    expect(
      reducer(undefined, {
        type: actionTypes.FETCH_CUSTOM_WORKOUTS_REQUEST
      })
    ).toEqual({
      isFetching: true,
      customWorkouts: {},
      error: null
    })
  })

  it('should handle FETCH_CUSTOM_WORKOUTS_SUCCESS', () => {
    expect(
      reducer({
        isFetching: true,
        customWorkouts: {},
        error: null
      }, {
        type: actionTypes.FETCH_CUSTOM_WORKOUTS_SUCCESS,
        payload: { workout_1: { _id: 'workout_1' } }
      })
    ).toEqual({
      isFetching: false,
      customWorkouts: { workout_1: { _id: 'workout_1' } },
      error: null
    })
  })

  it('should handle FETCH_CUSTOM_WORKOUTS_FAILURE', () => {
    expect(
      reducer({
        isFetching: true,
        customWorkouts: {},
        error: null
      }, {
        type: actionTypes.FETCH_CUSTOM_WORKOUTS_FAILURE,
        payload: { code: 'ERR', message: 'Something went wrong!' }
      })
    ).toEqual({
      isFetching: false,
      customWorkouts: {},
      error: { code: 'ERR', message: 'Something went wrong!' }
    })
  })
})