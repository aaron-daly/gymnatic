import React, { PropTypes } from 'react'
import { ScrollView } from 'react-native'
import { map } from 'lodash'

import LoggedExerciseListRow from './LoggedExerciseListRow'

const LoggedExerciseList = ({ loggedExercises, weightMetric }) => (
  <ScrollView>
    {map(loggedExercises, (loggedExercise, i) =>
      <LoggedExerciseListRow
        key={i}
        weightMetric={weightMetric}
        {...loggedExercise}
      />
    )}
  </ScrollView>
)

LoggedExerciseList.propTypes = {
  loggedExercises: PropTypes.arrayOf(PropTypes.shape({

  }).isRequired).isRequired
}

export default LoggedExerciseList