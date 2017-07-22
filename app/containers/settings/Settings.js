import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Actions as routerActions } from 'react-native-router-flux'
import { View, ScrollView, StyleSheet } from 'react-native'

import { Avatar, Label, PickerInput, OptionsMenu } from '../../components/common'
import { logout } from '../../actions/AuthActions'
import { setConfigurationValue } from '../../actions/ConfigurationActions'
import * as strings from '../../constants/strings/settings'
import colors from '../../constants/colors'

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightgrey,
    paddingBottom: 45
  },
  userSection: {
    paddingTop: 68,
    paddingBottom: 20,
    marginBottom: 15,
    backgroundColor: colors.navy,
    alignSelf: 'stretch',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 2,
    shadowColor: colors.navy,
    shadowOpacity: 0.5
  }
})

class Settings extends Component {

  componentDidMount() {
    const { displayName } = this.props.user.user

    const menuOptions = [
      {
        label: strings.LOGOUT,
        onPress: this.props.actions.logout
      }
    ]

    routerActions.refresh({
      title: displayName,
      renderRightButton: () => <OptionsMenu options={menuOptions}/>
    })
  }

  _updateConfigurationValue = (key, value) => {
    this.props.actions.setConfigurationValue(key, value)
  }

  render() {
    const { photoURL } = this.props.user.user
    const { weightMetric, distanceMetric } = this.props.configuration.configuration
    return (
      <ScrollView
        style={styles.container}
        keyboardShouldPersistTaps="always">
        {
          photoURL ?
            <View style={styles.userSection}>
              <Avatar size={100} source={{uri: photoURL}}/>
            </View> :
            <View style={{ height: 64 }} />
        }
        <Label label={strings.UNIT_MEASUREMENTS_LABEL} />
        <PickerInput
          label={strings.WEIGHT_METRIC_LABEL}
          options={strings.WEIGHT_METRIC_OPTIONS}
          initValue={strings.WEIGHT_METRIC_OPTIONS[weightMetric]}
          onValueChange={(value) => this._updateConfigurationValue(strings.WEIGHT_METRIC_KEY, value)}
        />
        <PickerInput
          label={strings.DISTANCE_METRIC_LABEL}
          options={strings.DISTANCE_METRIC_OPTIONS}
          initValue={strings.DISTANCE_METRIC_OPTIONS[distanceMetric]}
          onValueChange={(value) => this._updateConfigurationValue(strings.DISTANCE_METRIC_KEY, value)}
        />
      </ScrollView>
    )
  }

}

Settings.propTypes = {
  isFetching: PropTypes.bool,
  configuration: PropTypes.object,
  error: PropTypes.object
}

const mapStateToProps = (state) => ({
  user: state.user,
  configuration: state.configuration
})

const mapDispatchToProps = (dispatch) => ({
  actions: {
    logout: () => dispatch(logout()),
    setConfigurationValue: (key, value) => dispatch(setConfigurationValue(key, value))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings)
