import React, { PropTypes } from 'react'
import { map } from 'lodash'
import {
  VictoryGroup,
  VictoryLine,
  VictoryScatter,
  VictoryAxis,
  VictoryLabel
} from 'victory-native'
import Svg from 'react-native-svg'

import { secondsToDigitString } from '../../utils/TimeParsers'
import colors from '../../constants/colors'

const baseProps = {
  width: 320,
  height: 300
};

// Typography
const sansSerif = "'Roboto', 'Helvetica Neue', Helvetica, sans-serif";
const fontSize = 12;
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
const strokeDasharray = "3, 3";
const strokeLinecap = "round";
const strokeLinejoin = "round";

// Graph Theme
const graphTheme = {
  axis: Object.assign({
    style: {
      axis: {
        stroke: 'rgba(0,0,0,0.6)',
        strokeWidth: 1,
        strokeLinecap,
        strokeLinejoin
      },
      grid: {
        fill: "transparent",
        stroke: 'rgba(0,0,0,0.2)',
        strokeWidth: 0.5,
        strokeDasharray,
        strokeLinecap,
        strokeLinejoin
      },
      ticks: {
        size: 4
      },
      tickLabels: Object.assign({}, baseLabelStyles, {
        fill: 'rgba(0,0,0,0.6)',
        stroke: "transparent"
      })
    }
  }, baseProps),
  chart: baseProps,
  line: Object.assign({
    style: {
      data: {
        fill: "transparent",
        opacity: 1,
        stroke: colors.electricblue,
        strokeWidth: 3
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
        stroke: "transparent",
      },
      labels: Object.assign({}, centeredLabelStyles, {
        fontSize: 12
      })
    }
  }, baseProps)
};

const IntervalsGraph = ({ data, guestData = {}, domain, tickValues, tickFormats }) => (
  <Svg
    style={{ marginLeft: 15 }}
    width={360}
    height={300}>
    {map(guestData, (guest, key) =>
      <VictoryGroup
        key={key}
        data={guest.intervals}
        domain={domain}
        standalone={false}
        theme={graphTheme}>
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
      data={data}
      domain={domain}
      theme={graphTheme}>
      <VictoryLine />
      <VictoryScatter
        labels={(datum) => datum.x > 0 ? secondsToDigitString(datum.x) : ''}
        labelComponent={<VictoryLabel dx={-15} />}
      />
    </VictoryGroup>
    <VictoryAxis
      theme={graphTheme}
      orientation={'left'}
      domain={domain.y}
      tickValues={tickValues.y}
      tickFormat={tickFormats.y}
      standalone={false}
    />
    <VictoryAxis
      theme={graphTheme}
      tickValues={tickValues.x}
      tickFormat={tickFormats.x}
      standalone={false}
    />
  </Svg>
)

IntervalsGraph.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired).isRequired,
  tickValues: PropTypes.shape({
    x: PropTypes.array.isRequired,
    y: PropTypes.array.isRequired
  }).isRequired,
  tickFormats: PropTypes.shape({
    x: PropTypes.func.isRequired,
    y: PropTypes.func.isRequired
  })
}

export default IntervalsGraph
