import React, { Component } from 'react'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/SimpleLineIcons'

import { SectionCard } from '../../components/common'
import CardioSessionConfigInput from '../../components/cardioPreset/CardioSessionConfigInput'
import { updateSessionConfiguration } from '../../actions/CardioSessionActions'
import { parseNumericValue, parseNumericInput } from '../../utils/InputParsers'
import * as strings from '../../constants/strings/cardio'
import * as icons from '../../constants/icons'

class CardioSessionConfig extends Component {

  componentDidMount() {
    const defaultConfiguration = this.props.defaultConfiguration
    this.props.setDefaultConfiguration(defaultConfiguration)
  }

  render() {
    const { defaultConfiguration, onValueChange } = this.props
    return (
      <SectionCard
        titleIcon={<Icon name={icons.CONFIGURE} size={14} />}
        titleText={strings.CONFIGURATION_SECTION_TITLE}>
        <CardioSessionConfigInput
          label={'Tick duration'}
          info={'Tick duration is how long each time interval will be on the session graph.'}
          defaultValue={parseNumericValue(defaultConfiguration.tickSize)}
          onValueChange={(value) => onValueChange('tickSize', parseNumericInput(value))}
        />
        <CardioSessionConfigInput
          maxLength={1}
          label={'Number of ticks'}
          info={'Number of ticks is how how many time intervals should be shown on the graph at any one time. Change this value changes the zoom of the session graph.'}
          defaultValue={parseNumericValue(defaultConfiguration.numViewableTicks)}
          onValueChange={(value) => onValueChange('numViewableTicks', parseNumericValue(value))}
        />
      </SectionCard>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  defaultConfiguration: state.cardioPresets.cardioPresets[ownProps._cardioPresetId].defaultConfiguration || {}
})

const mapDispatchToProps = (dispatch) => ({
  setDefaultConfiguration: (defaultConfiguration) => dispatch(updateSessionConfiguration(defaultConfiguration)),
  onValueChange: (key, value) => dispatch(updateSessionConfiguration({ [key]: value }))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardioSessionConfig)