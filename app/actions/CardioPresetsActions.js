import * as actionTypes from '../constants/actionTypes'

const fetchCardioPresetsRequest = () => ({
  type: actionTypes.FETCH_CARDIO_PRESETS_REQUEST
})

const fetchCardioPresetsSuccess = (cardioPresets) => ({
  type: actionTypes.FETCH_CARDIO_PRESETS_SUCCESS,
  payload: cardioPresets
})

const fetchCardioPresetsFailure = (error) => ({
  type: actionTypes.FETCH_CARDIO_PRESETS_FAILURE,
  payload: error
})

export function fetchCardioPresets() {
  return (dispatch, getState, { api }) => {
    dispatch(fetchCardioPresetsRequest())
    try {
      api.child('cardioPresets')
        .on('value', (snap) => dispatch(fetchCardioPresetsSuccess(snap.val() || {})))
    } catch (error) {
      dispatch(fetchCardioPresetsFailure(error))
    }
  }
}