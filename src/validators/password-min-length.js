export const validatePasswordMinLength = (value) => {
  if (value.length < 8) {
    return "Password must be at least 8 characters long"
  }

  return null
}
