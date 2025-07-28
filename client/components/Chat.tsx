"use client";

import type { UserType } from "@/models/user";
import Message, { MessageProps } from "./Messages/Message";
import ServerMessage from "./Messages/ServerMessage";
import Typing from "./Messages/Typing";
import { useEffect, useRef } from "react";

// Chat component with type for props
interface ChatProps {
  user: UserType;
  chat?: MessageProps[];
  typing?: string[];
}



const Chat: React.FC<ChatProps> = ({ user, chat = [], typing= [] }) => {

 const scroller = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(!scroller.current) return

        scroller.current.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
    }, [chat, typing])

  return (
    <div className="h-full pb-8 md:p-2">
      <div className="w-full h-full max-h-full rounded-md overflow-y-auto bg-gray-800 pt-2 md:pt-6">
        {chat.map((message, index) => {
          message = { ...message, own: message.user?.id === user?.id };
          return message.type === "server" ? (
            <ServerMessage key={index} {...message} />
          ) : (
            <Message key={index} {...message} />
          );
        })}
        {
          typing[0] && <Typing user={typing[0]}/>
        }
        <div ref={scroller} className="pb-2 md:pb-6"/>
      </div>
    </div>
  );
};

export default Chat;
