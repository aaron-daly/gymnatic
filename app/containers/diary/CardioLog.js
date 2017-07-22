import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { ScrollView } from 'react-native'
import { map, mapValues, filter } from 'lodash'
import { Actions as routerActions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import moment from 'moment'
import _ from 'lodash'

import {
  ViewContainer,
  LoadingDialog,
  InfoHeader,
  Section,
  TextInput,
  OptionsMenu
} from '../../components/common'
import { parseGraphData } from '../../utils/CardioSessionUtils'
import IntervalsGraph from '../../components/cardioLog/IntervalsGraph'
import { fetchCardioPresets } from '../../actions/CardioPresetsActions'
import { removeCardioLog } from '../../actions/CardioLogsActions'
import { secondsToString, secondsToDigitString } from '../../utils/TimeParsers'
import * as strings from '../../constants/strings/diary'
import * as icons from '../../constants/icons'

class CardioLog extends Component {

  componentDidMount() {
    const { cardioLog, cardioPreset } = this.props
    if (!cardioPreset) {
      this.props.actions.fetchCardioPresets()
    }

    const { presetTitle } = cardioLog
    const menuOptions = [
      {
        label: 'Remove',
        onPress: this._onRemovePress
      }
    ]
    routerActions.refresh({
      title: presetTitle,
      renderRightButton: () => <OptionsMenu options={menuOptions} />
    })
  }

  _onRemovePress = () => {
    const { _id } = this.props.cardioLog
    this.props.actions.removeCardioLog(_id)
  }

  _getHeaderInfo = (timestamp, secondsElapsed) => {
    const dateText = moment(timestamp).format(strings.DATE_SHORT_FORMAT)
    const timeText = moment(timestamp).format(strings.TIME_FORMAT)
    const durationText = secondsToString(secondsElapsed)
    return [
      { label: strings.DATE_LABEL, value: dateText, color: 'rgba(255,255,255,0.6)' },
      { label: strings.TIME_LABEL, value: timeText, color: 'rgba(255,255,255,0.6)' },
      { label: strings.DURATION_LABEL, value: durationText, color: 'rgba(255,255,255,0.6)' }
    ]
  }

  _getGraphData = (recordedSession) => {
    // set up x-y data points for the graph
    const recordedSessionData = recordedSession.map((interval) => {
      const { secondsElapsed, intervalPoint } = interval
      return { x: secondsElapsed, y: intervalPoint }
    })
    // add a x=0 y=0 graph point to the start of the data
    // because the 0 point is not recorded in the cardio session
    return [ { x: 0, y: 0 }, ...recordedSessionData ]
  }

  _calcXTickSize = (secondsElapsed) => {
    // x-axis (time elapsed) tick-size is determined by
    // the duration of the cardio session in minutes.
    // Break-points at 5, 15, 30, 60 and 60+ minutes
    // decide how many minutes each tick on the x-axis mark.
    // 0m < minutesElapsed < 5m -> 60 second ticks (1min)
    if (secondsElapsed <= 300)
      return 60
    // 5m < minutesElapsed < 15m -> 60 second ticks (2min)
    else if (secondsElapsed <= 900)
      return 120
    // 15m < minutesElapsed < 30m -> 300 second ticks (5min)
    else if (secondsElapsed <= 1800)
      return 300
    // 30m < minutesElapsed < 60m -> 900 second ticks (15min)
    else if (secondsElapsed <= 3600)
      return 900
    // 60m < minutesElapsed < 60m+ -> 1900 second ticks (30mins)
    return 1800
  }

  render() {
    const { cardioLog, cardioPreset } = this.props

    if (!cardioLog || !cardioPreset) {
      return <LoadingDialog />
    }

    const {
      timestamp,
      exercise,
      distanceMetric,
      secondsElapsed,
      recordedSession,
      botConfigurations,
      botIntervals
    } = cardioLog

    const {
      distance,
      intervalDistance
    } = cardioPreset

    const headerInfo = this._getHeaderInfo(timestamp, secondsElapsed)
    const graphData = this._getGraphData(recordedSession || [])
    const xTickSize = this._calcXTickSize(secondsElapsed)

    // Filter viewable guest/bot intervals
    // for each guest's intervals, filter out the intervals that have occurred already...
    // i.e. the interval's x value (secondsElapsed) is less than or equal to the session's
    // seconds elapsed...
    const viewableBotIntervals = mapValues(botIntervals, singleBotIntervals =>
      filter(singleBotIntervals, datum => secondsElapsed >= datum.x))

    // parse guest graph data by mapping over the guests (guest keys) and
    // pulling together the guests' viewable (filtered) intervals and configs
    const botGraphData = {}; map(botConfigurations, (config, key) => botGraphData[key] = {
      intervals: parseGraphData(viewableBotIntervals[key]),
      config
    })

    const exerciseText = _.startCase(_.toLower(exercise))
    const distanceText = `${distance}${_.toLower(distanceMetric)}`

    const tickValues = {
      x: _.range(0, secondsElapsed+xTickSize, xTickSize),
      y: _.range(0, distance+1, intervalDistance)
    }

    const tickFormats = {
      x: (tick) => secondsToDigitString(tick),
      y: (tick) => `${tick}${_.toLower(distanceMetric)}`
    }

    const domain = { x: [0, secondsElapsed], y: [0, distance] }

    return (
      <ViewContainer>
        <InfoHeader
          info={headerInfo}
        />
        <ScrollView>
          <Section
            titleIcon={<Icon name={icons.GRAPH} size={12.5} />}
            titleText={strings.CARDIO_GRAPH_SECTION}>
            <IntervalsGraph
              data={graphData}
              guestData={botGraphData}
              domain={domain}
              tickValues={tickValues}
              tickFormats={tickFormats}
            />
          </Section>
          <Section
            titleIcon={<Icon name={icons.LIST} size={12.5} />}
            titleText={strings.SESSION_INFO_SECTION}>
            <TextInput
              editable={false}
              label={strings.EXERCISE_LABEL}
              value={exerciseText}
            />
            <TextInput
              editable={false}
              label={strings.DISTANCE_LABEL}
              value={distanceText}
            />
          </Section>
        </ScrollView>
      </ViewContainer>
    )
  }
}

CardioLog.propTypes = {
  cardioLog: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    _PresetId: PropTypes.string,
    presetTitle: PropTypes.string,
    exercise: PropTypes.string.isRequired,
    distance: PropTypes.number.isRequired,
    timestamp: PropTypes.number.isRequired,
    secondsElapsed: PropTypes.number.isRequired,
    recordedSession: PropTypes.array,
    sessionConfiguration: PropTypes.object,
    sessionBots: PropTypes.array
  })
}

const mapStateToProps = (state, ownProps) => {
  const cardioLog = state.cardioLogs.cardioLogs[ownProps._id]
  if (cardioLog) {
    const cardioPreset = state.cardioPresets.cardioPresets[cardioLog._presetId]
    return {
      cardioLog,
      cardioPreset
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: {
    fetchCardioPresets: () => dispatch(fetchCardioPresets()),
    removeCardioLog: (_cardioLogId) => dispatch(removeCardioLog(_cardioLogId))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardioLog)