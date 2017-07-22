import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native'

const styles = StyleSheet.create({
  container: {},
  image: {
    backgroundColor: 'rgba(0,0,0,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.16)'
  }
})

export default ({ containerStyle, imageStyle, size = 40, source, onPress }) => {
  const containerStyles = [styles.container, containerStyle]
  const imageStyles = [styles.image, imageStyle, size && { width: size, height: size, borderRadius: size/2 }]
  const activeOpacity = onPress ? 0.66 : 1
  const onAvatarPress = onPress ? onPress : () => {}
  return (
    <TouchableOpacity
      style={containerStyles}
      activeOpacity={activeOpacity}
      onPress={onAvatarPress}>
      <Image
        style={imageStyles}
        source={source}
      />
    </TouchableOpacity>
  )
}