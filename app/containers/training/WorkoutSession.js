import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Alert, StatusBar } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { LoadingDialog } from '../../components/common'
import SessionHeader from '../../components/workoutSession/SessionHeader'
import WorkoutSessionExercise from '../../components/workoutSession/WorkoutSessionExercise'
import WorkoutSessionScroll from '../../components/workoutSession/WorkoutSessionScroll'
import WorkoutSessionForm from '../../components/workoutSession/WorkoutSessionForm'
import WorkoutSessionInfo from '../../components/workoutSession/WorkoutSessionInfo'
import {
  constructSession,
  togglePauseSession,
  incrementSecondsElapsed,
  incrementSet,
  decrementSet,
  updateSetValues
} from '../../actions/WorkoutSessionActions'
import { addWorkoutLog } from '../../actions/WorkoutLogsActions'
import { fetchExercises } from '../../actions/ExercisesActions'
import * as strings from '../../constants/strings/workouts'
import colors from '../../constants/colors'

class WorkoutSession extends Component {

  constructor(props) {
    super(props)

  }

  componentWillMount() {
    this.props.actions.constructSession(this.props.workout.session)
    this.timerInterval = setInterval(this._incrementSecondsElapsed, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval)
  }

  _incrementSecondsElapsed = () => {
    if (!this.props.workoutSession.isPaused) {
      return this.props.actions.incrementSecondsElapsed()
    }
  }

  _onFinishConfirm = () => {
    const { workout, workoutSession, weightMetric } = this.props
    const { secondsElapsed, recordedSession } = workoutSession
    this.props.actions.addWorkoutLog({
      timestamp: + new Date(),
      _workoutId: workout._id,
      workoutName: workout.title,
      recordedSession,
      secondsElapsed,
      weightMetric
    })
  }

  _onFinishPress = () => {
    this._togglePause()
    Alert.alert(
      strings.FINISH_SESSION_ALERT_TITLE,
      strings.FINISH_SESSION_ALERT_BODY,
      [
        {
          text: strings.FINISH_SESSION_ALERT_CANCEL,
          onPress: this._togglePause
        },
        {
          text: strings.FINISH_SESSION_ALERT_CONFIRM,
          onPress: this._onFinishConfirm
        }
      ]
    )
  }

  _togglePause = () => {
    this.props.actions.togglePauseSession()
  }

  _onPausePress = () => {
    this._togglePause()
    Alert.alert(
      strings.PAUSE_SESSION_ALERT_TITLE,
      strings.PAUSE_SESSION_ALERT_BODY,
      [
        {
          text: strings.PAUSE_SESSION_ALERT_RESUME,
          onPress: this._togglePause
        }
      ]
    )
  }

  _onPrevSetPress = () => {
    this.props.actions.decrementSet()
  }

  _onNextSetPress = () => {
    this.props.actions.incrementSet()
  }

  _onSetInputChange = (name, value) => {
    const { exerciseIndex, setIndex } = this.props.workoutSession
    this.props.actions.updateSetValues(exerciseIndex, setIndex, {
        [name]: parseInt(value),
        timestamp: +new Date()
    })
  }

  render() {
    const {
      workout,
      workoutSession,
      exercises,
      weightMetric
    } = this.props

    const {
      recordedSession,
      exerciseIndex,
      setIndex,
      secondsElapsed
    } = workoutSession

    if (!recordedSession.length) {
      return <LoadingDialog backgroundColor={colors.darknavy} />
    }

    // current exercise
    const currentExerciseId = recordedSession[exerciseIndex]._exerciseId
    const currentExercise = exercises[currentExerciseId]

    // check if scroll buttons are disabled
    const scrollPrevDisabled = exerciseIndex === 0 && setIndex === 0
    const scrollNextDisabled = exerciseIndex === recordedSession.length-1 &&
                               setIndex === recordedSession[exerciseIndex].sets.length-1

    // current set and input values
    const currentSetValues = recordedSession[exerciseIndex].sets[setIndex]
    const repsInputText = `${currentSetValues.recordedReps || 0}`
    const weightInputText = `${currentSetValues.recordedWeight || 0}`

    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{ flex: 1, backgroundColor: colors.darknavy }}
        scrollEnabled={false}>
        <StatusBar hidden />
        <SessionHeader
          titleText={workout.title}
          onPausePress={this._onPausePress}
          onStopPress={this._onFinishPress}
        />
        <WorkoutSessionExercise
          {...currentExercise}
          set={setIndex+1}
          reps={currentSetValues.reps}
        />
        <WorkoutSessionScroll
          onPrevPress={this._onPrevSetPress}
          onNextPress={this._onNextSetPress}
          prevDisabled={scrollPrevDisabled}
          nextDisabled={scrollNextDisabled}
        />
        <WorkoutSessionForm
          weightMetric={weightMetric}
          reps={repsInputText}
          weight={weightInputText}
          onRepsChange={value => this._onSetInputChange('recordedReps', value)}
          onWeightChange={value => this._onSetInputChange('recordedWeight', value)}
        />
        <WorkoutSessionInfo
          secondsElapsed={secondsElapsed}
        />
      </KeyboardAwareScrollView>
    )
  }
}

WorkoutSession.propTypes = {
  workout: PropTypes.shape({
    title: PropTypes.string.isRequired,
    session: PropTypes.arrayOf(PropTypes.shape({
      _exerciseId: PropTypes.string.isRequired,
      sets: PropTypes.array.isRequired
    })).isRequired
  }).isRequired,
  workoutSession: PropTypes.shape({
    isPaused: PropTypes.bool.isRequired,
    secondsElapsed: PropTypes.number.isRequired,
    recordedSession: PropTypes.array.isRequired
  }),
  exercises: PropTypes.object.isRequired,
  weightMetric: PropTypes.string.isRequired
}

const workoutSelector = (state, { isCustom, _workoutId }) => {
  if (isCustom) {
    return state.customWorkouts.customWorkouts[_workoutId]
  }
  return state.workouts.workouts[_workoutId]
}

const mapStateToProps = (state, ownProps) => ({
  workout: workoutSelector(state, ownProps),
  workoutSession: state.workoutSession,
  exercises: state.exercises.exercises,
  weightMetric: state.configuration.configuration.weightMetric
})

const mapDispatchToProps = dispatch => ({
  actions: {
    constructSession: (session) => dispatch(constructSession(session)),
    togglePauseSession: () => dispatch(togglePauseSession()),
    incrementSecondsElapsed: () => dispatch(incrementSecondsElapsed()),
    incrementSet: () => dispatch(incrementSet()),
    decrementSet: () => dispatch(decrementSet()),
    updateSetValues: (exerciseIndex, setIndex, values) =>
      dispatch(updateSetValues(exerciseIndex, setIndex, values)),
    fetchExercises: () => dispatch(fetchExercises()),
    addWorkoutLog: (workoutLog) => dispatch(addWorkoutLog(workoutLog))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkoutSession)
