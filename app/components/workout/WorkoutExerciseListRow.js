import React, { Component, PropTypes } from 'react'
import { Actions as routerActions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from 'react-native'

import { Avatar } from '../common'
import * as routes from '../../constants/routes'
import * as icons from '../../constants/icons'
import colors from '../../constants/colors'

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.bordergrey
  },
  exerciseRow: {
    height: 60,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: colors.lightgrey,
    borderWidth: 0.5,
    borderColor: colors.bordergrey
  },
  exerciseName: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16.5,
    color: colors.darkgrey
  },
  setsContainer: {
    marginLeft: 70
  },
  setContainer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderTopColor: colors.bordergrey
  },
  setNumberText: {
    fontWeight: '500',
    width: 20,
    color: colors.grey
  },
  setText: {
    color: colors.grey
  }
})

class WorkoutExerciseListRow extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isDropdownVisible: false
    }
  }

  _onPress = () => {
    this.setState({ isDropdownVisible: !this.state.isDropdownVisible })
  }

  _onExerciseImagePress = () => {
  }

  render() {
    const { isDropdownVisible } = this.state
    const {
      name,
      imageUri,
      sets
    } = this.props
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.exerciseRow}
          activeOpacity={0.87}
          onPress={this._onPress}>
          <Avatar
            size={45}
            source={{ uri: imageUri }}
          />
          <Text style={styles.exerciseName}>
            {name}
          </Text>
          <Icon
            name={isDropdownVisible? icons.ARROW_DOWN : icons.ARROW_LEFT}
            color={colors.grey}
          />
        </TouchableOpacity>
        {isDropdownVisible &&
          <View style={styles.setsContainer}>
            {sets.map((set, i) =>
              <View
                key={i}
                style={styles.setContainer}>
                <Text style={styles.setNumberText}>
                  {i+1}.
                </Text>
                <Text style={styles.setText}>
                  {`${set.reps} reps`}
                </Text>
              </View>
            )}
          </View>
        }
      </View>
    )
  }
}

WorkoutExerciseListRow.propTypes = {
  _exerciseId: PropTypes.string.isRequired,
  imageUri: PropTypes.string,
  sets: PropTypes.arrayOf(PropTypes.shape({
    reps: PropTypes.number.isRequired
  }).isRequired).isRequired
}

export default WorkoutExerciseListRow