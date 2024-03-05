import React from "react";

const Button = ({
  children,
  type,
  alt,
  extraClasses,
}: {
  children: React.ReactNode;
  type?: "submit" | "reset" | "button" | undefined;
  alt: string;
  extraClasses?: string;
}) => {
  if (alt === "primary") {
    return (
      <button
        type={type}
        className={`bg-emerald-500 hover:bg-emerald-400 w-fit py-2 px-4 text-white rounded-full ${extraClasses}`}
      >
        {children}
      </button>
    );
  } else {
    return "";
  }
};

export default Button;
