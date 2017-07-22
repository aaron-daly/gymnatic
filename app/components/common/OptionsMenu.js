import React, { Component, PropTypes } from 'react'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import _ from 'lodash'
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  StyleSheet
} from 'react-native'

import * as icons from '../../constants/icons'
import colors from '../../constants/colors'

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  container: {
    position: 'absolute',
    top: 30,
    right: 10,
    backgroundColor: colors.white,
    shadowOpacity: 0.4,
    shadowColor: colors.black,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 0
    }
  },
  optionLabelText: {
    padding: 15,
    fontSize: 16,
    color: 'rgba(0,0,0,0.8)'
  }
})

class OptionsMenu extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isVisible: false
    }
  }

  _toggleVisibility = () => {
    const { isVisible } = this.state
    this.setState({ isVisible: !isVisible })
  }

  _handleOptionEvent = (event) => {
    this._toggleVisibility()
    event()
  }

  render() {

    const {
      iconSize,
      iconColor,
      options
    } = this.props

    const optionsNodes = _.map(options, (option, i) => {
      const { label, onPress } = option
      return (
        <TouchableOpacity
          key={i}
          onPress={() => this._handleOptionEvent(onPress)}>
          <Text style={styles.optionLabelText}>{label}</Text>
        </TouchableOpacity>
      )
    })

    return (
      <View>
        <Icon
          size={iconSize}
          color={iconColor}
          name={icons.OPTIONS}
          onPress={this._toggleVisibility}
        />
        <Modal
          visible={this.state.isVisible}
          transparent={true}
          animationType={'fade'}>
          <TouchableWithoutFeedback onPress={this._toggleVisibility}>
            <View style={styles.background}>
              <View style={styles.container}>
                {optionsNodes}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    )
  }
}

OptionsMenu.defaultProps = {
  iconSize: 20,
  iconColor: colors.white,
  options: []
}

OptionsMenu.propTypes = {
  iconSize: PropTypes.number,
  iconColor: PropTypes.string,
  options: PropTypes.array.isRequired
}

export default OptionsMenu
