import React from "react";

const Button = ({
  children,
  type,
  alt,
  extraClasses,
  disabled,
}: {
  children: React.ReactNode;
  type?: "submit" | "reset" | "button" | undefined;
  alt: string;
  extraClasses?: string;
  disabled?: boolean;
}) => {
  if (alt === "primary") {
    return (
      <button
        type={type}
        disabled={disabled}
        className={`bg-emerald-500 hover:bg-emerald-400 py-2 px-4 text-white text-center rounded-full disabled:opacity-75 ${extraClasses}`}
      >
        {disabled ? "Submitting..." : children}
      </button>
    );
  } else {
    return "";
  }
};

export default Button;
