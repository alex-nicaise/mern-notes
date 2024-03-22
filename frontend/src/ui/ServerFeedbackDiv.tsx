import { LuAlertOctagon, LuCheckCircle } from "react-icons/lu";
import { Link } from "react-router-dom";

const ServerFeedbackDiv = ({
  alt,
  message,
}: {
  alt?: string;
  message: string;
}) => {
  if (alt === "success") {
    return (
      <div className="flex bg-blue-500 text-blue-900 py-1 px-4 mt-3 rounded-lg justify-center items-center">
        <LuCheckCircle className="text-xl mr-1" /> {message}
        &nbsp;
        <Link to="/" className="underline">
          Sign in here.
        </Link>
      </div>
    );
  } else {
    return (
      <div className="flex bg-rose-500 text-rose-900 p-2 mt-3 rounded-lg justify-center items-center">
        <LuAlertOctagon className="text-xl mr-1" /> {message}
      </div>
    );
  }
};

export default ServerFeedbackDiv;
