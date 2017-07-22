import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Actions as routerActions } from 'react-native-router-flux'
import moment from 'moment'

import {
  ViewContainer,
  InfoHeader,
  LoadingDialog,
  Section,
  OptionsMenu
} from '../../components/common'

import LoggedExerciseList from '../../components/workoutLog/LoggedExerciseList'
import { fetchExercises } from '../../actions/ExercisesActions'
import { removeWorkoutLog } from '../../actions/WorkoutLogsActions'
import { secondsToString } from '../../utils/TimeParsers'
import * as strings from '../../constants/strings/diary'

class WorkoutLog extends Component {

  componentDidMount() {
    const { workoutLog, exercises } = this.props

    if (!Object.keys(exercises).length) {
      this.props.actions.fetchExercises()
    }

    const { workoutName } = workoutLog
    const menuOptions = [
      {
        label: 'Remove',
        onPress: this._onRemovePress
      }
    ]

    routerActions.refresh({
      title: workoutName,
      renderRightButton: () => <OptionsMenu options={menuOptions} />
    })
  }

  _onRemovePress = () => {
    this.props.actions.removeWorkoutLog(this.props.workoutLog._id)
  }

  render() {
    const { exercises, workoutLog } = this.props

    if (!Object.keys(exercises).length || !workoutLog) {
      return <LoadingDialog />
    }

    const {
      timestamp,
      secondsElapsed,
      recordedSession,
      weightMetric
    } = workoutLog

    const durationText = secondsToString(secondsElapsed)
    const dateText = moment(timestamp).format(strings.DATE_SHORT_FORMAT)
    const timeText = moment(timestamp).format(strings.TIME_FORMAT)

    const headerInfo = [
      { label: strings.DATE_LABEL, value: dateText, color: 'rgba(255,255,255,0.6)' },
      { label: strings.TIME_LABEL, value: timeText, color: 'rgba(255,255,255,0.6)' },
      { label: strings.DURATION_LABEL, value: durationText, color: 'rgba(255,255,255,0.6)' }
    ]

    const loggedExercises = recordedSession.map((exercise, i) => ({
      weightMetric,
      ...exercise,
      ...exercises[exercise._exerciseId]
    }))

    return (
      <ViewContainer>
        <InfoHeader info={headerInfo} />
        <Section
          titleText={strings.RECORDINGS_SECTION}>
          <LoggedExerciseList
            loggedExercises={loggedExercises}
          />
        </Section>
      </ViewContainer>
    )
  }
}

WorkoutLog.propTypes = {
  workoutLog: PropTypes.object,
  exercises: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  workoutLog: state.workoutLogs.workoutLogs[ownProps._id],
  exercises: state.exercises.exercises
})

const mapDispatchToProps = (dispatch) => ({
  actions: {
    fetchExercises: () => dispatch(fetchExercises()),
    removeWorkoutLog: (_Id) => dispatch(removeWorkoutLog(_Id))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkoutLog)