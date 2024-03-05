import React from "react";

const FormError = ({ children }: { children: React.ReactNode }) => {
  return <div className="block text-xs text-red-600 mt-1">{children}</div>;
};

export default FormError;
