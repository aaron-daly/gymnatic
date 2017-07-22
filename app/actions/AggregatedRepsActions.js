import * as actionTypes from '../constants/actionTypes'

const fetchAggregatedRepsRequest = () => ({
  type: actionTypes.FETCH_AGGREGATED_REPS_REQUEST
})

const fetchAggregatedRepsSuccess = (cardioPresets) => ({
  type: actionTypes.FETCH_AGGREGATED_REPS_SUCCESS,
  payload: cardioPresets
})

const fetchAggregatedRepsFailure = (error) => ({
  type: actionTypes.FETCH_AGGREGATED_REPS_FAILURE,
  payload: error
})

export function fetchAggregatedReps() {
  return (dispatch, getState, { api, auth }) => {
    dispatch(fetchAggregatedRepsRequest())
    try {
      api.child(`exerciseRepsAggregatesTotals/${auth.currentUser.uid}`)
        .on('value', (snap) => dispatch(fetchAggregatedRepsSuccess(snap.val() || {})))
    } catch (error) {
      dispatch(fetchAggregatedRepsFailure(error))
    }
  }
}