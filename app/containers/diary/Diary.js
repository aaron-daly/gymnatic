import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Actions as routerActions } from 'react-native-router-flux'
import _ from 'lodash'
import moment from 'moment'

import {
  ViewContainer,
  LoadingDialog,
  ErrorDialog,
  InfoDialog
} from '../../components/common'
import DiaryList from '../../components/diaryList/DiaryList'
import { fetchWorkoutLogs } from '../../actions/WorkoutLogsActions'
import { fetchCardioLogs } from '../../actions/CardioLogsActions'
import * as strings from '../../constants/strings/diary'
import * as routes from '../../constants/routes'

class Diary extends Component {

  componentDidMount() {
    const { workoutLogs, cardioLogs } = this.props
    if (!workoutLogs.isFetching && !Object.keys(workoutLogs.workoutLogs).length) {
      this.props.actions.fetchWorkoutLogs()
    }    
    if (!cardioLogs.isFetching && !Object.keys(cardioLogs.cardioLogs).length) {
      this.props.actions.fetchCardioLogs()
    }
  }

  _onLogPress = (_id, type) => {
    // if the log contains a workoutId it is a workout log,
    // else it is a cardio log.
    if (type === strings.TYPE_WORKOUT) {
      routerActions[routes.WORKOUT_LOG]({ _id })
    } else {
      routerActions[routes.CARDIO_LOG]({ _id })
    }
  }

  _getLogDate = (log) => {
    return moment(log.timestamp).startOf('day').format()
  }

  _groupLogDate = (logs, date) => {
    const sortedLogs = _.sortBy(logs, 'timestamp').reverse()
    return { date, logs: sortedLogs }
  }

  _groupLogsByDate = (logs) => {
    return _.chain(logs)
      .groupBy(this._getLogDate)
      .map(this._groupLogDate)
      .sortBy('date')
      .value()
      .reverse()
  }

  render() {
    const { workoutLogs, cardioLogs } = this.props
    const isFetching = workoutLogs.isFetching || cardioLogs.isFetching
    const error = workoutLogs.error || cardioLogs.error
    const noData = (!Object.keys(workoutLogs.workoutLogs).length &&
                    !Object.keys(cardioLogs.cardioLogs).length)

    if (isFetching) {
      return <LoadingDialog />
    }

    if (error) {
      return <ErrorDialog text={error.message} />
    }

    if (noData) {
      return <InfoDialog text={strings.NO_LOGS_FOUND} />
    }

    // bind log types to the logs
    const logs = [
      ..._.map(workoutLogs.workoutLogs, (workoutLog) => ({ ...workoutLog, type: strings.TYPE_WORKOUT })),
      ..._.map(cardioLogs.cardioLogs, (cardioLog) => ({ ...cardioLog, type: strings.TYPE_CARDIO }))
    ]

    const logsGroupedByDate = this._groupLogsByDate(logs)

    return (
      <ViewContainer>
        <DiaryList
          logGroups={logsGroupedByDate}
          onLogPress={this._onLogPress}
        />
      </ViewContainer>
    )
  }
}

Diary.propTypes = {
  workoutLogs: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    workoutLogs: PropTypes.object.isRequired,
    error: PropTypes.object
  }),
  configuration: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    configuration: PropTypes.object.isRequired,
    error: PropTypes.object
  })
}

const mapStateToProps = (state) => ({
  workoutLogs: state.workoutLogs,
  cardioLogs: state.cardioLogs,
  configuration: state.configuration
})

const mapDispatchToProps = (dispatch) => ({
  actions: {
    fetchWorkoutLogs: () => dispatch(fetchWorkoutLogs()),
    fetchCardioLogs: () => dispatch(fetchCardioLogs())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Diary)
