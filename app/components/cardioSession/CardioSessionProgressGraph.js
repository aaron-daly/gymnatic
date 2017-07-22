import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import {
  VictoryChart,
  VictoryGroup,
  VictoryLine,
  VictoryScatter,
  VictoryAxis,
  VictoryLabel
} from 'victory-native'
import { map } from 'lodash'

import { secondsToDigitString } from '../../utils/TimeParsers'
import colors from '../../constants/colors'

const styles = StyleSheet.create({
  container: {
    height: 310,
    marginBottom: 28,
    backgroundColor: colors.bordernavy
  },
  guestLabelsContainer: {
    zIndex: 1000,
    position: 'absolute',
    bottom: 5,
    right: 0,
    padding: 5
  },
  guestLabelBox: {
    marginTop: 7.5,
    width: 60,
    alignItems: 'center',
    paddingVertical: 5,
    backgroundColor: colors.grey,
    borderRadius: 10
  },
  guestLabelText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.black
  }
})


// Layout
const baseProps = {
  width: 350,
  height: 350,
};

// Chart Group Padding
const chartPadding = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 30
}

// Typography
const sansSerif = "'Roboto', 'Helvetica Neue', Helvetica, sans-serif";
const fontSize = 17.5;
const padding = 5;
const baseLabelStyles = {
  fontFamily: sansSerif,
  fontSize,
  padding
};

// Scatter labels
const centeredLabelStyles = Object.assign({
  textAnchor: "middle"
}, baseLabelStyles);

// Strokes
const strokeDasharray = "5, 5";
const strokeLinecap = "round";
const strokeLinejoin = "round";

// Graph Theme
const theme = {
  axis: Object.assign({
    style: {
      axis: {
        stroke: colors.green,
        strokeWidth: 5,
        strokeLinecap,
        strokeLinejoin
      },
      grid: {
        fill: "transparent",
        stroke: colors.blue,
        strokeWidth: 0.5,
        strokeDasharray,
        strokeLinecap,
        strokeLinejoin
      },
      ticks: {
        size: 0
      },
      tickLabels: Object.assign({}, baseLabelStyles, {
        fill: colors.green,
        stroke: "transparent"
      })
    }
  }, baseProps),
  chart: baseProps,
  line: Object.assign({
    style: {
      data: {
        fill: "transparent",
        stroke: colors.electricblue,
        strokeWidth: 4,
        opacity: 0.8
      },
      labels: Object.assign({}, baseLabelStyles, {
        stroke: "transparent",
        strokeWidth: 0,
        textAnchor: "start"
      })
    }
  }, baseProps),
  scatter: Object.assign({
    style: {
      data: {
        fill: colors.electricblue,
        opacity: 1,
        stroke: 'transparent'
      },
      labels: Object.assign({}, centeredLabelStyles, {
        fontSize: 14,
        stroke: "transparent"
      })
    }
  }, baseProps)
};

const GuestLabel = ({ name, color }) => (
  <View style={[ styles.guestLabelBox, { backgroundColor: color }]}>
    <Text style={styles.guestLabelText}>
      {name}
    </Text>
  </View>
)

const GuestLabelsList = ({ guestData }) => (
  <View style={styles.guestLabelsContainer}>
    {map(guestData, (guest, key) =>
      <GuestLabel
        key={key}
        {...guest.config}
      />
    )}
  </View>
)

export default ({ data, guestData, domain,  tickValues }) => (
  <View style={styles.container}>
    <GuestLabelsList
      guestData={guestData}
    />
    <VictoryChart
      padding={chartPadding}
      height={340}
      theme={theme}
      domain={domain}>
      {map(guestData, (guest, key) =>
        <VictoryGroup
          key={key}
          data={guest.intervals}>
          <VictoryLine
            style={{
              data: {
                stroke: guest.config.color || colors.grey,
                strokeWidth: 3
              }
            }}
          />
          <VictoryScatter
            size={2}
            style={{
              data: {
                fill: guest.config.color || colors.grey
              }
            }}
          />
        </VictoryGroup>
      )}
      <VictoryGroup
        data={data}>
        <VictoryLine />
        <VictoryScatter
          size={4}
          labels={map(data, 'y')}
          labelComponent={<VictoryLabel dy={0.1} dx={-20} />}
        />
      </VictoryGroup>
      <VictoryAxis
        data={data}
        tickValues={tickValues}
        tickFormat={(tick) => secondsToDigitString(tick)}
      />
    </VictoryChart>
  </View>
)