import React, { PropTypes } from 'react'
import { ScrollView } from 'react-native'
import { map } from 'lodash'

import ExerciseListRow from './ExerciseListRow'

const ExerciseList = ({ exercises, onExercisePress, onAvatarPress }) => (
  <ScrollView>
    {map(exercises, exercise =>
      <ExerciseListRow
        key={exercise._id}
        {...exercise}
        onPress={() => onExercisePress(exercise._id)}
        onAvatarPress={() => onAvatarPress(exercise._id)}
      />
    )}
  </ScrollView>
)

ExerciseList.propTypes = {
  exercises: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUri: PropTypes.string.isRequired,
    bodyPart: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onExercisePress: PropTypes.func.isRequired,
  onAvatarPress: PropTypes.func.isRequired
}

export default ExerciseList