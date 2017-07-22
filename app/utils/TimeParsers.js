/**
 * @param s - seconds
 * @returns {string} - formatted seconds to string - 1h 20m 42s
 */
export const secondsToString = (s) => {
  if (s < 0) {
    return null
  }

  const secs = parseInt(s % 60),
    mins = parseInt((s / 60) % 60),
    hrs  = parseInt((s / 60 / 60) % 24)
  const seconds = (secs > 0) ? `${secs}s` : ''
  const minutes = (mins > 0) ? `${mins}m ` : ''
  const hours   = (hrs > 0) ? `${hrs}h ` : ''
  return `${hours}${minutes}${seconds}`
}

/**
 * @param s - seconds
 * @returns {string} formatted seconds to digit string - 1:20:42
 */
export const secondsToDigitString = (s) => {
  if (s < 0) {
    return null
  }
  const secs = parseInt(s % 60),
    mins = parseInt((s / 60) % 60),
    hrs  = parseInt((s / 60 / 60) % 24),
    seconds = (secs > 9) ? secs : `0${secs}`,
    minutes = (hrs < 1) ? mins : `0${mins}`,
    hours   = (hrs > 0)  ? `${hrs}:`  : ''
  return `${hours}${minutes}:${seconds}`
}