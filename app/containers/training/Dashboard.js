import React from 'react'
import { Actions as routerActions } from 'react-native-router-flux'

import ViewContainer from '../../components/common/ViewContainer'
import * as routes from '../../constants/routes'
import colors from '../../constants/colors'
import DashboardButton from '../../components/dashboard/DashboardButton'

const Dashboard = () => (
  <ViewContainer>
    <DashboardButton
      backgroundColor={colors.blue}
      iconName={'dumbbell'}
      text={'Track Workout'}
      onPress={routerActions[routes.WORKOUTS]}
    />
    <DashboardButton
      backgroundColor={colors.green}
      iconName={'run'}
      text={'Track Cardio'}
      onPress={routerActions[routes.CARDIO_PRESETS]}
    />
  </ViewContainer>
)

export default Dashboard