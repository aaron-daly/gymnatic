import * as actionTypes from '../constants/actionTypes'

const fetchAggregatedSpeedsRequest = () => ({
  type: actionTypes.FETCH_AGGREGATED_SPEEDS_REQUEST
})

const fetchAggregatedSpeedsSuccess = (cardioPresets) => ({
  type: actionTypes.FETCH_AGGREGATED_SPEEDS_SUCCESS,
  payload: cardioPresets
})

const fetchAggregatedSpeedsFailure = (error) => ({
  type: actionTypes.FETCH_AGGREGATED_SPEEDS_FAILURE,
  payload: error
})

export function fetchAggregatedSpeeds() {
  return (dispatch, getState, { api, auth }) => {
    dispatch(fetchAggregatedSpeedsRequest())
    try {
      api.child(`cardioSpeedsAggregates/${auth.currentUser.uid}`)
        .on('value', (snap) => dispatch(fetchAggregatedSpeedsSuccess(snap.val() || {})))
    } catch (error) {
      dispatch(fetchAggregatedSpeedsFailure(error))
    }
  }
}

export const updateSpeedsFilter = (filter) => ({
  type: actionTypes.UPDATE_AGGREGATED_SPEEDS_FILTER,
  payload: filter
})

export const updateSpeedsVisibilityFilter = (filter) => ({
  type: actionTypes.UPDATE_AGGREGATED_SPEEDS_VISIBILITY_FILTER,
  payload: filter
})