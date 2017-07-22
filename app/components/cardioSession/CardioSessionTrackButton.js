import React from 'react'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import {
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

import colors from '../../constants/colors'

const styles = StyleSheet.create({
  container: {
    height: 238,
    width: 238,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 169,
    borderWidth: 5,
    borderColor: colors.green
  },
  checkIcon: {
    height: 144,
    width: 144,
    fontSize: 144,
    color: colors.green
  },
  upperText: {
    fontSize: 24,
    color: colors.green
  },
  lowerText: {
    fontSize: 24,
    color: colors.green
  }
})

export default ({ upperText, lowerText, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}>
      <Text style={styles.upperText}>
        {upperText}
      </Text>
      <MaterialIcon
        name={'check'}
        style={styles.checkIcon}
      />
      <Text style={styles.lowerText}>
        {lowerText}
      </Text>
    </TouchableOpacity>
  )
}