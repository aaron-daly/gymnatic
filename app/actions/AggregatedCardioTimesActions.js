import * as actionTypes from '../constants/actionTypes'

const fetchAggregatedCardioTimesRequest = () => ({
  type: actionTypes.FETCH_AGGREGATED_CARDIO_TIMES_REQUEST
})

const fetchAggregatedCardioTimesSuccess = (cardioPresets) => ({
  type: actionTypes.FETCH_AGGREGATED_CARDIO_TIMES_SUCCESS,
  payload: cardioPresets
})

const fetchAggregatedCardioTimesFailure = (error) => ({
  type: actionTypes.FETCH_AGGREGATED_CARDIO_TIMES_FAILURE,
  payload: error
})

export function fetchAggregatedCardioTimes() {
  return (dispatch, getState, { api, auth }) => {
    dispatch(fetchAggregatedCardioTimesRequest())
    try {
      api.child(`cardioTimesAggregatesTotals/${auth.currentUser.uid}`)
        .on('value', (snap) => dispatch(fetchAggregatedCardioTimesSuccess(snap.val() || {})))
    } catch (error) {
      dispatch(fetchAggregatedCardioTimesFailure(error))
    }
  }
}