import React, { useState } from "react";

const TextInput = ({
  divClassName = "",
  inputClassName = "",
  startIcon,
  endIcon,
  ...props
}) => {
  const [type, setType] = useState(props.type)
  const [value, setValue] = useState(null)

  const toggleType = () => {
    setType(type === 'password' ? 'text' : 'password')
  }

  const onChange = (e) => {
    if (props.onChange) {
      props.onChange(e.currentTarget.value)
    }
  }

  return (
    <div
      className={`border-style-decoration w-full flex items-center ${divClassName}`}
    >
      {startIcon && <button className="ml-6">{startIcon}</button>}
      <input
        className={`!bg-transparent text-white p-4 px-6 w-full placeholder:text-white ${inputClassName}`}
        {...props}
        type={type}
        onChange={onChange}
      />
      {endIcon && <button className="mr-6" onClick={toggleType}>{endIcon}</button>}
    </div>
  )
};

export default TextInput;
