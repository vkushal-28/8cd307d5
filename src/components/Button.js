import React from "react";

const Button = ({ onClick, children, className, disabled }) => {
  return (
    <button
      onClick={onClick}
      className={`
       text-white drop-shadow-md disabled:opacity-60 disabled:cursor-not-allowed
       px-4 py-3 rounded ${className}`}
      disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
