import React, { PropTypes } from 'react'
import _ from 'lodash'

import { InfoCard } from '../common'
import { secondsToString } from '../../utils/TimeParsers'
import * as strings from '../../constants/strings/workouts'
import colors from '../../constants/colors'

const WorkoutListRow = ({ title, description, category, duration, onPress }) => (
  <InfoCard
    title={title}
    description={description}
    attributes={[
      category && {
        label: strings.CATEGORY_LABEL,
        value: _.startCase(_.toLower(category)),
        color: colors.pink
      },
      duration && {
        label: strings.DURATION_LABEL,
        value: secondsToString(duration),
        color: colors.blue
      }
    ].filter(Boolean)}
    onPress={onPress}
  />
)

WorkoutListRow.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  category: PropTypes.string.isRequired,
  duration: PropTypes.number,
  onPress: PropTypes.func.isRequired
}

export default WorkoutListRow