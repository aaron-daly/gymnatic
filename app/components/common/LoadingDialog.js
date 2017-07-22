import React from 'react'
import {
  View,
  ActivityIndicator,
  StyleSheet
} from 'react-native'

import colors from '../../constants/colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightgrey
  }
})

export default ({ backgroundColor = colors.lightgrey }) => {
  const containerStyles = [ styles.container, { backgroundColor } ]
  return (
    <View style={containerStyles}>
      <ActivityIndicator
        animating={true}
        color={colors.grey}
        size="large"
      />
    </View>
  )
}
