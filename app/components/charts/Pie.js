import React from 'react'
import { VictoryPie } from 'victory-native'
import ChartTheme from './ChartTheme'

export default (props) => <VictoryPie theme={ChartTheme} {...props} />