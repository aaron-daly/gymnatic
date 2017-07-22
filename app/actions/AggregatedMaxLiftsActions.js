import * as actionTypes from '../constants/actionTypes'

const fetchAggregatedMaxLiftsRequest = () => ({
  type: actionTypes.FETCH_AGGREGATED_MAX_LIFTS_REQUEST
})

const fetchAggregatedMaxLiftsSuccess = (cardioPresets) => ({
  type: actionTypes.FETCH_AGGREGATED_MAX_LIFTS_SUCCESS,
  payload: cardioPresets
})

const fetchAggregatedMaxLiftsFailure = (error) => ({
  type: actionTypes.FETCH_AGGREGATED_MAX_LIFTS_FAILURE,
  payload: error
})

export function fetchAggregatedMaxLifts() {
  return (dispatch, getState, { api, auth }) => {
    dispatch(fetchAggregatedMaxLiftsRequest())
    try {
      api.child(`maxLiftsAggregates/${auth.currentUser.uid}`)
        .on('value', (snap) => dispatch(fetchAggregatedMaxLiftsSuccess(snap.val() || {})))
    } catch (error) {
      dispatch(fetchAggregatedMaxLiftsFailure(error))
    }
  }
}

export const updateMaxLiftsFilter = (filter) => ({
  type: actionTypes.UPDATE_AGGREGATED_MAX_LIFTS_FILTER,
  payload: filter
})

export const updateMaxLiftsVisibilityFilter = (filter) => ({
  type: actionTypes.UPDATE_AGGREGATED_MAX_LIFTS_VISIBILITY_FILTER,
  payload: filter
})