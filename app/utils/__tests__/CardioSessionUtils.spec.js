import {
  calculateNextIntervalPoint,
  calculateGraphXDomain,
  calculateGraphYDomain,
  calculateGraphTickValues,
  parseGraphData
} from '../CardioSessionUtils'

describe('calculateNextIntervalPoint unit test', () => {
  it('should calculate the initial interval point', () => {
    expect(calculateNextIntervalPoint([], 250)).toEqual(250)
  })

  it('should calculate the next interval point', () => {
    expect(calculateNextIntervalPoint([{ y: 250 }], 250)).toEqual(500)
  })
})

describe('calculateGraphXDomain unit test', () => {
  it('should calculate the initial graph xDomain', () => {
    expect(calculateGraphXDomain(0, 30, 2)).toEqual([-30, 30])
  })

  it('should calculate the graph xDomain', () => {
    expect(calculateGraphXDomain(60, 30, 2)).toEqual([30, 90])
  })
})

describe('calculateGraphYDomain unit test', () => {
  it('should calculate the graph yDomain', () => {
    expect(calculateGraphYDomain(2500)).toEqual([0, 2500])
  })
})

describe('calculateGraphTickValues unit test', () => {
  it('should calculate the initial graph tick values', () => {
    expect(calculateGraphTickValues(0, 30, 2)).toEqual([0, 30, 60, 90])
  })

  it('should calculate the graph tick values at double tickSize', () => {
    expect(calculateGraphTickValues(60, 30, 2)).toEqual([0, 30, 60, 90, 120, 150])
  })

  it('should calculate the graph tick values at any tickSize multiple', () => {
    expect(calculateGraphTickValues(120, 30, 2)).toEqual([60, 90, 120, 150, 180, 210])
    expect(calculateGraphTickValues(600, 30, 2)).toEqual([540, 570, 600, 630, 660, 690])
  })
})

describe('parseGraphData unit test', () => {
  it('should prepend two empty graph points to the provided data', () => {
    expect(parseGraphData([{ x: 60, y: 250 }])).toEqual([
      { x: 0, y: 0 },
      { x: 0, y: 0 } ,
      { x: 60, y: 250 }
    ])
  })
})