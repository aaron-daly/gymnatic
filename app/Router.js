import React from 'react'
import { StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import {
  Scene,
  Router,
  Reducer,
  ActionConst
} from 'react-native-router-flux'

import * as routes from './constants/routes'
import * as strings from './constants/strings/navigation'
import * as icons from './constants/icons'
import colors from './constants/colors'

// Auth Screens
import Login from './containers/auth/Login'
import Register from './containers/auth/Register'

// Training Screens
import TrainingDashboard from './containers/training/Dashboard'
import Workouts from './containers/training/Workouts'
import Workout from './containers/training/Workout'
import WorkoutSession from './containers/training/WorkoutSession'
import CreateWorkout from './containers/training/CreateWorkout'
import CardioPresets from './containers/training/CardioPresets'
import CardioWorkout from './containers/training/CardioPreset'
import CardioSession from './containers/training/CardioSession'
import Exercises from './containers/training/Exercises'

// Diary Screens
import Diary from './containers/diary/Diary'
import WorkoutLog from './containers/diary/WorkoutLog'
import CardioLog from './containers/diary/CardioLog'

// Performance Screens
import Performance from './containers/performance/Performance'

// User Screens
import Settings from './containers/settings/Settings'

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: colors.navy,
    borderBottomWidth: 0,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 2,
    shadowColor: colors.navy,
    shadowOpacity: 0.5
  },
  tabBar: {
    height: 45,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopWidth: 0.5,
    borderTopColor: colors.bordergrey
  },
  tabBarIconContainer: {
    height: 45
  },
  title: {
    fontSize: 17,
    fontWeight: '500',
    color: colors.white
  },
  rightButtonText: {
    color: colors.white,
    paddingRight: 5
  },
  backButtonText: {
    color: colors.white,
    paddingLeft: 5
  }
})

const createReducer = (params) => {
  const defaultReducer = Reducer(params)
  return (state, action) => {
    console.log("ACTION:", action)
    return defaultReducer(state, action)
  }
}

const TabIcon = ({ name, selected }) => {
  let iconName
  switch(name) {
    case routes.TAB_TRAINING:
      iconName = icons.TRAINING
      break
    case routes.TAB_DIARY:
      iconName = icons.DIARY
      break
    case routes.TAB_PERFORMANCE:
      iconName = icons.PERFORMANCE
      break
    case routes.TAB_SETTINGS:
      iconName = icons.SETTINGS
      break
  }
  return (
    <Icon
      size={20}
      name={iconName}
      color={selected ?
        colors.navy :
        colors.grey
      }
    />
  )
}

export default () => (
  <Router
    createReducer={this.createReducer}
    titleStyle={styles.title}
    tabBarStyle={styles.tabBar}
    tabBarIconContainerStyle={styles.tabBarIconContainer}
    navigationBarStyle={styles.navBar}
    sceneStyle={styles.scene}
    backButtonTextStyle={styles.backButtonText}
    rightButtonTextStyle={styles.rightButtonText}
    backButtonImage={require('../resources/icons/back-light.png')}>
    <Scene
      key={routes.LOGIN}
      component={Login}
      type={ActionConst.RESET}
      hideNavBar
    />
    <Scene
      key={routes.REGISTER}
      component={Register}
      hideNavBar
    />
    <Scene
      key={routes.APP}
      type={ActionConst.RESET}
      tabs={true}
      hideNavBar={false}>
      <Scene
        key={routes.TAB_TRAINING}
        title={strings.TRAINING}
        icon={TabIcon}>
        <Scene
          key={routes.TRAINING}
          title={strings.TRAINING}
          component={TrainingDashboard}
          type={ActionConst.REPLACE}
          hideNavBar={false}
          hideTabBar={false}
          initial
        />
        <Scene
          key={routes.WORKOUTS}
          title={strings.WORKOUTS}
          component={Workouts}
        />
        <Scene
          key={routes.WORKOUT}
          component={Workout}
        />
        <Scene
          key={routes.WORKOUT_SESSION}
          component={WorkoutSession}
          type={ActionConst.RESET}
          hideNavBar
          hideTabBar
        />
        <Scene
          key={routes.CREATE_WORKOUT}
          title={strings.CREATE_WORKOUT}
          component={CreateWorkout}
        />
        <Scene
          key={routes.EXERCISES}
          title={strings.EXERCISES}
          component={Exercises}
        />
        <Scene
          key={routes.CARDIO_PRESETS}
          title={strings.CARDIO_PRESETS}
          component={CardioPresets}
          hideTabBar
        />
        <Scene
          key={routes.CARDIO_WORKOUT}
          component={CardioWorkout}
        />
        <Scene
          key={routes.CARDIO_SESSION}
          component={CardioSession}
          type={ActionConst.RESET}
          hideNavBar
          hideTabBar
        />
      </Scene>
      <Scene
        key={routes.TAB_DIARY}
        title={strings.DIARY}
        icon={TabIcon}>
        <Scene
          key={routes.DIARY}
          title={strings.DIARY}
          component={Diary}
          initial
        />
        <Scene
          key={routes.WORKOUT_LOG}
          title={strings.WORKOUT_LOG}
          component={WorkoutLog}
          hideTabBar
        />
        <Scene
          key={routes.CARDIO_LOG}
          title={strings.CARDIO_LOG}
          component={CardioLog}
          hideTabBar
        />
      </Scene>
      <Scene
        key={routes.TAB_PERFORMANCE}
        title={strings.PERFORMANCE}
        icon={TabIcon}>
        <Scene
          key={routes.PERFORMANCE}
          title={strings.PERFORMANCE}
          component={Performance}
          initial
        />
      </Scene>
      <Scene
        key={routes.TAB_SETTINGS}
        icon={TabIcon}>
        <Scene
          key={routes.SETTINGS}
          component={Settings}
          initial
        />
      </Scene>
    </Scene>
  </Router>
)