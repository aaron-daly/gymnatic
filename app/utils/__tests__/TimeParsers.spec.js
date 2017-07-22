import {
  secondsToDigitString,
  secondsToString
} from '../TimeParsers'

describe('secondsToString unit tests', () => {
  it('should return a string for seconds only', () => {
    expect(secondsToString(2)).toEqual('2s')
  })

  it('should return a string for seconds and minutes', () => {
    expect(secondsToString(62)).toEqual('1m 2s')
  })

  it('should return a string for hours, minutes and seconds', () => {
    expect(secondsToString(60*60+62)).toEqual('1h 1m 2s')
  })

  it('should return empty string for zero seconds', () => {
    expect(secondsToString(0)).toEqual('')
  })

  it('should return null for negative value', () => {
    expect(secondsToString(-20)).toBe(null)
  })
})

describe('secondsToDigitString unit tests', () => {
  it('should return a string for seconds only', () => {
    expect(secondsToDigitString(2)).toEqual('0:02')
  })

  it('should return a string for seconds and minutes', () => {
    expect(secondsToDigitString(62)).toEqual('1:02')
  })

  it('should return a string for hours, minutes and seconds', () => {
    expect(secondsToDigitString(60*60+62)).toEqual('1:01:02')
  })

  it('should return 0:00 zero seconds', () => {
    expect(secondsToDigitString(0)).toEqual('0:00')
  })

  it('should return null for negative value', () => {
    expect(secondsToDigitString(-20)).toBe(null)
  })
})