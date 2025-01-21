// src/components/ui/alert.jsx

import React from "react";

const Alert = ({ variant, children, className }) => {
  return <div className={`alert ${variant} ${className}`}>{children}</div>;
};

const AlertTitle = ({ children }) => {
  return <h3 className="alert-title">{children}</h3>;
};

const AlertDescription = ({ children }) => {
  return <p className="alert-description">{children}</p>;
};

export { Alert, AlertTitle, AlertDescription };
