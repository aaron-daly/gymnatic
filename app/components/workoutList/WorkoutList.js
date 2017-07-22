import React, { PropTypes } from 'react'
import { ScrollView, View } from 'react-native'
import { map } from 'lodash'

import WorkoutListRow from './WorkoutListRow'


const WorkoutList = ({ workouts, onWorkoutPress }) => (
  <ScrollView>
    {map(workouts, workout =>
      <WorkoutListRow
        key={workout._id}
        {...workout}
        onPress={() => onWorkoutPress(workout._id)}
      />
    )}
    <View style={{ height: 45 }} />
  </ScrollView>
)

WorkoutList.propTypes = {
  workouts: PropTypes.array.isRequired,
  onWorkoutPress: PropTypes.func.isRequired
}

export default WorkoutList