import React, { PropTypes } from 'react'
import * as Animatable from 'react-native-animatable'
import {
  View,
  StyleSheet
} from 'react-native'

import colors from '../../constants/colors'

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 64,
    backgroundColor: colors.lightgrey
  }
})

{/* <View style={[styles.viewContainer, style]}>
  <Animatable.View
    style={[styles.contentContainerStyle, contentContainerStyle]}
    animation={animation}
    duration={animationDuration}>
  {children}
  </Animatable.View>
</View> */}

const ViewContainer = ({ children, style }) => {
  return (
    <View style={[styles.viewContainer, style]}>
      {children}
    </View>
  )
}

ViewContainer.propTypes = {
  style: PropTypes.object,
  animation: PropTypes.string,
  animationDuration: PropTypes.number
}

export default ViewContainer
