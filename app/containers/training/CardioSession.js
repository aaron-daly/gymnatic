import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { filter, map, mapValues, toLower } from 'lodash'
import { View, Alert, StatusBar } from 'react-native'

import SessionHeader from '../../components/workoutSession/SessionHeader'
import SessionProgressGraph from '../../components/cardioSession/CardioSessionProgressGraph'
import SessionTrackButton from '../../components/cardioSession/CardioSessionTrackButton'
import { addCardioLog } from '../../actions/CardioLogsActions'
import {
  togglePauseSession,
  handleTimeInterval,
  trackInterval
} from '../../actions/CardioSessionActions'
import {
  parseGraphData,
  calculateNextIntervalPoint,
  calculateGraphXDomain,
  calculateGraphYDomain,
  calculateGraphTickValues
} from '../../utils/CardioSessionUtils'
import colors from '../../constants/colors'

class CardioSession extends Component {

  componentDidMount() {
    this.timerInterval = setInterval(this.props.actions.handleTimeInterval, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval)
  }

  _onPausePress = () => {
    this.props.actions.togglePauseSession()
    Alert.alert(
      'Session Paused', '',
      [{ text: 'Resume', onPress: this.props.actions.togglePauseSession }]
    )
  }

  _onStopPress = () => {
    this.props.actions.togglePauseSession()
    Alert.alert(
      'Are you sure?', '',
      [{ text: 'Cancel', onPress: this.props.actions.togglePauseSession },
       { text: 'Confirm', onPress: this._logSession }]
    )
  }

  _parseTrackedInterval = ({ x, y, timestamp }) => {
    return {
      secondsElapsed: x,
      intervalPoint: y,
      timestamp
    }
  }

  _logSession = () => {
    const {
      cardioPreset,
      cardioSession,
      distanceMetric
    } = this.props

    const {
      secondsElapsed,
      trackedIntervals,
      configuration,
      bots,
      botIntervals,
      botConfigurations,
    } = cardioSession

    const recordedSession = map(trackedIntervals, this._parseTrackedInterval)

    this.props.actions.addCardioLog({
      timestamp: + new Date(),
      _presetId: cardioPreset._id,
      presetTitle: cardioPreset.title,
      exercise: cardioPreset.exercise,
      distance: cardioPreset.distance,
      distanceMetric,
      secondsElapsed,
      recordedSession,
      configuration,
      bots,
      botIntervals,
      botConfigurations
    })
  }

  _onTrackIntervalPress = (nextIntervalPoint) => {
    this.props.actions.trackInterval(nextIntervalPoint)
    // if the interval point tracked has reached the target session distance,
    // alert the user and log the session
    if (nextIntervalPoint >= this.props.cardioPreset.distance) {
      this.props.actions.togglePauseSession()
      Alert.alert(
        'Session Completed',
        'The session log is available in your diary.',
        [{ text: 'Close', onPress: this._logSession }]
      )
    }
  }

  render() {
    const {
      cardioPreset,
      cardioSession,
      distanceMetric
    } = this.props

    const {
      secondsElapsed,
      trackedIntervals,
      configuration,
      bots,
      botConfigurations,
      botIntervals
    } = cardioSession

    const { distance, intervalDistance } = cardioPreset
    const { tickSize,  numViewableTicks } = configuration

    // Process graph data and determine tick values & domain
    const graphData = parseGraphData(trackedIntervals)
    const graphTickValues = calculateGraphTickValues(secondsElapsed, tickSize, numViewableTicks)
    const graphXDomain = calculateGraphXDomain(secondsElapsed, tickSize, numViewableTicks)
    const graphYDomain = calculateGraphYDomain(distance)
    const graphDomain = { x: graphXDomain, y: graphYDomain }

    // Filter viewable guest/bot intervals
    // for each guest's intervals, filter out the intervals that have occurred already...
    // i.e. the interval's x value (secondsElapsed) is less than or equal to the session's
    // seconds elapsed...
    const viewableBotIntervals = mapValues(botIntervals, singleBotIntervals =>
      filter(singleBotIntervals, datum => secondsElapsed >= datum.x))

    // parse guest graph data by mapping over the guests (guest keys) and
    // pulling together the guests' viewable (filtered) intervals and configs
    const botGraphData = {}; map(bots, key => botGraphData[key] = {
      intervals: parseGraphData(viewableBotIntervals[key]),
      config: botConfigurations[key]
    })

    // Calculate next interval point & parse tracking button text
    const nextIntervalPoint = calculateNextIntervalPoint(trackedIntervals, intervalDistance)
    const numIntervals = (distance / intervalDistance)
    const currentInterval = trackedIntervals.length + 1
    const nextIntervalText = `${nextIntervalPoint}${toLower(distanceMetric)}`
    const intervalFractionText = `${currentInterval}/${numIntervals}`

    return (
      <View style={{ flex: 1, backgroundColor: colors.darknavy }}>
        <StatusBar hidden />
        <SessionHeader
          titleText={cardioPreset.title}
          onPausePress={this._onPausePress}
          onStopPress={this._onStopPress}
        />
        <SessionProgressGraph
          data={graphData}
          guestData={botGraphData}
          domain={graphDomain}
          tickValues={graphTickValues}
        />
        <SessionTrackButton
          upperText={nextIntervalText}
          lowerText={intervalFractionText}
          onPress={() => this._onTrackIntervalPress(nextIntervalPoint)}
        />
      </View>
    )
  }
}

CardioSession.propTypes = {
  cardioPreset: PropTypes.shape({
    title: PropTypes.string.isRequired,
    exercise: PropTypes.string.isRequired,
    distance: PropTypes.number.isRequired,
    intervalDistance: PropTypes.number.isRequired,
    distanceMetric: PropTypes.string.isRequired
  }),
  cardioSession: PropTypes.shape({
    isPaused: PropTypes.bool.isRequired,
    secondsElapsed: PropTypes.number.isRequired,
    trackedIntervals: PropTypes.arrayOf(PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    })).isRequired,
    configuration: PropTypes.shape({
      tickSize: PropTypes.number.isRequired,
      numViewableTicks: PropTypes.number.isRequired
    }).isRequired
  }).isRequired,
  distanceMetric: PropTypes.string
}

const mapStateToProps = (state, ownProps) => ({
  cardioSession: state.cardioSession,
  cardioPreset: state.cardioPresets.cardioPresets[ownProps._cardioPresetId],
  distanceMetric: state.configuration.configuration.distanceMetric
})

const mapDispatchToProps = (dispatch) => ({
  actions: {
    togglePauseSession: () => dispatch(togglePauseSession()),
    handleTimeInterval: () => dispatch(handleTimeInterval()),
    trackInterval: (intervalPoint) => dispatch(trackInterval(intervalPoint)),
    addCardioLog: (cardioLog) => dispatch(addCardioLog(cardioLog))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardioSession)