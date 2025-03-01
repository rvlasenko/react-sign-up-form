import * as yup from "yup"

export const registerFormSchema = yup.object().shape({
  email: yup.string().required("Email is required").email("Email is invalid"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^\S+$/,
      "Password must contain at least one symbol, word, number and no spaces"
    )
    .matches(
      /[a-zA-Z]+/,
      "Password must contain at least one symbol, word, number and no spaces"
    )
    .matches(
      /[0-9]+/,
      "Password must contain at least one symbol, word, number and no spaces"
    )
    .matches(
      /\W+/,
      "Password must contain at least one symbol, word, number and no spaces"
    ),
  passwordRepeat: yup
    .string()
    .required("Password repeat is required")
    .oneOf([yup.ref("password"), null], "Passwords do not match"),
})
