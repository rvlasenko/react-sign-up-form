import React from "react"
import styles from "./App.module.css"

const validateEmail = (email) => {
  if (!email.trim()) return "Email is required"
  if (email.length < 6) return "Email must be at least 6 characters"
  if (!/\S+@\S+\.\S+/.test(email)) return "Email is invalid"
  return null
}

const validatePassword = (password) => {
  if (!password.trim()) return "Password is required"
  if (password.length < 6) return "Password must be at least 6 characters"
  return null
}

const validatePasswordRepeat = (password, passwordRepeat) => {
  if (!passwordRepeat.trim()) return "Please confirm password"
  if (password !== passwordRepeat) return "Passwords do not match"
  return null
}

export default function App() {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    passwordRepeat: "",
  })
  const [errors, setErrors] = React.useState({})

  const buttonRef = React.useRef(null)
  const isFormValid = Object.values(errors).every((error) => error === null)

  React.useEffect(() => {
    if (
      isFormValid &&
      validateEmail(formData.email) === null &&
      validatePassword(formData.password) === null &&
      validatePasswordRepeat(formData.password, formData.passwordRepeat) ===
        null
    ) {
      buttonRef.current.focus()
    }
  }, [isFormValid, formData])

  const sendFormData = (formData) => {
    console.log(formData)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const newErrors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      passwordRepeat: validatePasswordRepeat(
        formData.password,
        formData.passwordRepeat
      ),
    }

    setErrors(newErrors)

    if (Object.values(newErrors).every((error) => error === null)) {
      sendFormData(formData)
    }
  }

  const validateField = (field, value) => {
    switch (field) {
      case "email":
        return validateEmail(value)
      case "password":
        return validatePassword(value)
      case "passwordRepeat":
        return validatePasswordRepeat(formData.password, value)
      default:
        return null
    }
  }

  const handleOnChange = (field) => (event) => {
    const value = event.target.value
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleOnBlur = (field) => (event) => {
    const value = event.target.value

    if (value.length > 3) {
      setErrors((prev) => ({
        ...prev,
        [field]: validateField(field, value),
      }))
    }
  }

  return (
    <form className={styles["register-form"]} onSubmit={handleSubmit}>
      <h2 className={styles["register-form__heading"]}>Register</h2>
      <div className={styles["register-form__inputs"]}>
        <input
          className={styles["register-form__input"]}
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleOnChange("email")}
          onBlur={handleOnBlur("email")}
        />
        {errors.email && (
          <p className={styles["register-form__input--error"]}>
            {errors.email}
          </p>
        )}
        <input
          className={styles["register-form__input"]}
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleOnChange("password")}
          onBlur={handleOnBlur("password")}
        />
        {errors.password && (
          <p className={styles["register-form__input--error"]}>
            {errors.password}
          </p>
        )}
        <input
          className={styles["register-form__input"]}
          type="password"
          name="passwordRepeat"
          placeholder="Repeat Password"
          value={formData.passwordRepeat}
          onChange={handleOnChange("passwordRepeat")}
          onBlur={handleOnBlur("passwordRepeat")}
        />
        {errors.passwordRepeat && (
          <p className={styles["register-form__input--error"]}>
            {errors.passwordRepeat}
          </p>
        )}
      </div>
      <button
        className={styles["register-form__button"]}
        type="submit"
        disabled={!isFormValid}
        ref={buttonRef}
      >
        Register
      </button>
    </form>
  )
}
