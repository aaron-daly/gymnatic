import * as actionTypes from '../../constants/actionTypes'
import reducer from '../aggregatedReps'

describe('aggregatedReps reducer unit tests', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      isFetching: false,
      aggregatedReps: {},
      error: null
    })
  })

  it('should handle FETCH_AGGREGATED_REPS_REQUEST', () => {
    expect(
      reducer(undefined, {
        type: actionTypes.FETCH_AGGREGATED_REPS_REQUEST
      })
    ).toEqual({
      isFetching: true,
      aggregatedReps: {},
      error: null
    })
  })

  it('should handle FETCH_AGGREGATED_REPS_SUCCESS', () => {
    const state = {
      isFetching: true,
      aggregatedReps: {},
      error: null
    }
    const action = {
      type: actionTypes.FETCH_AGGREGATED_REPS_SUCCESS,
      payload: {1: 1, 2: 2, 3: 3}
    }
    const expectedState = {
      isFetching: false,
      aggregatedReps: {1: 1, 2: 2, 3: 3},
      error: null
    }
    expect(reducer(state, action)).toEqual(expectedState)
  })

  it('should handle FETCH_AGGREGATED_REPS_FAILURE', () => {
    const state = {
      isFetching: true,
      aggregatedReps: {},
      error: null
    }
    const action = {
      type: actionTypes.FETCH_AGGREGATED_REPS_FAILURE,
      payload: {error: 'Something went wrong!'}
    }
    const expectedState = {
      isFetching: false,
      aggregatedReps: {},
      error: {error: 'Something went wrong!'}
    }
    expect(reducer(state, action)).toEqual(expectedState)
  })
})
