import React from 'react'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'

import colors from '../../constants/colors'

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.darknavy,
    borderBottomWidth: 1,
    borderBottomColor: colors.bordernavy
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerText: {
    color: colors.white,
    fontSize: 20,
  },
  headerButton: {
    color: colors.white,
    fontSize: 32,
    marginTop: 5,
    marginLeft: 5
  }
})

export default ({ titleText, onPausePress, onStopPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.headerText}>{titleText}</Text>
      </View>
      <TouchableOpacity
        onPress={onPausePress}>
        <MaterialIcon
          name={'pause-circle'}
          style={styles.headerButton}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onStopPress}>
        <MaterialIcon
          name={'stop-circle'}
          style={styles.headerButton}
        />
      </TouchableOpacity>
    </View>
  )
}