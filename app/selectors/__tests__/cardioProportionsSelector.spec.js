import { cardioProportionsSelector } from '../cardioProportionsSelector'

const mockState = state => ({ aggregatedCardioTimes: { aggregatedCardioTimes: state } })

describe('cardioProportionsSelector unit test', () => {
  it('should work for no exercises', () => {
    const state = mockState({})
    const expectedSelection = []
    expect(cardioProportionsSelector(state)).toEqual(expectedSelection)
  })

  it('should work for one exercise', () => {
    const state = mockState({
      'BIKE': 500
    })

    const expectedSelection = [
      {category: 'BIKE', proportion: 100}
    ]

    expect(cardioProportionsSelector(state)).toEqual(expectedSelection)
  })

  it('should work for more than one exercise', () => {
    const state = mockState({
      'BIKE': 100,
      'TREADMILL': 200
    })

    const expectedSelection = [
      {category: 'BIKE', proportion: 33},
      {category: 'TREADMILL', proportion: 67}
    ]

    expect(cardioProportionsSelector(state)).toEqual(expectedSelection)
  })
})