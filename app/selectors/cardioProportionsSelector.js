import { createSelector } from 'reselect'
import { map, reduce } from 'lodash'

const getAggregatedCardioTimes = state => state.aggregatedCardioTimes.aggregatedCardioTimes

/**
 * selects aggregatedCardioTimes from state and parses the data a graph-friendly format
 */
export const cardioProportionsSelector = createSelector(
  [ getAggregatedCardioTimes ],
  (aggregatedCardioTimes) => {
    const total = reduce(aggregatedCardioTimes, (acc, cur) => acc + cur, 0)
    return map(aggregatedCardioTimes, (time, exercise) => ({
      proportion: Math.round((time / total) * 100),
      category: exercise
    }))
  }
)