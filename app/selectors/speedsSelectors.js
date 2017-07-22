import { createSelector } from 'reselect'
import { chain, mapValues } from 'lodash'

export const VISIBILITY_OPTIONS = [
  {label: 'Last 7', value: 7},
  {label: 'Last 14', value: 14},
  {label: 'All', value: 10000}
]

const getAggregatedSpeeds = state => state.aggregatedSpeeds.aggregatedSpeeds
const getAggregatedSpeedsFilter = state => state.aggregatedSpeeds.filter
const getAggregatedSpeedsVisibilityFilter = state => state.aggregatedSpeeds.visibilityFilter
const getCardioPresets = state => state.cardioPresets.cardioPresets

const parseSpeedEntry = (averageSpeed, timestamp) => ({ averageSpeed, timestamp })

/**
 * selects aggregatedSpeeds the aggregated speeds filter and visibility filter from state.
 * filters the aggregatedSpeeds by the filter provided and takes the last n items from the
 * filtered aggregatedSpeeds, where n is the visibility filter
 */
export const speedImprovementDataSelector = createSelector(
  [ getAggregatedSpeeds, getAggregatedSpeedsFilter, getAggregatedSpeedsVisibilityFilter ],
  (aggregatedSpeeds, filter, visibilityFilter) =>
    chain(aggregatedSpeeds)
      .get(filter)
      .map(parseSpeedEntry)
      .takeRight(visibilityFilter)
      .value()
)

/**
 * selects cardio presets from state and returns a map in the shape:
 * { cardioPresetId: cardioPresetTitle }
 */
export const cardioPresetsSelector = createSelector(
  [ getCardioPresets ],
  (cardioPresets) =>  mapValues(cardioPresets, val => val.title)
)

/**
 * selects cardio presets from state and the aggregatedSpeedsFilter from state.
 * The aggregatedSpeedsFilter is a cardioPresetId and is used to select the
 * cardio preset out of the cardio presets in state.
 */
export const selectedPresetSelector = createSelector(
  [ cardioPresetsSelector, getAggregatedSpeedsFilter ],
  (cardioPresets, selectedPresetId) => cardioPresets[selectedPresetId]
)