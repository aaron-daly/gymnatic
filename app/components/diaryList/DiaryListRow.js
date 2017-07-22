import React from 'react'
import moment from 'moment'
import { map } from 'lodash'
import { StyleSheet,  View,  Text } from 'react-native'

import LogRow from './LogRow'
import * as strings from '../../constants/strings/diary'
import colors from '../../constants/colors'

const styles = StyleSheet.create({
  container: {
    paddingTop: 20
  },
  dateContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.bordergrey,
    paddingBottom: 5
  },
  date: {
    paddingHorizontal: 15,
    fontSize: 14,
    fontWeight: '500',
    color: colors.navy
  },
  separator: {
    height: 1,
    backgroundColor: colors.lightgrey
  },
  logsContainer: {
    backgroundColor: colors.white,
    borderBottomColor: colors.bordergrey,
    borderBottomWidth: 0.5
  }
})

const DiaryListRow = ({ date, logs, onLogPress }) => (
  <View style={styles.container}>
    <View style={styles.dateContainer}>
      <Text style={styles.date}>
        {moment(date).format(strings.DATE_LONG_FORMAT)}
      </Text>
    </View>
    <View style={styles.logsContainer}>
      {map(logs, (log, i) =>
        <LogRow
          key={log._id}
          i={i}
          {...log}
          title={log.type === strings.TYPE_WORKOUT ? log.workoutName : log.presetTitle }
          onPress={() => onLogPress(log._id, log.type)}
        />
      )}
    </View>
  </View>
)

export default DiaryListRow