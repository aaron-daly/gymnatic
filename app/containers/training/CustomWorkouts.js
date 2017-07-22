import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Actions as routerActions } from 'react-native-router-flux'

import { LoadingDialog, ErrorDialog, InfoDialog, OptionsMenu } from '../../components/common'
import WorkoutList from '../../components/workoutList/WorkoutList'
import { fetchCustomWorkouts } from '../../actions/CustomWorkoutsActions'
import * as strings from '../../constants/strings/workouts'
import * as routes from '../../constants/routes'

class CustomWorkouts extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { isFetching, customWorkouts } = this.props.customWorkouts

    if (!isFetching && !Object.keys(customWorkouts).length) {
      this.props.actions.fetchCustomWorkouts()
    }

    const menuOptions = [
      {
        label: 'New Workout',
        onPress: routerActions[routes.CREATE_WORKOUT]
      }
    ]

    routerActions.refresh({
      renderRightButton: () => <OptionsMenu options={menuOptions} />
    })
  }

  _onWorkoutPress = (_id) => {
    return routerActions[routes.WORKOUT]({ _id, isCustom: true })
  }

  render() {
    const {
      error,
      customWorkouts,
      isFetching
    } = this.props.customWorkouts

    if (isFetching) {
      return <LoadingDialog />
    }

    if (error) {
      return <ErrorDialog text={error.message} />
    }

    if (!Object.keys(customWorkouts).length) {
      return <InfoDialog text={strings.NO_CUSTOM_WORKOUTS_FOUND} />
    }

    return (
      <WorkoutList
        workouts={Object.values(customWorkouts)}
        onWorkoutPress={this._onWorkoutPress}
      />
    )
  }
}

CustomWorkouts.propTypes = {
  customWorkouts: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    customWorkouts: PropTypes.object.isRequired,
    error: PropTypes.object
  })
}

const mapStateToProps = (state) => ({
  customWorkouts: state.customWorkouts
})

const mapDispatchToProps = (dispatch) => ({
  actions: {
    fetchCustomWorkouts: () => dispatch(fetchCustomWorkouts())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomWorkouts)