import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { map, minBy, maxBy } from 'lodash'
import moment from 'moment'
import { SegmentedControls } from 'react-native-radio-buttons'

import { Section, PickerInput, LoadingIndicator } from '../../components/common'
import { ProgressLine } from '../../components/charts'

import {
  fetchAggregatedMaxLifts,
  updateMaxLiftsFilter,
  updateMaxLiftsVisibilityFilter
} from '../../actions/AggregatedMaxLiftsActions'

import {
  exercisesSelector,
  selectedExerciseSelector,
  exerciseImprovementDataSelector,
  VISIBILITY_OPTIONS
} from '../../selectors/maxLiftsSelectors'

import colors from '../../constants/colors'

class MaxLiftsProgression extends Component {

  componentDidMount() {
    const { isFetching, data } = this.props
    if (!isFetching && !data.length) {
      this.props.fetchAggregatedMaxLifts()
    }
  }

  _renderGraphNodes(isFetching, data) {
    if (isFetching) {
      return (
        <LoadingIndicator style={{ padding: 50 }} />
      )
    }

    if (!data || data.length < 2) {
      return (
        <Text style={{
          alignSelf: 'center',
          textAlign: 'center',
          padding: 50,
          color: 'rgba(0,0,0,0.5)'
        }}>
          You do not have enough recordings for this exercise yet!
        </Text>
      )
    }

    const xTickValues = map(data, 'timestamp')
    const minWeightLifted = minBy(data, 'weight').weight
    const maxWeightLifted = maxBy(data, 'weight').weight
    const yDomain = [minWeightLifted, maxWeightLifted]
    const domainPadding = {x: 20, y: 10}

    return (
      <ProgressLine
        data={data}
        x={'timestamp'}
        y={'weight'}
        domain={{ y: yDomain }}
        domainPadding={domainPadding}
        tickValues={{ x: xTickValues }}
        tickFormat={{ x: tick => moment.unix(tick/1000).format('DD/MM/YY') }}
        labelFormat={datum => `${parseInt(datum.weight)}kg`}
      />
    )
  }

  _renderFilterNodes(selectedOption, onSelection) {
    return (
      <View style={{ paddingHorizontal: 45, paddingTop: 15 }}>
        <SegmentedControls
          tint={colors.blue}
          options={VISIBILITY_OPTIONS}
          extractText={option => option.label}
          selectedOption={selectedOption}
          onSelection={option => onSelection(option.value)}
          testOptionEqual={(selectedValue, option) => selectedValue === option.value}
        />
      </View>
    )
  }

  _renderPickerNodes(options, initValue, onValueChange) {
    return (
      <PickerInput
        label={'Exercise'}
        options={options}
        initValue={initValue}
        onValueChange={onValueChange}
      />
    )
  }

  render() {
    const {
      isFetching,
      selectedExercise,
      numMaxLiftsToShow,
      exercises,
      data
    } = this.props

    const pickerNodes = this._renderPickerNodes(exercises, selectedExercise, this.props.updateSelectedExercise)
    const filterNodes = this._renderFilterNodes(numMaxLiftsToShow, this.props.updateVisibilityFilter)
    const graphNodes = this._renderGraphNodes(isFetching, data)

    return (
      <Section titleText={'1 REP MAX PROGRESSION'}>
        {pickerNodes}
        {filterNodes}
        {graphNodes}
      </Section>
    )
  }
}

const mapStateToProps = state => ({
  isFetching: state.aggregatedMaxLifts.isFetching,
  numMaxLiftsToShow: state.aggregatedMaxLifts.visibilityFilter,
  selectedExercise: selectedExerciseSelector(state),
  data: exerciseImprovementDataSelector(state),
  exercises: exercisesSelector(state)
})

const mapDispatchToProps = dispatch => ({
  fetchAggregatedMaxLifts: () => dispatch(fetchAggregatedMaxLifts()),
  updateSelectedExercise: (selectedExerciseId) => dispatch(updateMaxLiftsFilter(selectedExerciseId)),
  updateVisibilityFilter: (numViewableMaxLifts) => dispatch(updateMaxLiftsVisibilityFilter(numViewableMaxLifts))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MaxLiftsProgression)