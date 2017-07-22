import React from 'react'
import { View, ActivityIndicator } from 'react-native'

import colors from '../../constants/colors'

const LoadingIndicator = ({ style = {}, isVisible = true }) => {
  return (
    isVisible ?
      <ActivityIndicator
        style={style}
        animating={true}
        color={colors.grey}
        size="large"
      /> :
      <View />
  )
}

export default LoadingIndicator
