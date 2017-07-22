import { range } from 'lodash'

/**
 * @param trackedIntervals - array of current tracked intervals by the user
 * @param intervalDistance - size of each interval
 * @returns {Number} the distance point of the next interval
 */
export function calculateNextIntervalPoint(trackedIntervals, intervalDistance) {
  if (!trackedIntervals.length) {
    return intervalDistance
  }

  return trackedIntervals[trackedIntervals.length-1].y + intervalDistance
}

/**
 * Calculates the domain of the x-axis for the cardio session graph
 * @param secondsElapsed - total seconds elapsed
 * @param tickSize - the size of each time interval on the x-axis
 * @param numViewableTicks - how many time intervals to show on the x-axis
 * @returns {[Float, Float]} - array tuple containing the min and max for the domain
 */
export function calculateGraphXDomain(secondsElapsed, tickSize, numViewableTicks) {
  const xMin = secondsElapsed - (tickSize * numViewableTicks / 2)
  const xMax = secondsElapsed + (tickSize * numViewableTicks / 2)
  return [xMin, xMax]
}

/**
 * calculates the domain of the y-axis for the cardio session graph
 * @param distance - total distance of the cardio session
 * @returns {[number,number]} array tuple containing the min and max for the domain
 */
export function calculateGraphYDomain(distance) {
  return [0, distance]
}

/**
 * Calculates the time interval tick values to be displayed depending on the current
 * seconds elapsed.
 * @param secondsElapsed - total seconds elapsed
 * @param tickSize - the size of each time interval on the x-axis
 * @param numViewableTicks - how many time intervals to show on the x-axis
 * @returns {[*]} - an array time points for the x-axis tick values
 */
export function calculateGraphTickValues(secondsElapsed, tickSize, numViewableTicks) {
  const totalTickSize = (tickSize*numViewableTicks)
  const medianTick = Math.floor(secondsElapsed / totalTickSize) * totalTickSize
  const tickMin = medianTick - totalTickSize
  const tickMax = medianTick + (totalTickSize*2)

  if (tickMin < 0) {
    return range(0, tickMax, tickSize)
  }

  return range(tickMin, tickMax, tickSize)
}

/**
 * prepends 2 empty interval points to an array of tracked intervals to
 * ensure the tracked intervals array is safe for the cardio session graph.
 * The graph requires at least 2 data points.
 * @param trackedIntervals - list of current tracked intervals
 * @returns {[*,*,*]} - tracked intervals with 2 empty interval points prepended
 */
export function parseGraphData(trackedIntervals = []) {
  return [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    ...trackedIntervals
  ]
}