import { createSelector } from 'reselect'
import { mapValues, chain } from 'lodash'

export const VISIBILITY_OPTIONS = [
  {label: 'Last 7', value: 7},
  {label: 'Last 14', value: 14},
  {label: 'All', value: 10000}
]

const getAggregatedMaxLifts = state => state.aggregatedMaxLifts.aggregatedMaxLifts
const getAggregatedMaxLiftsFilter = state => state.aggregatedMaxLifts.filter
const getAggregatedMaxLiftsVisibilityFilter = state => state.aggregatedMaxLifts.visibilityFilter
const getExercises = state => state.exercises.exercises

export const getExerciseMaxLiftsFromFilter = (filter) => (datum, timestamp) => datum[filter] ?
  ({ weight: datum[filter], timestamp }) : null

export const exerciseImprovementDataSelector = createSelector(
  [ getAggregatedMaxLifts, getAggregatedMaxLiftsFilter, getAggregatedMaxLiftsVisibilityFilter ],
  (aggregatedMaxLifts, filter, visibilityFilter) => {
    return chain(aggregatedMaxLifts)
      .map(getExerciseMaxLiftsFromFilter(filter))
      .filter(Boolean)
      .takeRight(visibilityFilter)
      .value()
  }
)

export const exercisesSelector = createSelector(
  getExercises,
  (exercises) => mapValues(exercises, val => val.name)
)

export const selectedExerciseSelector = createSelector(
  [ getExercises, getAggregatedMaxLiftsFilter ],
  (exercises, selectedExerciseId) => {
    return exercises[selectedExerciseId] ? exercises[selectedExerciseId].name : null
  }
)