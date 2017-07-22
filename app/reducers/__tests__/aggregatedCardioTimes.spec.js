import * as actionTypes from '../../constants/actionTypes'
import reducer from '../aggregatedCardioTimes'

describe('aggregatedCardioTimes reducer unit tests', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      isFetching: false,
      aggregatedCardioTimes: {},
      error: null
    })
  })

  it('should handle FETCH_AGGREGATED_CARDIO_TIMES_REQUEST', () => {
    expect(
      reducer(undefined, {
        type: actionTypes.FETCH_AGGREGATED_CARDIO_TIMES_REQUEST
      })
    ).toEqual({
      isFetching: true,
      aggregatedCardioTimes: {},
      error: null
    })
  })

  it('should handle FETCH_AGGREGATED_CARDIO_TIMES_SUCCESS', () => {
    const state = {
      isFetching: true,
      aggregatedCardioTimes: {},
      error: null
    }
    const action = {
      type: actionTypes.FETCH_AGGREGATED_CARDIO_TIMES_SUCCESS,
      payload: {1: 1, 2: 2, 3: 3}
    }
    const expectedState = {
      isFetching: false,
      aggregatedCardioTimes: {1: 1, 2: 2, 3: 3},
      error: null
    }
    expect(reducer(state, action)).toEqual(expectedState)
  })

  it('should handle FETCH_AGGREGATED_CARDIO_TIMES_FAILURE', () => {
    const state = {
      isFetching: true,
      aggregatedCardioTimes: {},
      error: null
    }
    const action = {
      type: actionTypes.FETCH_AGGREGATED_CARDIO_TIMES_FAILURE,
      payload: {error: 'Something went wrong!'}
    }
    const expectedState = {
      isFetching: false,
      aggregatedCardioTimes: {},
      error: {error: 'Something went wrong!'}
    }
    expect(reducer(state, action)).toEqual(expectedState)
  })
})
