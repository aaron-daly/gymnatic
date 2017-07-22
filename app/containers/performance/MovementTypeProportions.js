import React, { Component } from 'react'
import { connect } from 'react-redux'

import PieSection from '../../components/charts/PieSection'
import { movementTypeProportionsSelector } from '../../selectors/movementTypeProportionsSelector'
import { fetchExercises } from '../../actions/ExercisesActions'
import { fetchAggregatedReps } from '../../actions/AggregatedRepsActions'

class MovementTypeProportions extends Component {

  componentDidMount() {
    if (!this.props.proportions.length) {
      this.props.fetchExercises()
      this.props.fetchAggregatedReps()
    }
  }

  render() {
    return (
      <PieSection
        sectionTitle={'MOVEMENT TYPE PROPORTIONS'}
        data={this.props.proportions}
      />
    )
  }
}

const mapStateToProps = state => ({
  proportions: movementTypeProportionsSelector(state)
})


const mapDispatchToProps = dispatch => ({
  fetchExercises: () => dispatch(fetchExercises()),
  fetchAggregatedReps: () => dispatch(fetchAggregatedReps())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovementTypeProportions)