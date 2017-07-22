import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

import colors from '../../constants/colors'

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.darknavy
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50
  },
  exerciseInfoContainer: {
    flex: 1,
    alignSelf: 'stretch',
    marginLeft: 20,
    justifyContent: 'center',

  },
  exerciseName: {
    fontSize: 24,
    fontWeight: '500',
    color: colors.electricblue
  },
  exerciseInfo: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.orange
  }
})

const WorkoutSessionExerciseImage = ({ imageUri, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        style={styles.image}
        source={{ uri: imageUri }}
      />
    </TouchableOpacity>
  )
}

const WorkoutSessionExerciseInfo = ({ name, set, reps }) => {
  return (
    <View style={styles.exerciseInfoContainer}>
      <Text style={styles.exerciseName}>
        { name }
      </Text>
      <Text style={styles.exerciseInfo}>
        {`SET ${set} (${reps} REPS)`}
      </Text>
    </View>
  )
}

const WorkoutSessionExercise = ({ name, imageUri, set, reps, onImagePress }) => {
  return (
    <View style={styles.container}>
      <WorkoutSessionExerciseImage
        imageUri={imageUri}
        onImagePress={onImagePress}
      />
      <WorkoutSessionExerciseInfo
        name={name}
        set={set}
        reps={reps}
      />
    </View>
  )
}

export default WorkoutSessionExercise