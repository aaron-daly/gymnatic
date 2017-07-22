import React from 'react'
import {
  Text,
  StyleSheet
} from 'react-native'

const styles = StyleSheet.create({
  text: {
    padding: 15,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 14,
    color: 'rgba(0,0,0,0.5)'
  }
})

export default ({ message }) => (
  <Text style={styles.text}>
    {message}
  </Text>
)
