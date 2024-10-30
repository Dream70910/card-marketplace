import React from "react";

const TextInput = ({ divClassName = "", inputClassName = "", ...props }) => (
  <div className={`border-style-decoration w-full ${divClassName}`}>
    <input
      className={`!bg-transparent text-white p-4 px-6 w-full placeholder:text-white ${inputClassName}`}
      {...props}
    />
  </div>
);

export default TextInput;
