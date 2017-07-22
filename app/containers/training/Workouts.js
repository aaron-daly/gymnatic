import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Actions as routerActions } from 'react-native-router-flux'
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view'

import PresetWorkouts from './PresetWorkouts'
import CustomWorkouts from './CustomWorkouts'
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

export default class Workouts extends Component {

  constructor(props) {
    super(props)
    this.state = {
      index: 0,
      routes: [
        { key: '0', title: 'Presets' },
        { key: '1', title: 'Custom' }
      ]
    }
  }

  componentDidMount() {
    routerActions.refresh({
      hideTabBar: true
    })
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
    '0': () => <PresetWorkouts />,
    '1': () => <CustomWorkouts />
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