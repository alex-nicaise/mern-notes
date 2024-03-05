import { useServerMessages } from "../context/ServerMessageContext";
import { LuAlertOctagon, LuCheckCircle } from "react-icons/lu";

const ServerFeedbackDiv = ({ alt }: { alt?: string }) => {
  const { serverMessage } = useServerMessages();

  if (alt === "success") {
    return (
      <div className="flex text-lg bg-green-500 text-green-900 p-2 mt-3 rounded-lg justify-center items-center">
        <LuCheckCircle className="text-xl mr-1" /> {serverMessage}
      </div>
    );
  } else {
    return (
      <div className="flex bg-rose-500 text-rose-900 p-2 mt-3 rounded-lg justify-center items-center">
        <LuAlertOctagon className="text-xl mr-1" /> {serverMessage}
      </div>
    );
  }
};

export default ServerFeedbackDiv;
