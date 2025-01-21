// src/components/ui/button.jsx

import React from "react";

const Button = ({ children, onClick, disabled }) => {
  return (
    <button className="button" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
