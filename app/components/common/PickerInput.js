import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput
} from 'react-native'
import ModalPicker from 'react-native-modal-picker'

import colors from '../../constants/colors'

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0,0,0,0.12)'
  },
  label: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.8)'
  },
  value: {
    flex: 1,
    textAlign: 'right',
    fontSize: 16,
    color: 'rgba(0,0,0,0.6)'
  },
  section: {
    padding: 10
  },
  sectionText: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.grey
  },
  option: {
    padding: 10
  },
  optionText: {
    fontSize: 20,
    color: colors.darkgrey
  },
  cancel: {
    padding: 10
  },
  cancelText: {
    fontSize: 20,
    color: colors.grey
  }
})

export default class extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: null
    }
  }

  _onValueChange = (option) => {
    this.setState({ value: option.label })
    this.props.onValueChange(option.key)
  }

  render() {
    const {
      label,
      size = 16,
      placeholder,
      initValue,
      options,
      cancelText,
      containerStyle,
      labelStyle,
      valueStyle,
      sectionStyle,
      sectionTextStyle,
      optionStyle,
      optionTextStyle,
      cancelStyle,
      cancelTextStyle
    } = this.props
    const containerStyles = [styles.container, containerStyle]
    const labelStyles = [styles.label, labelStyle, { fontSize: size }]
    const valueStyles = [styles.value, valueStyle, { fontSize: size }]
    const modalProps = {
      sectionStyle: [styles.section, sectionStyle],
      sectionTextStyle: [styles.sectionText, sectionTextStyle],
      optionStyle: [styles.option, optionStyle],
      optionTextStyle: [styles.optionText, optionTextStyle],
      cancelStyle: [styles.cancel, cancelStyle],
      cancelTextStyle: [styles.cancelText, cancelTextStyle],
      cancelText: cancelText || 'Cancel'
    }
    const pickerData = Object.keys(options).map((key) => ({ key, label: options[key] }))
    return (
        <ModalPicker
          {...modalProps}
          data={pickerData}
          onChange={this._onValueChange}>
            <View style={containerStyles}>
              <Text style={labelStyles}>
                {label}
              </Text>
            <TextInput
              style={valueStyles}
              editable={false}
              placeholder={placeholder}
              value={this.state.value || initValue}
            />
          </View>
        </ModalPicker>
    )
  }
}