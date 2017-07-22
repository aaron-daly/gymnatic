import * as actionTypes from '../../constants/actionTypes'
import reducer from '../aggregatedMaxLifts'

describe('aggregatedMaxLifts reducer unit tests', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      isFetching: false,
      aggregatedMaxLifts: {},
      filter: '-KdSHwZzvhuJjjKLsgs7',
      visibilityFilter: 7,
      error: null
    })
  })

  it('should handle FETCH_AGGREGATED_MAX_LIFTS_REQUEST', () => {
    expect(
      reducer(undefined, {
        type: actionTypes.FETCH_AGGREGATED_MAX_LIFTS_REQUEST
      })
    ).toEqual({
      isFetching: true,
      aggregatedMaxLifts: {},
      filter: '-KdSHwZzvhuJjjKLsgs7',
      visibilityFilter: 7,
      error: null
    })
  })

  it('should handle FETCH_AGGREGATED_MAX_LIFTS_SUCCESS', () => {
    const state = {
      isFetching: true,
      aggregatedMaxLifts: {},
      filter: '-KdSHwZzvhuJjjKLsgs7',
      visibilityFilter: 7,
      error: null
    }
    const action = {
      type: actionTypes.FETCH_AGGREGATED_MAX_LIFTS_SUCCESS,
      payload: {1: 1, 2: 2, 3: 3}
    }
    const expectedState = {
      isFetching: false,
      aggregatedMaxLifts: {1: 1, 2: 2, 3: 3},
      filter: '-KdSHwZzvhuJjjKLsgs7',
      visibilityFilter: 7,
      error: null
    }
    expect(reducer(state, action)).toEqual(expectedState)
  })

  it('should handle FETCH_AGGREGATED_MAX_LIFTS_FAILURE', () => {
    const state = {
      isFetching: true,
      aggregatedMaxLifts: {},
      filter: '-KdSHwZzvhuJjjKLsgs7',
      visibilityFilter: 7,
      error: null
    }
    const action = {
      type: actionTypes.FETCH_AGGREGATED_MAX_LIFTS_FAILURE,
      payload: {error: 'Something went wrong!'}
    }
    const expectedState = {
      isFetching: false,
      aggregatedMaxLifts: {},
      filter: '-KdSHwZzvhuJjjKLsgs7',
      visibilityFilter: 7,
      error: {error: 'Something went wrong!'}
    }
    expect(reducer(state, action)).toEqual(expectedState)
  })
  it('should handle UPDATE_AGGREGATED_MAX_LIFTS_FILTER', () => {
    const state = {
      isFetching: false,
      aggregatedMaxLifts: {1: 1, 2: 2, 3: 3},
      filter: '-KdSHwZzvhuJjjKLsgs7',
      visibilityFilter: 7,
      error: null
    }
    const action = {
      type: actionTypes.UPDATE_AGGREGATED_MAX_LIFTS_FILTER,
      payload: 'newFilter'
    }
    const expectedState = {
      isFetching: false,
      aggregatedMaxLifts: {1: 1, 2: 2, 3: 3},
      filter: 'newFilter',
      visibilityFilter: 7,
      error: null
    }
    expect(reducer(state, action)).toEqual(expectedState)
  })
  it('should handle UPDATE_AGGREGATED_MAX_LIFTS_FILTER', () => {
    const state = {
      isFetching: false,
      aggregatedMaxLifts: {1: 1, 2: 2, 3: 3},
      filter: '-KdSHwZzvhuJjjKLsgs7',
      visibilityFilter: 7,
      error: null
    }
    const action = {
      type: actionTypes.UPDATE_AGGREGATED_MAX_LIFTS_VISIBILITY_FILTER,
      payload: 14
    }
    const expectedState = {
      isFetching: false,
      aggregatedMaxLifts: {1: 1, 2: 2, 3: 3},
      filter: '-KdSHwZzvhuJjjKLsgs7',
      visibilityFilter: 14,
      error: null
    }
    expect(reducer(state, action)).toEqual(expectedState)
  })
})
