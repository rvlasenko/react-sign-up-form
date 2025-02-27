export const validateEmail = (email) => {
  if (!email.trim()) {
    return "Email is required"
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    return "Email is invalid"
  }

  return null
}
