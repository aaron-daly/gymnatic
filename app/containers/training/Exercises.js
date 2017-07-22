import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Actions as routerActions } from 'react-native-router-flux'

import {
  ViewContainer,
  LoadingDialog,
  ErrorDialog,
  SearchBar
} from '../../components/common'
import ExerciseList from '../../components/exerciseList/ExerciseList'
import { fetchExercises } from '../../actions/ExercisesActions'
import { addExercise } from '../../actions/CreateWorkoutActions'
import * as routes from '../../constants/routes'

class Exercises extends Component {

  constructor(props) {
    super(props)
    this.state = {
      filteredExercises: null
    }
  }

  componentDidMount() {
    const { isFetching, exercises } = this.props.exercises
    if (!isFetching && !Object.keys(exercises).length) {
      this.props.actions.fetchExercises()
    }
  }

  _handleSearchResults = (results) => {
    const filteredExercises = this._sortExercises(results)
    this.setState({ filteredExercises })
  }

  _sortExercises = (exercises) => {
    return exercises.sort((a, b) => {
      return a.name > b.name
    })
  }

  _getViewableExercises = (exercises) => {
    return this.state.filteredExercises ||
      this._sortExercises(Object.values(exercises))
  }

  _onExercisePress = (_id) => {
    this.props.actions.addExercise(_id)
    routerActions.pop()
  }

  _onExerciseAvatarPress = (_id) => {
  }

  render() {
    const {
      isFetching,
      exercises,
      error
    } = this.props.exercises

    if (isFetching) {
      return <LoadingDialog />
    }

    if (error) {
      return <ErrorDialog text={error.message} />
    }

    const viewableExercises = this._getViewableExercises(exercises)

    return (
      <ViewContainer>
        <SearchBar
          data={exercises}
          handleResults={this._handleSearchResults}
        />
        <ExerciseList
          exercises={viewableExercises}
          onExercisePress={this._onExercisePress}
          onAvatarPress={this._onExerciseAvatarPress}
        />
      </ViewContainer>
    )
  }
}

Exercises.propTypes = {
  exercises: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    exercises: PropTypes.object.isRequired,
    error: PropTypes.object
  })
}

const mapStateToProps = (state) => ({
  exercises: state.exercises
})

const mapDispatchToProps = (dispatch) => ({
  actions: {
    fetchExercises: () => dispatch(fetchExercises()),
    addExercise: (_exerciseId) => dispatch(addExercise(_exerciseId))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Exercises)
