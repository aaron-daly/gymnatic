import React from 'react'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'

import { Avatar, TextInput } from '../common'
import * as strings from '../../constants/strings/createWorkout'
import * as icons from '../../constants/icons'
import colors from '../../constants/colors'

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.bordergrey
  },
  rowContainer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center'
  },
  rowContentContainer: {
    flex: 1,
    height: 50,
    marginLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  removeExerciseIcon: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.6)'
  },
  exerciseNameText: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.8)',
    flex: 1
  },
  setsContainer: {
    marginLeft: 55
  },
  setRowContainer: {
    flex: 1,
    height: 40,
    paddingRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(0,0,0,0.12)'
  },
  setNumberText: {
    width: 20,
    color: 'rgba(0,0,0,0.6)'
  },
  setTextInputContainer: {
    height: 40,
    paddingHorizontal: 5,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0
  },
  setTextInput: {
    marginTop: 0,
    width: 45,
    textAlign: 'center',
    fontSize: 14,
    color: colors.blue,
    borderWidth: 0.5,
    borderColor: colors.bordergrey,
    borderRadius: 2
  },
  setInputLabelText: {
    flex: 1,
    paddingLeft: 5,
    color: 'rgba(0,0,0,0.6)'
  },
  addSetText: {
    fontWeight: '500',
    color: 'rgba(0,0,0,0.6)'
  },
  setRemoveIcon: {
    fontSize: 14,
    padding: 5,
    marginRight: -5,
    color: 'rgba(0,0,0,0.6)'
  }
})

export default (props) => {
  const {
    name,
    imageUri,
    sets,
    exerciseIndex,
    onRemoveExercisePress,
    onAddSetPress,
    onRemoveSetPress,
    onSetValueChange
  } = props

  const setRowNodes = sets.map((set, setIndex) => {
    const repsValue = set.reps === 0 ? null : `${set.reps}`
    return (
      <View
        key={setIndex}
        style={styles.setRowContainer}>
        <Text style={styles.setNumberText}>
          {setIndex + 1}.
        </Text>
        <TextInput
          containerStyle={styles.setTextInputContainer}
          style={styles.setTextInput}
          value={repsValue}
          placeholder={'0'}
          keyboardType={'numeric'}
          onChangeText={(reps) => onSetValueChange(exerciseIndex, setIndex, 'reps', parseInt(reps || '0'))}>
        </TextInput>
        <Text style={styles.setInputLabelText}>
          Reps
        </Text>
        <TouchableOpacity
          onPress={() => onRemoveSetPress(exerciseIndex, setIndex)}>
          <Icon
            style={styles.setRemoveIcon}
            name={'close'}
          />
        </TouchableOpacity>
      </View>
    )
  })

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Avatar
          source={{ uri: imageUri }}
        />
        <View style={styles.rowContentContainer}>
          <Text style={styles.exerciseNameText}>
            {name}
          </Text>
          <TouchableOpacity
            onPress={() => onRemoveExercisePress(exerciseIndex)}>
            <Icon
              name={'trash'}
              style={styles.removeExerciseIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.setsContainer}>
        {setRowNodes}
        <View style={styles.setRowContainer}>
          <TouchableOpacity
            onPress={() => onAddSetPress(exerciseIndex)}>
            <Text style={styles.addSetText}>
              <Icon name={icons.PLUS}/> {strings.ADD_SET_BUTTON}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}