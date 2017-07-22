import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons'

import { PickerInput, TextInput } from '../../components/common'
import { removeBot, updateBotType, updateBotConfiguration } from '../../actions/CardioSessionActions'
import { parseNumericValue, parseNumericInput } from '../../utils/InputParsers'
import * as cardioBotTypes from '../../constants/cardioBotTypes'

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(0,0,0,0.12)'
  },
  header: {
    marginLeft: 15,
    paddingRight: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0,0,0,0.06)'
  },
  headerText: {
    fontSize: 14,
    fontWeight: '500'
  },
  inputLabel: {
    color: 'rgba(0,0,0,0.4)'
  },
  inputContainer: {
    borderBottomWidth: 0
  }
})

const cardioBotOptions = {
  [cardioBotTypes.LINEAR]: 'Linear',
  [cardioBotTypes.GRADIENT]: 'Gradient'
}

const gradientBotOptions = {
  '-0.50': '-50%',
  '-0.30': '-30%',
  '-0.20': '-20%',
  '-0.10': '-10%',
  '-0.05': '-5%',
  '0.05': '5%',
  '0.10': '10%',
  '0.15': '15%',
  '0.20': '20%',
  '0.30': '30%',
  '0.50': '50%',
}

class CardioSessionBotConfig extends Component {

  render() {
    const {
      botConfiguration,
      removeBot,
      updateBotType,
      updateConfigValue
    } = this.props

    const { botType, name, color, velocity, gradient } = botConfiguration
    const headerTextStyles = [styles.headerText, { color }]

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={headerTextStyles}>
            {name}
            </Text>
          <Icon
            style={{ padding: 5 }}
            size={12}
            name={'close'}
            color={'rgba(0,0,0,0.5)'}
            onPress={removeBot}
          />
        </View>
        <View>
          <PickerInput
            size={14}
            label={'Bot Type'}
            initValue={'Linear'}
            labelStyle={styles.inputLabel}
            containerStyle={styles.inputContainer}
            options={cardioBotOptions}
            onValueChange={value => updateBotType(value)}
          />
          <TextInput
            size={14}
            maxLength={3}
            keyboardType={'decimal-pad'}
            label={'Average Speed (m/s)'}
            labelStyle={styles.inputLabel}
            containerStyle={styles.inputContainer}
            defaultValue={parseNumericValue(velocity)}
            onChangeText={value => updateConfigValue('velocity', parseNumericInput(value))}
          />
          {botType === cardioBotTypes.GRADIENT &&
            <PickerInput
              size={14}
              label={'Speed Increase (%)'}
              initValue={'5%'}
              labelStyle={styles.inputLabel}
              containerStyle={styles.inputContainer}
              options={gradientBotOptions}
              onValueChange={value => updateConfigValue('gradient', parseFloat(value))}
            />
          }
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  botConfiguration: state.cardioSession.botConfigurations[ownProps.botKey]
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  removeBot: () => dispatch(removeBot(ownProps.botKey)),
  updateBotType: (botType) => dispatch(updateBotType(ownProps.botKey, botType)),
  updateConfigValue: (key, value) => dispatch(updateBotConfiguration(ownProps.botKey, { [key]: value }))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardioSessionBotConfig)