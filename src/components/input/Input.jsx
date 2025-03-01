export const Input = ({ error, label, ...props }) => {
  return (
    <div>
      <label
        htmlFor={props.name}
        className="block text-sm/6 font-medium text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={props.name}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          {...props}
        />
      </div>
      {error && <p className="text-red-400 mt-2 text-sm">{error}</p>}
    </div>
  )
}
