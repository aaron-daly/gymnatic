import React, { Component } from 'react'
import { connect } from 'react-redux'

import PieSection from '../../components/charts/PieSection'
import { cardioProportionsSelector } from '../../selectors/cardioProportionsSelector'
import { fetchAggregatedCardioTimes } from '../../actions/AggregatedCardioTimesActions'

export class CardioProportions extends Component {
  componentDidMount() {
    if (!this.props.proportions.length) {
      this.props.fetchAggregatedCardioTimes()
    }
  }

  render() {
    return (
      <PieSection
        sectionTitle={'EXERCISE PROPORTIONS'}
        data={this.props.proportions}
      />
    )
  }
}

const mapStateToProps = state => ({
  proportions: cardioProportionsSelector(state)
})

const mapDispatchToProps = dispatch => ({
  fetchAggregatedCardioTimes: () => dispatch(fetchAggregatedCardioTimes())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardioProportions)