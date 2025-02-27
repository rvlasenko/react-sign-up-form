export const validatePasswordSymbols = (value) => {
  if (
    !/^\S+$/.test(value) ||
    !/[a-zA-Z]+/.test(value) ||
    !/[0-9]+/.test(value) ||
    !/\W+/.test(value)
  ) {
    return "Password must contain at least one symbol, word, number and no spaces"
  }

  return null
}
