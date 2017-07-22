import reducer from '../cardioPresets'
import * as actionTypes from '../../constants/actionTypes'

describe('cardioPresets reducer unit tests', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      isFetching: false,
      cardioPresets: {},
      error: null
    })
  })

  it('should handle FETCH_CARDIO_PRESETS_REQUEST', () => {
    expect(
      reducer(undefined, {
        type: actionTypes.FETCH_CARDIO_PRESETS_REQUEST
      })
    ).toEqual({
      isFetching: true,
      cardioPresets: {},
      error: null
    })
  })

  it('should handle FETCH_CARDIO_PRESETS_SUCCESS', () => {
    expect(
      reducer({
        isFetching: true,
        cardioPresets: {},
        error: null
      }, {
        type: actionTypes.FETCH_CARDIO_PRESETS_SUCCESS,
        payload: { 1: {} }
      })
    ).toEqual({
      isFetching: false,
      cardioPresets: { 1: {} },
      error: null
    })
  })

  it('should handle FETCH_CARDIO_PRESETS_FAILURE', () => {
    expect(
      reducer({
        isFetching: true,
        cardioPresets: {},
        error: null
      }, {
        type: actionTypes.FETCH_CARDIO_PRESETS_FAILURE,
        payload: { code: 'ERR', message: 'Something went wrong!' }
      })
    ).toEqual({
      isFetching: false,
      cardioPresets: {},
      error: { code: 'ERR', message: 'Something went wrong!' }
    })
  })
})