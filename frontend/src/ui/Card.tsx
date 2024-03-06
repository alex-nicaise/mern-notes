import React from "react";

const Card = ({
  children,
  id,
  extraClasses,
}: {
  children: React.ReactNode;
  id?: string;
  extraClasses?: string;
}) => {
  return (
    <div
      id={id}
      className={`border border-gray-300 flex flex-col w-full justify-center items-center rounded-lg ${extraClasses}`}
    >
      {children}
    </div>
  );
};

export default Card;
