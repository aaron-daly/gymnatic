import React, { PropTypes } from 'react'
import moment from 'moment'
import { TouchableOpacity,  Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons'

import * as icons from '../../constants/icons'
import * as strings from '../../constants/strings/diary'
import colors from '../../constants/colors'

const styles = StyleSheet.create({
  logRow: {
    marginLeft: 15,
    paddingVertical: 15,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderTopColor: colors.bordergrey
  },
  logTime: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.6)'
  },
  logText: {
    paddingLeft: 15,
    fontSize: 16,
    color: 'rgba(0,0,0,0.8)',
    flex: 1
  },
  arrowRight: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.4)'
  }
})

const LogRow = ({ i, _id, title, timestamp, onPress }) => (
  <TouchableOpacity
    style={[
      styles.logRow,
      !i && { borderTopWidth: 0 }
    ]}
    onPress={onPress}>
    <Text style={styles.logTime}>
      {moment(timestamp).format(strings.TIME_FORMAT)}
    </Text>
    <Text style={styles.logText}>
      {title}
    </Text>
    <Icon
      name={icons.ARROW_RIGHT}
      style={styles.arrowRight}
    />
  </TouchableOpacity>
)

LogRow.propTypes = {
  i: PropTypes.number.isRequired,
  _id: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired
}

export default LogRow