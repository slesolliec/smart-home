
function minString(str, min = 5, padRight = true) {
  try {
    str = str.toString()
  } catch (err) {
    console.log("minString() Could not convert", str, "to string")
    str = '[ERR]'
  }
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
