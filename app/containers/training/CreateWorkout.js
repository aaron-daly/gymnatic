import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import { Actions as routerActions } from 'react-native-router-flux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert
} from 'react-native'
import {
  ViewContainer,
  TextInput,
  PickerInput,
  Label,
  Section
} from '../../components/common'
import ConfigurableExerciseRow from '../../components/createWorkout/ConfigurationExerciseRow'
import * as createWorkoutActions from '../../actions/CreateWorkoutActions'
import { fetchExercises } from '../../actions/ExercisesActions'
import { addCustomWorkout } from '../../actions/CustomWorkoutsActions'
import * as strings from '../../constants/strings/createWorkout'
import * as routes from '../../constants/routes'
import * as icons from '../../constants/icons'
import colors from '../../constants/colors'

const styles = StyleSheet.create({
  exerciseListContainer: {
    backgroundColor: colors.white,
    marginBottom: 50
  },
  addExerciseButton: {
    height: 50,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.bordergrey
  },
  addExerciseIcon: {
    marginRight: 5,
    fontSize: 16.5,
    color: colors.blue
  },
  addExerciseText: {
    color: colors.blue,
    fontSize: 16
  }
})

class CreateWorkout extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    routerActions.refresh({
      hideBackImage: true,
      backTitle: strings.CANCEL_BUTTON,
      rightTitle: strings.SAVE_BUTTON,
      onBack: this._onCancelPress,
      onRight: this._onSaveWorkoutPress
    })
    if (Object.keys(this.props.exercises).length === 0) {
      this.props.actions.fetchExercises()
    }
  }

  _onCancelPress = () => {
    this.props.actions.reset()
    routerActions.pop()
  }

  _calculateSessionPoints = (session) => {
    return session.reduce((sessionAcc, exercise) => {
      return sessionAcc + exercise.sets.length * 50
    }, 0)
  }

  _onFieldValueChange = (key, value) => {
    this.props.actions.setValue(key, value)
  }

  _onAddExercisePress = () => {
    routerActions[routes.EXERCISES]()
  }

  _onRemoveExercisePress = (exerciseIndex) => {
    Alert.alert(
      strings.REMOVE_EXERCISE_ALERT,
      '',
      [
        { text: strings.REMOVE_EXERCISE_CANCEL },
        {
          text: strings.REMOVE_EXERCISE_CONFIRM,
          onPress: () => this.props.actions.removeExercise(exerciseIndex)
        }
      ]
    )
  }

  _onAddSetPress = (exerciseIndex) => {
    this.props.actions.addExerciseSet(exerciseIndex)
  }

  _onRemoveSetPress = (exerciseIndex, setIndex) => {
    this.props.actions.removeExerciseSet(exerciseIndex, setIndex)
  }

  _onSetValueChange = (exerciseIndex, setIndex, key, value) => {
    this.props.actions.setExerciseSetValue(exerciseIndex, setIndex, key, value)
  }

  _showErrorAlert = (message) => {
    Alert.alert(
      'Submission Error',
      message,
      [{ text: 'Close' }]
    )
  }

  _onSaveWorkoutPress = () => {
    const {
      title,
      category,
      description,
      session
    } = this.props.createWorkoutForm

    if (!title || title === '') {
      return this._showErrorAlert('Please specify a title for the workout.')
    }

    if (!category || category === '') {
      return this._showErrorAlert('Please specify a workout category.')
    }

    if (!session || !session.length) {
      return this._showErrorAlert('Custom workouts require at least one exercise.')
    }

    let sessionError = null
    session.map((exercise) => {
      if (!exercise.sets.length) {
        sessionError = 'Exercises must contain at least one set.'
      } else {
        exercise.sets.map((set) => {
          if (!set.reps) {
            sessionError = 'All sets must contain a reps value greater than zero.'
          }
        })
      }
    })

    if (sessionError) {
      return this._showErrorAlert(sessionError)
    }

    const points = this._calculateSessionPoints(session)

    const customWorkout = {
      title,
      category,
      description,
      session,
      points,
      lastModified: + new Date()
    }

    this.props.actions.addCustomWorkout(customWorkout)
  }

  render() {
    const { createWorkoutForm, exercises } = this.props
    const { title, category, session } = createWorkoutForm

    const configurableExerciseRowNodes = session.map((exercise, i) => {
      const {_exerciseId} = exercise
      const exerciseData = exercises[_exerciseId]
      return (
        <ConfigurableExerciseRow
          key={i}
          {...exercise}
          {...exerciseData}
          exerciseIndex={i}
          onAddSetPress={this._onAddSetPress}
          onRemoveSetPress={this._onRemoveSetPress}
          onRemoveExercisePress={this._onRemoveExercisePress}
          onSetValueChange={this._onSetValueChange}
        />
      )
    })

    return (
      <ViewContainer>
        <KeyboardAwareScrollView>
          <ScrollView style={{flex: 1}}>
            <Section
              titleText={'DETAILS'}>
              <TextInput
                label={strings.TITLE_LABEL}
                placeholder={strings.TITLE_PLACEHOLDER}
                onChangeText={(value) => this._onFieldValueChange('title', value)}
              />
              <PickerInput
                label={strings.CATEGORY_LABEL}
                placeholder={strings.CATEGORY_PLACEHOLDER}
                options={strings.CATEGORY_OPTIONS}
                onValueChange={(value) => this._onFieldValueChange('category', value)}
              />
              <TextInput
                label={strings.DESCRIPTION_LABEL}
                placeholder={strings.DESCRIPTION_PLACEHOLDER}
                onChangeText={(value) => this._onFieldValueChange('description', value)}
              />
            </Section>
            <Label label={strings.EXERCISES_LABEL} />
            <View style={styles.exerciseListContainer}>
              {configurableExerciseRowNodes}
              <TouchableOpacity
                activeOpacity={0.66}
                style={styles.addExerciseButton}
                onPress={this._onAddExercisePress}>
                <Icon style={styles.addExerciseIcon} name={icons.PLUS} />
                <Text style={styles.addExerciseText}>
                  {strings.ADD_EXERCISE_BUTTON}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
      </ViewContainer>
    )
  }
}

const mapStateToProps = (state) => ({
  createWorkoutForm: state.createWorkoutForm,
  exercises: state.exercises.exercises
})

const mapDispatchToProps = (dispatch) => ({
  actions: {
    ...bindActionCreators(createWorkoutActions, dispatch),
    fetchExercises: () => dispatch(fetchExercises()),
    addCustomWorkout: (customWorkout) => dispatch(addCustomWorkout(customWorkout))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateWorkout)
