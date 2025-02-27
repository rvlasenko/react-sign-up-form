import React from "react"
import { Input } from "./components"
import {
  validateEmail,
  validatePasswordMinLength,
  validatePasswordSymbols,
} from "./validators"
import styles from "./App.module.css"

export default function App() {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    passwordRepeat: "",
  })
  const [formDataErrors, setFormDataErrors] = React.useState({
    isEmailValid: false,
    isPasswordValid: false,
    isPasswordRepeatValid: false,
  })

  const buttonRef = React.useRef(null)
  let isFormValid =
    formDataErrors.isEmailValid &&
    formDataErrors.isPasswordValid &&
    formDataErrors.isPasswordRepeatValid

  const onSubmit = (event) => {
    event.preventDefault()

    console.log(formData)
  }

  React.useEffect(() => {
    if (isFormValid) {
      buttonRef.current.focus()
    }
  }, [isFormValid])

  return (
    <form className={styles["register-form"]} onSubmit={onSubmit}>
      <h2 className={styles["register-form__heading"]}>Register</h2>
      <div className={styles["register-form__inputs"]}>
        <Input
          name="email"
          type="email"
          placeholder="Email"
          setIsValid={(value) =>
            setFormDataErrors((prev) => ({ ...prev, isEmailValid: value }))
          }
          setValue={(value) =>
            setFormData((prev) => ({ ...prev, email: value }))
          }
          value={formData.email}
          validators={[validateEmail]}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          setIsValid={(value) =>
            setFormDataErrors((prev) => ({ ...prev, isPasswordValid: value }))
          }
          setValue={(value) =>
            setFormData((prev) => ({ ...prev, password: value }))
          }
          value={formData.password}
          validators={[validatePasswordMinLength, validatePasswordSymbols]}
        />
        <Input
          name="passwordRepeat"
          type="password"
          placeholder="Repeat Password"
          setIsValid={(value) =>
            setFormDataErrors((prev) => ({
              ...prev,
              isPasswordRepeatValid: value,
            }))
          }
          setValue={(value) =>
            setFormData((prev) => ({ ...prev, passwordRepeat: value }))
          }
          value={formData.passwordRepeat}
          validators={[
            (value) =>
              value === formData.password ? null : "Passwords do not match",
          ]}
          dependencies={["password"]}
          forceValidation={(value) =>
            value.length > 0 && value.length >= formData.password.length
          }
        />
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
