import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

import colors from '../../constants/colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15
  },
  infoText: {
    fontSize: 16,
    color: colors.black,
    opacity: 0.6,
    textAlign: 'center'
  }
})

export default ({ text, color }) => {
  const textStyles = [ styles.infoText, { color: color } ]
  return (
    <View style={styles.container}>
      <Text style={textStyles}>
        {text}
      </Text>
    </View>
  )
}
