import {
  generateLinearIntervals,
  generateGradientIntervals,
  generateAugmentedIntervals
} from '../CardioIntervalGenerators'

describe('generateLinearIntervals unit tests', () => {
  it('should generate a list of intervals when given a distance, interval distance and velocity', () => {
    const distance = 1500
    const intervalDistance = 500
    const velocity = 5
    expect(generateLinearIntervals(distance, intervalDistance, velocity)).toEqual([
      {
        x: 0,
        y: 0
      },
      {
        x: 100,
        y: 500
      },
      {
        x: 200,
        y: 1000
      },
      {
        x: 300,
        y: 1500
      },
    ])
  })
})

describe('generateGradientIntervals unit tests', () => {
  it('should generate a gradient set of intervals when gradient is positive', () => {
    const distance = 1500
    const intervalDistance = 500
    const velocity = 5
    const gradient = 0.25
    expect(generateGradientIntervals(distance, intervalDistance, velocity, gradient)).toEqual([
      { x: 0, y: 0 },
      { x: 158, y: 500 },
      { x: 299, y: 1000 },
      { x: 424, y: 1500 }
    ])
  })

  it('should generate a gradient set of intervals when gradient is negative', () => {
    const distance = 1500
    const intervalDistance = 500
    const velocity = 5
    const gradient = -0.25
    expect(generateGradientIntervals(distance, intervalDistance, velocity, gradient)).toEqual([
      { x: 0, y: 0 },
      { x: 125, y: 500 },
      { x: 266, y: 1000 },
      { x: 424, y: 1500 }
    ])
  })
})