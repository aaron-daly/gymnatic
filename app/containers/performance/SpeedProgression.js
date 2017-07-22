import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { map, minBy, maxBy } from 'lodash'
import moment from 'moment'
import { SegmentedControls } from 'react-native-radio-buttons'

import { Section, PickerInput, LoadingIndicator } from '../../components/common'
import { ProgressLine } from '../../components/charts'
import { fetchCardioPresets } from '../../actions/CardioPresetsActions'

import {
  fetchAggregatedSpeeds,
  updateSpeedsFilter,
  updateSpeedsVisibilityFilter
} from '../../actions/AggregatedSpeedsActions'

import {
  speedImprovementDataSelector,
  cardioPresetsSelector,
  selectedPresetSelector,
  VISIBILITY_OPTIONS
} from '../../selectors/speedsSelectors'

import colors from '../../constants/colors'

class SpeedProgression extends Component {

  componentDidMount() {
    const { isFetching, data, cardioPresets } = this.props
    if (!isFetching && !data.length) {
      this.props.fetchAggregatedSpeeds()
    }
    if (!Object.keys(cardioPresets).length) {
      this.props.fetchCardioPresets()
    }
  }

  _formatTimestamp = timestamp => moment.unix(timestamp/1000).format('DD/MM/YY')
  _formatSpeed = (speed) => speed.toFixed(2)
  _formatPointLabel = datum => datum.averageSpeed.toFixed(2)

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
    const minSpeed = minBy(data, 'averageSpeed').averageSpeed
    const maxSpeed = maxBy(data, 'averageSpeed').averageSpeed
    const yDomain = [minSpeed, maxSpeed]

    return (
      <ProgressLine
        data={data}
        x={'timestamp'}
        y={'averageSpeed'}
        domain={{ y: yDomain }}
        domainPadding={{ x: 20, y: 10 }}
        tickValues={{ x: xTickValues }}
        tickFormat={{ x: this._formatTimestamp, y: this._formatSpeed }}
        labelFormat={this._formatPointLabel}
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
        label={'Preset'}
        options={options}
        initValue={initValue}
        onValueChange={onValueChange}
      />
    )
  }

  render() {
    const {
      isFetching,
      selectedPreset,
      numSpeedsToShow,
      cardioPresets,
      data
    } = this.props

    const pickerNodes = this._renderPickerNodes(cardioPresets, selectedPreset, this.props.updateFilter)
    const filterNodes = this._renderFilterNodes(numSpeedsToShow, this.props.updateVisibilityFilter)
    const graphNodes = this._renderGraphNodes(isFetching, data)

    return (
      <Section titleText={'SPEED PROGRESSION (m/s)'}>
        {pickerNodes}
        {filterNodes}
        {graphNodes}
      </Section>
    )
  }
}

const mapStateToProps = state => ({
  isFetching: state.aggregatedSpeeds.isFetching,
  numSpeedsToShow: state.aggregatedSpeeds.visibilityFilter,
  cardioPresets: cardioPresetsSelector(state),
  selectedPreset: selectedPresetSelector(state),
  data: speedImprovementDataSelector(state)
})

const mapDispatchToProps = dispatch => ({
  fetchAggregatedSpeeds: () => dispatch(fetchAggregatedSpeeds()),
  updateFilter: (presetId) => dispatch(updateSpeedsFilter(presetId)),
  updateVisibilityFilter: (numViewableSpeeds) => dispatch(updateSpeedsVisibilityFilter(numViewableSpeeds)),
  fetchCardioPresets: () => dispatch(fetchCardioPresets())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpeedProgression)