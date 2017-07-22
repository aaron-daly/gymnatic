import * as actionTypes from '../constants/actionTypes'

const fetchConfigurationRequest = () => ({
  type: actionTypes.FETCH_CONFIGURATION_REQUEST
})

const fetchConfigurationSuccess = (configuration) => ({
  type: actionTypes.FETCH_CONFIGURATION_SUCCESS,
  payload: configuration
})

const fetchConfigurationFailure = (error) => ({
  type: actionTypes.FETCH_CONFIGURATION_FAILURE,
  payload: error
})

export function fetchConfiguration() {
  return (dispatch, getState, { api, auth }) => {
    dispatch(fetchConfigurationRequest())
    try {
      api.child(`userConfigurations/${auth.currentUser.uid}`)
        .on('value', (snap) => dispatch(fetchConfigurationSuccess(snap.val() || {})))
    } catch(error) {
      dispatch(fetchConfigurationFailure(error))
    }
  }
}

export function setConfigurationValue(key, value) {
  return (dispatch, getState, { api, auth }) => {
    api.child(`userConfigurations/${auth.currentUser.uid}/${key}`)
      .set(value)
  }
}