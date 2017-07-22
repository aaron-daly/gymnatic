import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

import colors from '../../constants/colors'

const styles = StyleSheet.create({
  container: {
    marginTop: 10
  },
  labelContainer: {
    paddingHorizontal: 15,
    paddingBottom: 7
  },
  label: {
    fontSize: 12.5,
    color: colors.grey
  },
  contentContainer: {
    padding: 15,
    backgroundColor: colors.white,
    borderTopColor: colors.bordergrey,
    borderTopWidth: 0.5,
    borderBottomColor: colors.bordergrey,
    borderBottomWidth: 0.5
  }
})

class Card extends Component {
  render() {
    const {
      label,
      children,
      labelStyle,
      labelContainerStyle,
      containerStyle,
      style
    } = this.props
    return (
      <View style={[ styles.container, containerStyle ]}>
        {
          label === null ? <View /> :
            <View style={[ styles.labelContainer, labelContainerStyle ]}>
              <Text style={[ styles.label, labelStyle ]}>{_.toUpper(label)}</Text>
            </View>
        }
        <View style={[ styles.contentContainer, style ]}>
          {children}
        </View>
      </View>
    )
  }
}

Card.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
  labelStyle: PropTypes.object,
  labelContainerStyle: PropTypes.object,
  containerStyle: PropTypes.object,
  style: PropTypes.object
}

export default Card