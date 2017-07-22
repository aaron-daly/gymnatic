import { bodyPartProportionsSelector } from '../bodyPartProportionsSelector'

const mockState = (aggregatedReps, exercises) => ({
  aggregatedReps: {
    aggregatedReps
  },
  exercises: {
    exercises
  }
})

describe('bodyPartProportionsSelector unit tests', () => {
  it('should work for no data', () => {
    const aggregatedReps = {}
    const state = mockState(aggregatedReps, null)
    const expectedSelection = []
    expect(bodyPartProportionsSelector(state)).toEqual(expectedSelection)
  })

  it('should work for one body part', () => {
    const aggregatedReps = {
      'BENCH': 300
    }

    const exercises = {
      'BENCH': {bodyPart: 'CHEST'}
    }

    const state = mockState(aggregatedReps, exercises)

    const expectedSelection = [
      {
        category: 'CHEST',
        proportion: 100
      }
    ]

    expect(bodyPartProportionsSelector(state)).toEqual(expectedSelection)
  })

  it('should work for more than one body part', () => {
    const aggregatedReps = {
      'BENCH': 300,
      'DEADLIFT': 100
    }

    const exercises = {
      'BENCH': {bodyPart: 'CHEST'},
      'DEADLIFT': {bodyPart: 'BACK'}
    }

    const state = mockState(aggregatedReps, exercises)

    const expectedSelection = [
      {
        category: 'CHEST',
        proportion: 75
      },
      {
        category: 'BACK',
        proportion: 25
      }
    ]

    expect(bodyPartProportionsSelector(state)).toEqual(expectedSelection)
  })

  it('should work for more more than one entries of more than one body part', () => {
    const aggregatedReps = {
      'BENCH': 300,
      'FLIES': 100,
      'DEADLIFT': 100,
      'ROWS': 100
    }

    const exercises = {
      'BENCH': {bodyPart: 'CHEST'},
      'FLIES': {bodyPart: 'CHEST'},
      'DEADLIFT': {bodyPart: 'BACK'},
      'ROWS': {bodyPart: 'BACK'}
    }

    const state = mockState(aggregatedReps, exercises)

    const expectedSelection = [
      {
        category: 'CHEST',
        proportion: 67
      },
      {
        category: 'BACK',
        proportion: 33
      }
    ]

    expect(bodyPartProportionsSelector(state)).toEqual(expectedSelection)
  })
})