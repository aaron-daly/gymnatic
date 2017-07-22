import { map, reduce } from 'lodash'
import { createSelector } from 'reselect'

const getAggregatedReps = state => state.aggregatedReps.aggregatedReps
const getExercises = state => state.exercises.exercises

/**
 * selects aggregatedReps and exercises from state and sorts
 * the aggregatedReps by exercise body parts
 */
export const movementTypeProportionsSelector = createSelector(
  [ getAggregatedReps, getExercises ],
  (aggregatedReps, exercises) => {
    let movementTypeCounts = {}
    map(aggregatedReps, (exerciseReps, exerciseId) => {
      const { category } = exercises[exerciseId]
      if (movementTypeCounts[category]) {
        movementTypeCounts[category] += exerciseReps
      } else {
        movementTypeCounts[category] = exerciseReps
      }
    })

    const total = reduce(movementTypeCounts, (acc, cur) => acc + cur, 0)

    return map(movementTypeCounts, (proportion, movementType) => ({
      proportion: Math.round((proportion / total) * 100),
      category: movementType
    }))
  }
)
