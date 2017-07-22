import { movementTypeProportionsSelector } from '../movementTypeProportionsSelector'

const mockState = (aggregatedReps, exercises) => ({
  aggregatedReps: {
    aggregatedReps
  },
  exercises: {
    exercises
  }
})

describe('movementTypeProportionsSelector unit tests', () => {
  it('should work for no data', () => {
    const aggregatedReps = {}
    const state = mockState(aggregatedReps, null)
    const expectedSelection = []
    expect(movementTypeProportionsSelector(state)).toEqual(expectedSelection)
  })

  it('should work for one movement type', () => {
    const aggregatedReps = {
      'BENCH': 300
    }

    const exercises = {
      'BENCH': {category: 'COMPOUND'}
    }

    const state = mockState(aggregatedReps, exercises)

    const expectedSelection = [
      {
        category: 'COMPOUND',
        proportion: 100
      }
    ]

    expect(movementTypeProportionsSelector(state)).toEqual(expectedSelection)
  })

  it('should work for more than one movement type', () => {
    const aggregatedReps = {
      'BENCH': 300,
      'FLIES': 100
    }

    const exercises = {
      'BENCH': {category: 'COMPOUND'},
      'FLIES': {category: 'ACCESSORY'}
    }

    const state = mockState(aggregatedReps, exercises)

    const expectedSelection = [
      {
        category: 'COMPOUND',
        proportion: 75
      },
      {
        category: 'ACCESSORY',
        proportion: 25
      }
    ]

    expect(movementTypeProportionsSelector(state)).toEqual(expectedSelection)
  })

  it('should work for more more than one entries of more than one movement type', () => {
    const aggregatedReps = {
      'BENCH': 300,
      'FLIES': 100,
      'DEADLIFT': 100,
      'FACEPULLS': 100
    }

    const exercises = {
      'BENCH': {category: 'COMPOUND'},
      'FLIES': {category: 'ACCESSORY'},
      'DEADLIFT': {category: 'COMPOUND'},
      'FACEPULLS': {category: 'ACCESSORY'}
    }

    const state = mockState(aggregatedReps, exercises)

    const expectedSelection = [
      {
        category: 'COMPOUND',
        proportion: 67
      },
      {
        category: 'ACCESSORY',
        proportion: 33
      }
    ]

    expect(movementTypeProportionsSelector(state)).toEqual(expectedSelection)
  })
})