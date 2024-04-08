import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";

const LoadingSplash = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);
  return (
    <main className="flex flex-col w-full h-full justify-center items-center dark:bg-gray-950">
      <TailSpin
        visible={true}
        height="50"
        width="50"
        color={`${isDarkMode ? "white" : "black"}`}
        ariaLabel="tail-spin-loading"
        radius="5"
        wrapperStyle={{}}
        wrapperClass=""
      />
      <h1 className="text-xl mt-3">Loading...</h1>
    </main>
  );
};

export default LoadingSplash;
