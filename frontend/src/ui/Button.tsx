import React from "react";

const Button = ({
  children,
  type,
  alt,
  extraClasses,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  type?: "submit" | "reset" | "button" | undefined;
  alt: string;
  extraClasses?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  if (alt === "primary") {
    return (
      <button
        type={type}
        disabled={disabled}
        className={`bg-emerald-500 hover:bg-emerald-400 py-2 px-4 text-white text-center rounded-full disabled:opacity-75 ${extraClasses}`}
        onClick={onClick}
      >
        {disabled ? "Submitting..." : children}
      </button>
    );
  } else if (alt === "ghost") {
    return (
      <button
        type={type}
        disabled={disabled}
        className={`border-2 border-black dark:border-white text-black dark:text-white hover:dark:bg-black text-center py-2 px-4  rounded-full disabled:opacity-75 ${extraClasses}`}
        onClick={onClick}
      >
        {disabled ? "Submitting..." : children}
      </button>
    );
  } else {
    return "";
  }
};

export default Button;
