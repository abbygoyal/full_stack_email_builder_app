// src/components/ui/textarea.jsx

import React from "react";

const Textarea = ({ name, value, onChange, rows, className, disabled }) => {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
      className={`textarea ${className}`}
      disabled={disabled}
    />
  );
};

export default Textarea;
