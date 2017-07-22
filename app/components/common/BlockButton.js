import React, { Component, PropTypes } from 'react'
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet
} from 'react-native'

import colors from '../../constants/colors'

const styles = StyleSheet.create({
  button: {
    height: 45,
    justifyContent: 'center',
    backgroundColor: colors.electricblue,
    shadowOffset: {
      width: 0,
      height: -1
    },
    shadowRadius: 2,
    shadowColor: colors.electricblue,
    shadowOpacity: 0.2
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    color: colors.white,
    fontWeight: '500'
  },
  buttonDisabled: {
    opacity: 0.66
  }
})

class BlockButton extends Component {
  render() {
    const {
      ref,
      disabled,
      onPress,
      buttonStyle,
      textStyle,
      color,
      textColor,
      title
    } = this.props
    const buttonStyles = [styles.button, buttonStyle]
    if (color) buttonStyles.push({ backgroundColor: color, shadowColor: color })
    const textStyles = [styles.text, textStyle]
    if (textColor) textStyles.push({ color: textColor })
    if (disabled) {
      buttonStyles.push(styles.buttonDisabled)
      textStyles.push(styles.textDisabled)
    }
    return (
      <TouchableOpacity
        ref={ref}
        disabled={disabled}
        onPress={onPress}
        activeOpacity={0.66}>
        <View style={buttonStyles}>
          <Text style={textStyles}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

BlockButton.propTypes = {
  ref: PropTypes.func,
  disabled: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  buttonStyle: PropTypes.object,
  textStyle: PropTypes.object,
  color: PropTypes.string,
  textColor: PropTypes.string,
  title: PropTypes.string.isRequired
}

export default BlockButton
