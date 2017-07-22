import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { View, Alert } from 'react-native'
import { Actions as routerActions } from 'react-native-router-flux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


import CardioSessionConfig from './CardioSessionConfig'
import CardioSessionBotConfigs from './CardioSessionBotConfigs'
import { ViewContainer, BlockButton } from '../../components/common'
import WorkoutInfo from '../../components/common/InfoHeader'
import { clearSession, startSession } from '../../actions/CardioSessionActions'
import * as strings from '../../constants/strings/cardio'
import colors from '../../constants/colors'

class CardioPreset extends Component {

  componentWillMount() {
    this.props.actions.clearSession()
  }

  componentDidMount() {
    routerActions.refresh({
      title: this.props.cardioPreset.title

    })
  }

  _onStartPress = () => {
    Alert.alert(
      strings.START_SESSION_ALERT_TITLE,
      strings.START_SESSION_ALERT_BODY,
      [
        {
          text: 'Cancel'
        },
        {
          text: 'Start',
          onPress: () => this.props.actions.startSession(this.props._id)
        }
      ]
    )
  }

  render() {
    const {
      exercise,
      distance,
      distanceMetric,
      intervalDistance
    } = this.props.cardioPreset

    const exerciseText = _.startCase(_.toLower(exercise))
    const distanceText = `${distance}${_.toLower(distanceMetric)}`
    const intervalText = `${intervalDistance}${_.toLower(distanceMetric)}`

    const workoutInfo = [
      { label: strings.EXERCISE_LABEL, value: exerciseText, color: colors.pink },
      { label: strings.DISTANCE_LABEL, value: distanceText, color: colors.blue },
      { label: strings.INTERVAL_LABEL, value: intervalText, color: colors.green },
    ]

    return (
      <ViewContainer>
        <WorkoutInfo info={workoutInfo} />
        <KeyboardAwareScrollView extraHeight={150}>
          <CardioSessionConfig _cardioPresetId={this.props.cardioPreset._id} />
          <CardioSessionBotConfigs _cardioPresetId={this.props.cardioPreset._id} />
          <View style={{ height: 30 }} />
        </KeyboardAwareScrollView>
        <BlockButton
          title={strings.START_SESSION_BUTTON}
          onPress={this._onStartPress}
        />
      </ViewContainer>
    )
  }
}

CardioPreset.propTypes = {
  _id: PropTypes.string.isRequired,
  cardioPreset: PropTypes.shape({
    title: PropTypes.string.isRequired,
    exercise: PropTypes.string.isRequired,
    distance: PropTypes.number.isRequired,
    intervalDistance: PropTypes.number.isRequired,
    distanceMetric: PropTypes.string.isRequired,
    defaultConfiguration: PropTypes.shape({
      tickSize: PropTypes.number.isRequired,
      numViewableTicks: PropTypes.number.isRequired
    }).isRequired
  }).isRequired
}

const mapStateToProps = (state, ownProps) => ({
  cardioPreset: state.cardioPresets.cardioPresets[ownProps._id]
})

const mapDispatchToProps = (dispatch) => ({
  actions: {
    clearSession: () => dispatch(clearSession()),
    startSession: (_cardioPresetId) => dispatch(startSession(_cardioPresetId))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardioPreset)