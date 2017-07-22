import {
  exerciseImprovementDataSelector,
  selectedExerciseSelector,
  exercisesSelector
} from '../maxLiftsSelectors'

const mockState = (aggregatedMaxLifts, filter, visibilityFilter, exercises) => ({
  aggregatedMaxLifts: {
    aggregatedMaxLifts,
    filter,
    visibilityFilter
  },
  exercises: {
    exercises
  }
})

describe('exerciseImprovementDataSelector unit tests', () => {
  it('should work for no data', () => {
    const state = mockState({}, null, null, null)
    const expectedSelection = []
    expect(exerciseImprovementDataSelector(state)).toEqual(expectedSelection)
  })

  it('should work for selected exercise not found', () => {
    const aggregatedMaxLifts = {
      0: {'BENCH': 50}
    }

    const filter = 'SQUAT'

    const state = mockState(aggregatedMaxLifts, filter, null, null)

    const expectedSelection = []

    expect(exerciseImprovementDataSelector(state)).toEqual(expectedSelection)
  })


  it('should work for selected exercise found once', () => {
    const aggregatedMaxLifts = {
      '0': {'BENCH': 50}
    }

    const filter = 'BENCH'

    const visibilityFilter = 7

    const state = mockState(aggregatedMaxLifts, filter, visibilityFilter, null)

    const expectedSelection = [
      {timestamp: '0', weight: 50}
    ]

    expect(exerciseImprovementDataSelector(state)).toEqual(expectedSelection)
  })

  it('should work for selected exercise found more than once', () => {
    const aggregatedMaxLifts = {
      '0': {'BENCH': 50},
      '1': {'BENCH': 60}
    }

    const filter = 'BENCH'

    const visibilityFilter = 7

    const state = mockState(aggregatedMaxLifts, filter, visibilityFilter, null)

    const expectedSelection = [
      {timestamp: '0', weight: 50},
      {timestamp: '1', weight: 60}
    ]

    expect(exerciseImprovementDataSelector(state)).toEqual(expectedSelection)
  })

  it('should work for selected exercise found multiple times and visibility filter set to 7', () => {
    const aggregatedMaxLifts = {
      '0': {'BENCH': 50},
      '1': {'BENCH': 60},
      '2': {'BENCH': 40},
      '3': {'BENCH': 60},
      '4': {'BENCH': 40},
      '5': {'BENCH': 60},
      '6': {'BENCH': 40},
      '7': {'BENCH': 50},
      '8': {'BENCH': 40},
    }

    const filter = 'BENCH'

    const visibilityFilter = 7

    const state = mockState(aggregatedMaxLifts, filter, visibilityFilter, null)

    expect(exerciseImprovementDataSelector(state).length).toBe(7)
  })

  it('should work for selected exercise found multiple times and visibility filter set to 14', () => {
    const aggregatedMaxLifts = {
      '0': {'BENCH': 50},
      '1': {'BENCH': 60},
      '2': {'BENCH': 40},
      '3': {'BENCH': 60},
      '4': {'BENCH': 40},
      '5': {'BENCH': 60},
      '6': {'BENCH': 40},
      '7': {'BENCH': 50},
      '8': {'BENCH': 40},
      '9': {'BENCH': 50},
      '10': {'BENCH': 60},
      '11': {'BENCH': 40},
      '12': {'BENCH': 60},
      '13': {'BENCH': 40},
      '14': {'BENCH': 60},
      '15': {'BENCH': 40},
      '16': {'BENCH': 50},
      '17': {'BENCH': 40},
    }

    const filter = 'BENCH'

    const visibilityFilter = 14

    const state = mockState(aggregatedMaxLifts, filter, visibilityFilter, null)

    expect(exerciseImprovementDataSelector(state).length).toBe(14)
  })

  it('should work for selected exercise found multiple times and visibility filter set to 10000 (essentially view all)', () => {
    const aggregatedMaxLifts = {
      '0': {'BENCH': 50},
      '1': {'BENCH': 60},
      '2': {'BENCH': 40},
      '3': {'BENCH': 60},
      '4': {'BENCH': 40},
      '5': {'BENCH': 60},
      '6': {'BENCH': 40},
      '7': {'BENCH': 50},
      '8': {'BENCH': 40},
      '9': {'BENCH': 50},
      '10': {'BENCH': 60},
      '11': {'BENCH': 40},
      '12': {'BENCH': 60},
      '13': {'BENCH': 40},
      '14': {'BENCH': 60},
      '15': {'BENCH': 40},
      '16': {'BENCH': 50},
      '17': {'BENCH': 40},
    }

    const filter = 'BENCH'

    const visibilityFilter = 10000

    const state = mockState(aggregatedMaxLifts, filter, visibilityFilter, null)

    expect(exerciseImprovementDataSelector(state).length).toBe(18)
  })
})

// export const selectedExerciseSelector = createSelector(
//   [ getExercises, getAggregatedMaxLiftsFilter ],
//   (exercises, selectedExerciseId) => {
//     return exercises[selectedExerciseId] ? exercises[selectedExerciseId].name : null
//   }
// )
describe('selectedExerciseSelector unit tests', () => {
  it('should work for no data', () => {
    const filter = 'SQUAT'
    const exercises = {}
    const state = mockState(null, filter, null, exercises)
    expect(selectedExerciseSelector(state)).toEqual(null)
  })

  it('should work when exercise exists but with no name attribute', () => {
    const filter = 'SQUAT'
    const exercises = {
      'SQUAT': {}
    }
    const state = mockState(null, filter, null, exercises)
    expect(selectedExerciseSelector(state)).toEqual(undefined)
  })

  it('should work when exercise exists and has the name attribute', () => {
    const filter = 'SQUAT'
    const exercises = {
      'SQUAT': { name: 'Squat' }
    }
    const state = mockState(null, filter, null, exercises)
    expect(selectedExerciseSelector(state)).toEqual('Squat')
  })
})

describe('exercisesSelector unit tests', () => {
  it('should work for no data', () => {
    const state = mockState(null, null, null, {})
    expect(exercisesSelector(state)).toEqual({})
  })

  it('should work when data exists', () => {
    const exercises = {
      'SQUAT': { name: 'Squat' },
      'BENCH': { name: 'Bench Press' }
    }

    const state = mockState(null, null, null, exercises)

    const expectedSelection = {
      'SQUAT': 'Squat',
      'BENCH': 'Bench Press'
    }

    expect(exercisesSelector(state)).toEqual(expectedSelection)
  })
})