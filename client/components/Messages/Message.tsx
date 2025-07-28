import { UserType } from "@/models/user";
import Image from "next/image";

// Message component with type for props
export interface MessageProps {
  content: string;
  type: "text" | "file" | "image" | "server";
  user: UserType; // always object!
  own?: boolean; // Optional prop to indicate if the message is from the user
}

// User color utility (consistent color per name)
const userColors = [
  "text-cyan-400",
  "text-green-400",
  "text-purple-400",
  "text-pink-400",
  "text-yellow-400",
  "text-blue-400",
  "text-orange-400",
  "text-red-400",
];
function getUserColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const idx = Math.abs(hash) % userColors.length;
  return userColors[idx];
}

const Message: React.FC<MessageProps> = ({ content, type, own, user }) => {
  return (
    <div
      className={`p-3.5 flex items-start ${
        own ? "justify-end" : "justify-start"
      }`}
    >
      <span
        className={`flex flex-col`}
      >
        {/* Username inside bubble, above message text, colored */}
        {!own && <span className={`mb-1 text-xs md:text-sm font-semibold px-1 select-none ${getUserColor(user?.name || "")}`}>
          {user?.name || "Unknown"}
        </span>}
        <span
          className={`text-base md:text-lg px-4 py-1 rounded text-slate-300 ${
            own ? "bg-cyan-800" : "bg-gray-600"
          }`}
        >
          {type === "text" ? (
            content
          ) : type === "image" ? (
            <div className="relative w-[200px] h-[200px] rounded overflow-hidden">
              <Image
                src={content}
                alt="uploaded image"
                fill
                unoptimized // <-- THIS is needed for data URLs!
                className="object-cover rounded"
              />
            </div>
          ) : (
            <a
              href={content}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-400"
            >
              Download File
            </a>
          )}
        </span>
      </span>
    </div>
  );
};

export default Message;
