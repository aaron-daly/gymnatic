import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Actions as routerActions } from 'react-native-router-flux'

import { LoadingDialog, ErrorDialog, InfoDialog } from '../../components/common'
import WorkoutList from '../../components/workoutList/WorkoutList'
import { fetchWorkouts } from '../../actions/WorkoutsActions'
import * as strings from '../../constants/strings/workouts'
import * as routes from '../../constants/routes'

class Workouts extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { isFetching, workouts } = this.props.workouts
    if (!isFetching && !Object.keys(workouts).length) {
      this.props.actions.fetchWorkouts()
    }
  }

  _onWorkoutPress = (_id) => {
    return routerActions[routes.WORKOUT]({ _id })
  }

  render() {
    const {
      error,
      workouts,
      isFetching
    } = this.props.workouts

    if (isFetching) {
      return <LoadingDialog />
    }

    if (error) {
      return <ErrorDialog text={error.message} />
    }

    if (!Object.keys(workouts).length) {
      return <InfoDialog text={strings.NO_WORKOUTS_FOUND} />
    }

    return (
      <WorkoutList
        workouts={Object.values(workouts)}
        onWorkoutPress={this._onWorkoutPress}
      />
    )
  }
}

Workouts.propTypes = {
  workouts: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    workouts: PropTypes.object.isRequired,
    error: PropTypes.object
  })
}

const mapStateToProps = (state) => ({
  workouts: state.workouts
})

const mapDispatchToProps = (dispatch) => ({
  actions: {
    fetchWorkouts: () => dispatch(fetchWorkouts())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Workouts)
