export const parseNumericInput = value => value === '' ? 0 : parseInt(value)
export const parseNumericValue = num => `${num || '0'}`