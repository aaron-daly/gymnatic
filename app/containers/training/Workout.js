import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Actions as routerActions } from 'react-native-router-flux'
import _ from 'lodash'
import { ScrollView, View, Alert } from 'react-native'

import { ViewContainer, LoadingDialog, BlockButton, Section, OptionsMenu } from '../../components/common'
import InfoHeader from '../../components/common/InfoHeader'
import WorkoutExerciseList from '../../components/workout/WorkoutExerciseList'
import { removeCustomWorkout } from '../../actions/CustomWorkoutsActions'
import { fetchExercises } from '../../actions/ExercisesActions'
import { secondsToString } from '../../utils/TimeParsers'
import * as routes from '../../constants/routes'
import * as strings from '../../constants/strings/workouts'
import colors from '../../constants/colors'

class Workout extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {
      exercises,
      workout,
      isCustom,
      actions
    } = this.props

    if (!Object.keys(exercises).length) {
      actions.fetchExercises()
    }

    const menuOptions = [
      {
        label: 'Remove',
        onPress: this._onRemovePress
      }
    ]

    const renderOptionsMenu = () => <OptionsMenu options={menuOptions} />

    routerActions.refresh({
      title: workout.title,
      renderRightButton: isCustom ? renderOptionsMenu : null
    })
  }

  _onRemovePress = () => {
    this.props.actions.removeCustomWorkout(this.props.workout._id)
  }

  _onStartWorkoutConfirm = () => {
    const { isCustom, _id } = this.props
    return routerActions[routes.WORKOUT_SESSION]({ isCustom, _workoutId: _id })
  }

  _onStartWorkoutPress = () => {
    Alert.alert(
      strings.START_SESSION_ALERT_TITLE,
      strings.START_SESSION_ALERT_BODY,
      [
        {
          text: strings.START_SESSION_ALERT_CANCEL
        },
        {
          text: strings.START_SESSION_ALERT_CONFIRM,
          onPress: this._onStartWorkoutConfirm
        }
      ]
    )
  }

  render() {
    const { workout, exercises } = this.props

    if (!workout) {
      return <LoadingDialog />
    }

    const { duration, category, session } = workout

    const categoryText = _.startCase(_.toLower(category))
    const durationText = secondsToString(duration || 0)
    const headerInfo = [
      category && { label: strings.CATEGORY_LABEL, value: categoryText, color: colors.pink },
      duration && { label: strings.DURATION_LABEL, value: durationText, color: colors.blue }
    ].filter(Boolean)

    // bind exercise information to the workout exercises
    const workoutExercises = session.map(workoutExercise => ({
      ...workoutExercise,
      ...exercises[workoutExercise._exerciseId]
    }))

    return (
      <ViewContainer>
        <InfoHeader info={headerInfo} />
        <ScrollView>
          <WorkoutExerciseList
            exercises={workoutExercises}
          />
          <View style={{ height: 45 }} />
        </ScrollView>
        <BlockButton
          title={strings.START_SESSION_BUTTON}
          onPress={this._onStartWorkoutPress}
        />
      </ViewContainer>
    )
  }
}

Workout.propTypes = {
  workout: PropTypes.object,
  exercises: PropTypes.object.isRequired
}

const workoutSelector = (state, { isCustom, _id }) => {
  if (isCustom) {
    return state.customWorkouts.customWorkouts[_id]
  }
  return state.workouts.workouts[_id]
}

const mapStateToProps = (state, ownProps) => ({
  workout: workoutSelector(state, ownProps),
  exercises: state.exercises.exercises
})

const mapDispatchToProps = (dispatch) => ({
  actions: {
    fetchExercises: () => dispatch(fetchExercises()),
    removeCustomWorkout: (_id) => dispatch(removeCustomWorkout(_id))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Workout)
