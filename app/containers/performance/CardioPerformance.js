import React from 'react'
import { ScrollView, View } from 'react-native'

import SpeedProgression from './SpeedProgression'
import CardioProportions from './CardioProportions'

const CardioPerformance = () => (
  <ScrollView>
    <SpeedProgression />
    <CardioProportions />
    <View style={{ height: 70 }} />
  </ScrollView>
)

export default CardioPerformance