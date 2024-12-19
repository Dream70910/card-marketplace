import React, { useEffect, useRef, useState } from "react";

const TextInput = ({
  divClassName = "",
  inputClassName = "",
  startIcon,
  endIcon,
  defaultType = "text",
  defaultValue = "",
  ...props
}) => {
  const [type, setType] = useState(props.type)
  const [value, setValue] = useState(null)
  const calendarRef = useRef(null)

  useEffect(() => {
    if (props.onChange) {
      props.onChange(value)
    }
  }, [value])

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  useEffect(() => {
    setType(defaultType)
  }, [defaultType])

  const toggleType = () => {
    if (type === "password")
      setType('text')

    if (type === "text")
      setType('password')
  }

  const openCalendar = () => {
    calendarRef.current.focus()

    setTimeout(() => {
      calendarRef.current.click()
    }, 100);
  }

  return (
    <div
      className={`border-style-decoration w-full flex items-center ${divClassName}`}

    >
      {startIcon && <button className="ml-6">{startIcon}</button>}
      <input
        className={`!bg-transparent text-white p-4 px-6 w-full placeholder:text-white ${inputClassName}`}
        value={value}
        {...props}
        type={type}
        onChange={(e) => setValue(e.currentTarget.value)}
        ref={calendarRef}
      />
      {endIcon ?
        type === 'date' ?
          <button className="mr-6" onClick={openCalendar}>{endIcon}</button>
          :
          < button className="mr-6" onClick={toggleType}>{endIcon}</button>
        : ""
      }
    </div >
  )
};

export default TextInput;
