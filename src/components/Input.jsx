import React from "react";

export const Input = React.forwardRef(({ type = "text", name, placeholder, onChange, onBlur, value }, ref) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      ref={ref}
      className="p-3 text-black border-2 border-gray-400 rounded-lg focus:outline-none"
    />
  );
});
