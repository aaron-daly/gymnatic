import React, { PropTypes } from 'react'
import _ from 'lodash'
import { StyleSheet, Text, View } from 'react-native'

import { Avatar } from '../common'
import colors from '../../constants/colors'

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.bordergrey
  },
  exerciseContainer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15
  },
  exerciseName: {
    marginLeft: 15,
    fontSize: 16.5,
    color: colors.darkgrey
  },
  setsContainer: {
    marginLeft: 70
  },
  setContainer: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderTopColor: colors.bordergrey
  },
  setNumberText: {
    width: 20,
    fontWeight: '500',
    color: colors.grey
  },
  setText: {
    marginLeft: 5,
    color: colors.grey
  }
})

const SetRow = ({ setNumber, recordedReps, recordedWeight, weightMetric }) => (
  <View style={styles.setContainer}>
    <Text style={styles.setNumberText}>
      {`${setNumber}.`}
    </Text>
    <Text style={styles.setText}>
      {recordedReps && recordedWeight ?
        `${recordedReps} x ${recordedWeight}${_.toLower(weightMetric)}` :
        'Not recorded'
      }
    </Text>
  </View>
)

const LoggedExerciseListRow = ({ name, imageUri, sets, weightMetric }) => (
  <View style={styles.container}>
    <View style={styles.exerciseContainer}>
      <Avatar
        source={{ uri: imageUri }}
      />
      <Text style={styles.exerciseName}>
        {name}
      </Text>
    </View>
    <View style={styles.setsContainer}>
      {_.map(sets, (set, i) =>
        <SetRow
          key={i}
          setNumber={i+1}
          weightMetric={weightMetric}
          {...set}
        />
      )}
    </View>
  </View>
)

LoggedExerciseListRow.propTypes = {
  name: PropTypes.string.isRequired,
  imageUri: PropTypes.string,
  sets: PropTypes.arrayOf(PropTypes.shape({

  }).isRequired).isRequired,
  weightMetric: PropTypes.string.isRequired
}

export default LoggedExerciseListRow