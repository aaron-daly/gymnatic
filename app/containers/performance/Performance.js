import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view'

import WeightsPerformance from './WeightsPerformance'
import CardioPerformance from './CardioPerformance'
import colors from '../../constants/colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 63,
    backgroundColor: colors.lightgrey
  },
  tabBar: {
    backgroundColor: colors.navy,
    shadowColor: colors.navy,
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 1
    }
  },
  indicator: {
    backgroundColor: colors.blue
  },
  label: {
    fontSize: 14
  }
})

export default class Performance extends Component {

  constructor(props) {
    super(props)
    this.state = {
      index: 0,
      routes: [
        { key: '0', title: 'Weights' },
        { key: '1', title: 'Cardio' }
      ]
    }
  }

  _handleChangeTab = index => this.setState({ index })

  _renderHeader = props => (
    <TabBar
      style={styles.tabBar}
      labelStyle={styles.label}
      indicatorStyle={styles.indicator}
      {...props}
    />
  )

  _renderScene = SceneMap({
    '0': () => <WeightsPerformance />,
    '1': () => <CardioPerformance />
  })

  render() {
    return (
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onRequestChangeTab={this._handleChangeTab}
      />
    )
  }
}


