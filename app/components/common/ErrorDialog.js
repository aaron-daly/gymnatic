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
    padding: 15,
    backgroundColor: colors.lightgrey
  },
  errorText: {
    fontSize: 16,
    color: colors.pink,
    textAlign: 'center'
  }
})

export default ({ text, color }) => {
  const textStyles = [ styles.errorText, { color: color } ]
  return (
    <View style={styles.container}>
      <Text style={textStyles}>
        {text}
      </Text>
    </View>
  )
}
