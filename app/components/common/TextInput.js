import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput
} from 'react-native'

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
    borderBottomColor: colors.bordergrey
  },
  label: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.8)'
  },
  textInput: {
    flex: 1,
    textAlign: 'right',
    fontSize: 16,
    color: 'rgba(0,0,0,0.6)'
  }
})

export default (props) => {
  const {
    label,
    size = 16,
    containerStyle,
    labelStyle,
    textInputStyle
  } = props
  const containerStyles = [styles.container, containerStyle]
  const labelStyles = [styles.label, labelStyle, { fontSize: size, }]
  const textInputStyles = [styles.textInput, textInputStyle, { fontSize: size, height: size }]
  return (
    <View style={containerStyles}>
      <Text style={labelStyles}>
        {label}
      </Text>
      <TextInput
        style={textInputStyles}
        selectionColor={colors.blue}
        placeholderTextColor={colors.bordergrey}
        {...props}
      />
    </View>
  )
}