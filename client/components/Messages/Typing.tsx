import React from "react";

interface TypingProps {
  user: string;
}

const Typing: React.FC<TypingProps> = ({ user }) => {
    
  return (
    <div className="px-4 md:px-8 py-1 flex items-center gap-3">
      <span className="text-base md:text-xl bg-cyan-800 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold shadow-md">
        {user.charAt(0).toUpperCase()}
      </span>
      <div className="flex flex-col">
        <span className="text-slate-400 text-base md:text-lg font-medium mb-1">
          {user} is typing
        </span>
        <div className="flex items-center space-x-1">
          <span className="block w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="block w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: "120ms" }} />
          <span className="block w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: "240ms" }} />
        </div>
      </div>
    </div>
  );
};

export default Typing;
