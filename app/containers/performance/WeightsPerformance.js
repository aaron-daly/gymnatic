import React from 'react'
import { ScrollView, View } from 'react-native'

import MaxLiftsProgression from './MaxLiftsProgression'
import BodyPartProportions from './BodyPartProportions'
import MovementTypeProportions from './MovementTypeProportions'

const WeightsPerformance = () => (
  <ScrollView>
    <MaxLiftsProgression />
    <BodyPartProportions />
    <MovementTypeProportions />
    <View style={{ height: 90 }} />
  </ScrollView>
)

export default WeightsPerformance