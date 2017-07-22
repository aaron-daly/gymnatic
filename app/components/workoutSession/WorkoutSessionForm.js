import React from 'react'
import _ from 'lodash'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import colors from '../../constants/colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputGroupContainer: {
    width: 120,
    alignItems: 'center'
  },
  inputGroup: {
    height: 160,
    width: 120,
    padding: 5,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 2,
    alignItems: 'center'
  },
  inputLabel: {
    fontSize: 14,
    color: colors.orange,
    fontWeight: '500'
  },
  inputContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    height: 70,
    width: 100,
    marginTop: -8,
    fontSize: 42,
    textAlign: 'center',
    color: colors.electricblue
  },
  inputsSeparator: {
    fontSize: 64,
    paddingHorizontal: 20,
    color: 'rgba(0,0,0,0.2)'
  },
  arrow: {
    padding: 20,
    color: colors.orange,
    opacity: 0.87,
    fontSize: 36
  }
})

const incrementValue = (value) => {
  return `${parseInt(value) + 1}`
}

const decrementValue = (value) => {
  const num = parseInt(value)
  return `${num > 0 ? num - 1 : num}`
}

const WorkoutSessionFormInput = ({ label, value, color = colors.electricblue, onChange }) => {
  const topArrowStyles = [ styles.arrow, { paddingBottom: 10 }]
  const bottomArrowStyles = [ styles.arrow, { paddingTop: 10 }]
  const parsedValue = value === '0' ? null : value
  return (
    <View style={styles.inputGroupContainer}>
      <TouchableOpacity
        onPress={() => onChange(incrementValue(value))}>
        <Icon
          style={topArrowStyles}
          name={'arrow-up'}
        />
      </TouchableOpacity>
      <View style={styles.inputGroup}>
        <Text style={[ styles.inputLabel, { color } ]}>
          {_.toUpper(label)}
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[ styles.input, { color } ]}
            selectionColor={colors.blue}
            keyboardType={'numeric'}
            value={parsedValue}
            placeholder={'0'}
            placeholderTextColor={colors.navy}
            onChangeText={(text) => onChange(text)}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => onChange(decrementValue(value))}>
        <Icon
          style={bottomArrowStyles}
          name={'arrow-down'}
        />
      </TouchableOpacity>
    </View>
  )
}

const WorkoutSessionForm = ({ reps, weight, weightMetric, onRepsChange, onWeightChange }) => {
  return (
    <View style={styles.container}>
      <WorkoutSessionFormInput
        label={'REPS'}
        value={reps}
        color={colors.orange}
        onChange={onRepsChange}
      />
      <Text style={styles.inputsSeparator}>
        x
      </Text>
      <WorkoutSessionFormInput
        label={weightMetric}
        value={weight}
        color={colors.orange}
        onChange={onWeightChange}
      />
    </View>
  )
}

export default WorkoutSessionForm