import React, { PropTypes } from 'react'
import _ from 'lodash'

import { InfoCard } from '../common'
import * as strings from '../../constants/strings/cardio'
import colors from '../../constants/colors'

const CardioPresetListRow = ({ title, description, exercise, distance, intervalDistance, distanceMetric, onPress }) => (
    <InfoCard
      title={title}
      description={description}
      attributes={[
        exercise && {
          label: strings.EXERCISE_LABEL,
          value: _.startCase(_.toLower(exercise)),
          color: colors.pink
        },
        distance && {
          label: strings.DISTANCE_LABEL,
          value: `${distance}${_.toLower(distanceMetric)}`,
          color: colors.blue
        },
        intervalDistance && {
          label: strings.INTERVAL_LABEL,
          value: `${intervalDistance}${_.toLower(distanceMetric)}`,
          color: colors.green
        }
      ].filter(Boolean)}
      onPress={onPress}
    />
)

CardioPresetListRow.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  exercise: PropTypes.string.isRequired,
  distance: PropTypes.number.isRequired,
  intervalDistance: PropTypes.number.isRequired,
  distanceMetric: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
}

export default CardioPresetListRow