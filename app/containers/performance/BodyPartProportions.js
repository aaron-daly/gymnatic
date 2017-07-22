import React, { Component } from 'react'
import { connect } from 'react-redux'

import PieSection from '../../components/charts/PieSection'
import { bodyPartProportionsSelector } from '../../selectors/bodyPartProportionsSelector'
import { fetchExercises } from '../../actions/ExercisesActions'
import { fetchAggregatedReps } from '../../actions/AggregatedRepsActions'

class BodyPartProportions extends Component {

  componentDidMount() {
    if (!this.props.proportions.length) {
      this.props.fetchExercises()
      this.props.fetchAggregatedReps()
    }
  }

  render() {
    return (
      <PieSection
        sectionTitle={'BODY PART PROPORTIONS'}
        data={this.props.proportions}
      />
    )
  }
}

const mapStateToProps = state => ({
  proportions: bodyPartProportionsSelector(state)
})

const mapDispatchToProps = dispatch => ({
  fetchExercises: () => dispatch(fetchExercises()),
  fetchAggregatedReps: () => dispatch(fetchAggregatedReps())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BodyPartProportions)