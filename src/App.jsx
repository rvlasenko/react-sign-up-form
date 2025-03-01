import React from "react"
import { Input } from "./components"
import { useForm } from "react-hook-form"
import { registerFormSchema } from "./register-form-schema"
import { yupResolver } from "@hookform/resolvers/yup"

export default function App() {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { touchedFields, isValid, errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      passwordRepeat: "",
    },
    resolver: yupResolver(registerFormSchema),
    mode: "onTouched",
  })

  const buttonRef = React.useRef(null)

  const onSubmit = (formData) => {
    console.log(formData)
  }

  React.useEffect(() => {
    if (isValid) {
      buttonRef.current.focus()
    }
  }, [isValid])

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          alt="My Company"
          src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign up form
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="email"
              label="Email"
              error={errors.email?.message}
              {...register("email")}
            />

            <Input
              type="password"
              label="Password"
              error={errors.password?.message}
              {...register("password", {
                onChange: () =>
                  touchedFields.passwordRepeat && trigger("passwordRepeat"),
              })}
            />

            <Input
              type="password"
              label="Confirm Password"
              error={errors.passwordRepeat?.message}
              {...register("passwordRepeat")}
            />

            <div>
              <button
                type="submit"
                disabled={!isValid}
                ref={buttonRef}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
