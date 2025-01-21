// src/components/ui/input.jsx

import React from "react";

const Input = ({ type, value, onChange, className, disabled, name }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={`input ${className}`}
      disabled={disabled}
      name={name}
    />
  );
};

export default Input;
