import React, { useEffect, useState } from "react";

const TextAreaInput = ({
  divClassName = "",
  textAreaClassName = "",
  startIcon,
  endIcon,
  defaultValue = "",
  ...props
}) => {
  const [value, setValue] = useState(null)

  useEffect(() => {
    if (props.onChange)
      props.onChange(value)
  }, [value])

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  return (
    <div
      className={`border-style-decoration w-full flex items-start ${divClassName}`}
    >
      {startIcon && <button className="ml-6 mt-4">{startIcon}</button>}
      <textarea
        className={`!bg-transparent text-white p-4 px-6 w-full outline-none focus:outline-none placeholder:text-white resize-none ${textAreaClassName}`}
        {...props}
        onChange={(e) => setValue(e.currentTarget.value)}
        value={value}
      />
      {endIcon && <button className="mr-6 mt-4">{endIcon}</button>}
    </div>
  )
}

export default TextAreaInput;
