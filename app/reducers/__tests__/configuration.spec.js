import reducer from '../configuration'
import * as actionTypes from '../../constants/actionTypes'

describe('configuration reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      isFetching: false,
      configuration: {
        weightMetric: 'KG',
        distanceMetric: 'M'
      },
      error: null
    })
  })

  it('should handle FETCH_CONFIGURATION_REQUEST', () => {
    expect(
      reducer(undefined, {
        type: actionTypes.FETCH_CONFIGURATION_REQUEST
      })
    ).toEqual({
      isFetching: true,
      configuration: {
        weightMetric: 'KG',
        distanceMetric: 'M'
      },
      error: null
    })
  })

  it('should handle FETCH_CONFIGURATION_SUCCESS', () => {
    expect(
      reducer({
        isFetching: true,
        configuration: {
          weightMetric: 'KG',
          distanceMetric: 'M'
        },
        error: null
      }, {
        type: actionTypes.FETCH_CONFIGURATION_SUCCESS,
        payload: { weightMetric: 'LB' }
      })
    ).toEqual({
      isFetching: false,
      configuration: {
        weightMetric: 'LB',
        distanceMetric: 'M'
      },
      error: null
    })
  })

  it('should handle FETCH_CONFIGURATION_FAILURE', () => {
    expect(
      reducer({
        isFetching: true,
        configuration: {
          weightMetric: 'KG',
          distanceMetric: 'M'
        },
        error: null
      }, {
        type: actionTypes.FETCH_CONFIGURATION_FAILURE,
        payload: { code: 'ERR', message: 'Something went wrong!' }
      })
    ).toEqual({
      isFetching: false,
      configuration: {
        weightMetric: 'KG',
        distanceMetric: 'M'
      },
      error: { code: 'ERR', message: 'Something went wrong!' }
    })
  })
})