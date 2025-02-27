import React from "react"
import styles from "./Input.module.css"
import { validate } from "./utils"

export const Input = ({
  value,
  setValue,
  setIsValid,
  validators,
  dependencies = [],
  forceValidation = () => false,
  ...props
}) => {
  const [error, setError] = React.useState(null)
  const [isDirty, setIsDirty] = React.useState(false)

  const validateField = (currentValue, shouldValidate) => {
    let isValid = false
    let error = null

    if (shouldValidate) {
      isValid = error === null
      error = validate(currentValue, validators)
    }

    setError(error)
    setIsValid(isValid)
  }

  const onChange = ({ target }) => {
    setIsDirty(true)
    setValue(target.value)

    const isForceValidate = forceValidation(target.value)

    validateField(target.value, isForceValidate)
  }

  const onBlur = () => validateField(value, isDirty)

  React.useEffect(() => {
    validateField(value, isDirty)
  }, [...dependencies])

  return (
    <>
      <input
        onChange={onChange}
        onBlur={onBlur}
        className={styles["input"]}
        {...props}
      />
      {error && <p className={styles["input--error"]}>{error}</p>}
    </>
  )
}
