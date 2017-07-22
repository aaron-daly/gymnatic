import { map, mapAccum, zip } from 'ramda'
import { range, reverse } from 'lodash'


/*******************************/
/******* Linear Intervals ******/

const intervalRange = (d, id) => id < d ? range(0, d+1, id) : null

const timeAtInterval = v => d => v ? Math.round(d/v) : null

const parseIntervalFromTuple = i => ({ x: i[0], y: i[1] })

/**
 * Generates a list of linear intervals for a cardio bot.
 * @param distance - total distance to be covered
 * @param intervalDistance - interval size
 * @param velocity - m/s
 * @returns {Array} containing generated intervals
 */
export function generateLinearIntervals(distance, intervalDistance, velocity) {
  const distances = intervalRange(distance, intervalDistance),
        times     = map(timeAtInterval(velocity), distances)
  return map(parseIntervalFromTuple, zip(times, distances))
}

/*******************************/
/***** Gradient Intervals ******/

const intervalAccumulator = (x, y) => [x+y, x+y]

const accumulateIntervalDurations = intervalDurations => ([
  0, ...mapAccum(intervalAccumulator, 0, intervalDurations)[1]
])

/**
 * Generates a list of gradient intervals for a cardio bot. The velocity of the
 * intervals increases/decreases over time depending on the gradient value provided.
 * @param distance - total distance to be covered
 * @param intervalDistance - interval size
 * @param velocity - m/s
 * @param gradient - % increase/decrease of velocity over time
 * @returns {Array} containing generated intervals
 */
export function generateGradientIntervals(distance, intervalDistance, velocity, gradient) {
  const gradientPerc = Math.abs(gradient)
  const numIntervals = (distance/intervalDistance)
  const avgIntervalTime = Math.round(intervalDistance/velocity)
  const slowestInterval = parseInt(avgIntervalTime*(1+gradientPerc))
  const fastestInterval = parseInt(avgIntervalTime*(1-gradientPerc))
  const changePerInterval = (slowestInterval-fastestInterval)/parseFloat(numIntervals)

  let intervalDurations = []
  for (let i = 0; i < numIntervals; i++) {
    intervalDurations.push(parseInt(slowestInterval + changePerInterval*i))
  }

  if (gradient > 0) {
    intervalDurations = reverse(intervalDurations)
  }

  const times = accumulateIntervalDurations(intervalDurations)
  const distances = intervalRange(distance, intervalDistance)
  return map(parseIntervalFromTuple, zip(times, distances))
}

/*******************************/
/***** Augmented Intervals *****/

const augmentInterval = m => i => ({ x: parseInt(i.x*(1+m)), y: i.y })


export const generateAugmentedIntervals = (intervals, mult) => map(augmentInterval(mult), intervals)
