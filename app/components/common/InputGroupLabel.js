import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    paddingHorizontal: 15,
    paddingBottom: 7.5,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0,0,0,0.12)'
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(0,0,0,0.6)'
  }
})

export default ({ containerStyle, style, label }) => {
  const containerStyles = [styles.container, containerStyle]
  const labelStyles = [styles.label, style]
  return (
    <View style={containerStyles}>
      <Text style={labelStyles}>
        {label}
      </Text>
    </View>
  )
}