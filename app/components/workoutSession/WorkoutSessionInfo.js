import React, { PropTypes } from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'

import { secondsToDigitString } from '../../utils/TimeParsers'
import colors from '../../constants/colors'

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: colors.darknavy
  },
  infoItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoItem: {
    fontSize: 19.5,
    fontWeight: '500'
  },
  infoItemIcon: {
    fontSize: 19.5,
    marginLeft: 5,
    fontWeight: '500'
  },
})

const WorkoutSessionInfoItem = ({ children, color }) => {
  const infoItemTextStyles = [ styles.infoItemIcon, { color } ]
  return (
    <View style={styles.infoItemContainer}>
      <Text style={infoItemTextStyles}>
        {children}
      </Text>
    </View>
  )
}

const WorkoutSessionInfo = ({ secondsElapsed }) => {
  return (
    <View style={styles.container}>
      <WorkoutSessionInfoItem color={colors.green}>
        {secondsToDigitString(secondsElapsed)}
      </WorkoutSessionInfoItem>
    </View>
  )
}

WorkoutSessionInfo.propTypes = {
  secondsElapsed: PropTypes.number.isRequired
}

export default WorkoutSessionInfo