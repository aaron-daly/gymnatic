import React, { PropTypes } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'

import { Avatar } from '../common'
import colors from '../../constants/colors'

const styles = StyleSheet.create({
  container: {
    marginBottom: 1,
    padding: 15,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center'
  },
  textContainer: {
    marginLeft: 15
  },
  nameText: {
    fontSize: 16,
    lineHeight: 18,
    color: 'rgba(0,0,0,0.8)'
  },
  bodyPartText: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.6)'
  }
})

const ExerciseListRow = ({ name, imageUri, bodyPart, onPress, onAvatarPress }) => (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.67}>
      <Avatar
        source={{ uri: imageUri }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>
          {name}
        </Text>
        <Text style={styles.bodyPartText}>
          {bodyPart}
        </Text>
      </View>
    </TouchableOpacity>
)

ExerciseListRow.propTypes = {
  name: PropTypes.string.isRequired,
  imageUri: PropTypes.string.isRequired,
  bodyPart: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  onAvatarPress: PropTypes.func.isRequired
}

export default ExerciseListRow
