import React from 'react'
import { map } from 'lodash'
import { View, Text, StyleSheet } from 'react-native'

import { Section, InfoDialog } from '../common'
import Pie from './Pie'
import { chartColors } from './ChartTheme'
import colors from '../../constants/colors'

const styles = StyleSheet.create({
  labelsContainer: {
    position: 'absolute',
    top: 15,
    right: 15
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5
  },
  labelColorDrop: {
    height: 14,
    width: 14,
    borderRadius: 10
  },
  labelText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.grey,
    marginLeft: 5
  }
})

const PieLabel = ({ i, label }) => (
  <View style={styles.labelContainer}>
    <View style={[styles.labelColorDrop, { backgroundColor: chartColors[i] }]} />
    <Text style={styles.labelText}>
      {label}
    </Text>
  </View>
)

const PieLabels = ({ data }) => (
  <View style={styles.labelsContainer}>
    {map(data, (datum, i) =>
      <PieLabel
        key={i} i={i}
        label={datum.category}
      />
    )}
  </View>
)

export default ({ data = [], sectionTitle = '' }) => (
  <Section titleText={sectionTitle}>
    {
      data.length ? (
        <View>
          <Pie
            height={260}
            width={260}
            padding={40}
            data={data}
            x={datum => `${datum.proportion}%`}
            y={'proportion'}
          />
          <PieLabels
            data={data}
          />
        </View>
      ) : (
        <InfoDialog text={'No data available.'} />
      )
    }
  </Section>
)