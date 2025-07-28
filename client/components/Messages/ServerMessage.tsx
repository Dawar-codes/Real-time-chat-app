import Image from "next/image";
import { new_user } from "@/assets";

interface ServerMessageProps {
  content: string;
}

const ServerMessage: React.FC<ServerMessageProps> = ({ content }) => {
  return (
    <p className="px-1 md:px-6 py-1 flex">
      <span className="text-base md:text-lg text-amber-800 italic flex items-center bg-transparent">
        <Image
          src={new_user}
          className="max-w-[20px] mx-2"
          alt="new user joined"
        />
        {content}
      </span>
    </p>
  );
};

export default ServerMessage;
