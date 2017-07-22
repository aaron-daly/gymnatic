import React from 'react'
import Svg from 'react-native-svg'
import {
  VictoryGroup,
  VictoryLine,
  VictoryScatter,
  VictoryAxis
} from 'victory-native'

import ChartTheme from './ChartTheme'

const ProgressLine = ({ data, x, y, domain, domainPadding, tickValues, tickFormat, labelFormat }) => (
  <Svg width={400} height={300}>
    <VictoryGroup
      animate={{ duration: 1000 }}
      standalone={false}
      domainPadding={domainPadding}
      x={x}
      y={y}
      data={data}>
      <VictoryLine
        style={ChartTheme.line.style}
      />
      <VictoryScatter
        style={ChartTheme.scatter.style}
        labels={labelFormat}
      />
    </VictoryGroup>
    <VictoryAxis
      dependantAxis
      theme={ChartTheme}
      orientation={'bottom'}
      standalone={false}
      domain={domain.x}
      domainPadding={domainPadding.x}
      tickValues={tickValues.x}
      tickFormat={tickFormat.x}
    />
    <VictoryAxis
      theme={ChartTheme}
      orientation={'left'}
      standalone={false}
      domain={domain.y}
      domainPadding={domainPadding.y}
      tickValues={tickValues.y}
      tickFormat={tickFormat.y}
    />
  </Svg>
)

ProgressLine.defaultProps = {
  x: 'x',
  y: 'y',
  domain: {},
  domainPadding: {},
  tickValues: {},
  tickFormat: { x: datum => datum, y: datum => datum },
  labelFormat: datum => datum.y
}

export default ProgressLine