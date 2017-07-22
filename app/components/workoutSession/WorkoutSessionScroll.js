import React from 'react'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native'

import colors from '../../constants/colors'

const styles = StyleSheet.create({
  scrollContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  scrollButton: {
    flex: 1,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.darknavy
  },
  scrollText: {
    fontSize: 18,
    padding: 5,
    fontWeight: '500',
    color: colors.electricblue
  },
  arrow: {
    fontSize: 18,
    color: colors.electricblue
  },
  disabled: {
    opacity: 0.7
  }
})

const WorkoutSessionScroll = ({ onPrevPress, onNextPress, prevDisabled, nextDisabled }) => {
  const leftScrollButtonStyles = [ styles.scrollButton, { borderRightWidth: 0.5 } ]
  const rightScrollButtonStyles = [ styles.scrollButton, { justifyContent: 'flex-end', borderLeftWidth: 0.5 } ]
  const leftArrowStyles = [ styles.arrow, prevDisabled && styles.disabled ]
  const leftTextStyles = [ styles.scrollText, prevDisabled && styles.disabled ]
  const rightArrowStyles = [ styles.arrow, nextDisabled && styles.disabled ]
  const rightTextStyles = [ styles.scrollText, nextDisabled && styles.disabled ]
  return (
    <View style={styles.scrollContainer}>
      <TouchableOpacity
        style={leftScrollButtonStyles}
        onPress={onPrevPress}
        disabled={prevDisabled}>
        <Icon
          style={leftArrowStyles}
          name={'arrow-left'}
        />
        <Text style={leftTextStyles}>Previous</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={rightScrollButtonStyles}
        onPress={onNextPress}
        disabled={nextDisabled}>
        <Text style={rightTextStyles}>Next</Text>
        <Icon
          style={rightArrowStyles}
          name={'arrow-right'}
        />
      </TouchableOpacity>
    </View>
  )
}

export default WorkoutSessionScroll