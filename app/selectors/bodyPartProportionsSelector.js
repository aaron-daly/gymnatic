import { map, reduce } from 'lodash'
import { createSelector } from 'reselect'

const getAggregatedReps = state => state.aggregatedReps.aggregatedReps
const getExercises = state => state.exercises.exercises

/**
 * selects aggregatedReps and exercises from state and sorts
 * the aggregatedReps by exercise body parts
 */
export const bodyPartProportionsSelector = createSelector(
  [ getAggregatedReps, getExercises ],
  (aggregatedReps, exercises) => {
    let bodyPartCounts = {}
    map(aggregatedReps, (exerciseReps, exerciseId) => {
      const { bodyPart } = exercises[exerciseId]
      if (bodyPartCounts[bodyPart]) {
        bodyPartCounts[bodyPart] += exerciseReps
      } else {
        bodyPartCounts[bodyPart] = exerciseReps
      }
    })

    const total = reduce(bodyPartCounts, (acc, cur) => acc + cur, 0)

    return map(bodyPartCounts, (proportion, bodyPart) => ({
      proportion: Math.round((proportion / total) * 100),
      category: bodyPart
    }))
  }
)