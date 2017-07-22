import React, { PropTypes } from 'react'
import { ScrollView } from 'react-native'
import { map } from 'lodash'

import CardioPresetListRow from './CardioPresetListRow'

const CardioPresetList = ({ cardioPresets, onCardioPresetPress }) => (
  <ScrollView>
    {map(cardioPresets, cardioPreset =>
      <CardioPresetListRow
        key={cardioPreset._id}
        {...cardioPreset}
        onPress={() => onCardioPresetPress(cardioPreset._id)}
      />
    )}
  </ScrollView>
)

CardioPresetList.propTypes = {
  cardioPresets: PropTypes.arrayOf(PropTypes.shape({

  }).isRequired).isRequired,
  onCardioPresetPress: PropTypes.func.isRequired
}

export default CardioPresetList