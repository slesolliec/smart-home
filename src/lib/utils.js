
function minString(str, min = 5, padRight = true) {
  str = str.toString()
  while (str.length < min) {
    if (padRight) {
      str += ' '
    } else {
      str = ' ' + str
    }
  }
  return str
}

export { minString }
