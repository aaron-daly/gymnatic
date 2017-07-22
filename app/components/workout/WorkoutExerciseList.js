import React, { PropTypes } from 'react'
import { map } from 'lodash'

import { Section } from '../common'
import WorkoutExerciseListRow from './WorkoutExerciseListRow'

const WorkoutExerciseList = ({ exercises }) => (
  <Section
    titleText={'EXERCISES'}>
    {map(exercises, (exercise, i) =>
      <WorkoutExerciseListRow
        key={i}
        {...exercise}
      />
    )}
  </Section>
)

WorkoutExerciseList.propTypes = {
  exercises: PropTypes.arrayOf(PropTypes.shape({
    _exerciseId: PropTypes.string.isRequired,
    imageUri: PropTypes.string,
    sets: PropTypes.arrayOf(PropTypes.shape({
      reps: PropTypes.number.isRequired
    }).isRequired).isRequired
  }).isRequired).isRequired
}

export default WorkoutExerciseList
