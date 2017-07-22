import React, { PropTypes } from 'react'
import { View, ScrollView } from 'react-native'
import { map } from 'lodash'

import DiaryListRow from './DiaryListRow'

const DiaryList = ({ logGroups, onLogPress }) => (
  <ScrollView>
    {map(logGroups, (logGroup, i) =>
      <DiaryListRow
        key={i}
        {...logGroup}
        onLogPress={onLogPress}
      />
    )}
    <View style={{ height: 90 }} />
  </ScrollView>
)

DiaryList.propTypes = {
  logGroups: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string.isRequired,
    logs: PropTypes.array.isRequired
  }).isRequired).isRequired,
  onLogPress: PropTypes.func.isRequired
}

export default DiaryList