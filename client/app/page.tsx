"use client";
import { useEffect, useState } from "react";
import { Chat, Inputs, SignUp } from "@/components";
import { io } from "socket.io-client";
import { UserType } from "@/models/user";
import { MessageProps } from "@/components/Messages/Message";

// Initialize the socket connection
const socket = io("http://192.168.100.135:3001", {
  transports: ["websocket"],
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
});

export default function Home() {
  const [chat, setChat] = useState<MessageProps[]>([]);
  const [typing, setTyping] = useState<string[]>([]);
  const [input, setInput] = useState("");
  // const user = useRef<object>(null);
    const [user, setUser] = useState<UserType | null>(null); // <--- now use useState, not ref!

  useEffect(() => {
    socket.on("receive_message", (msg) => {
      setChat((prev) => [...prev, msg]);
    })

    socket.on("user_typing", (data) => {
      if(!user) return;
      setTyping((prev) => {
        if(typing.includes(data.user) && data.typing === true) return prev
        if(data.typing === false) {
          return prev.filter((u) => u !== data.user)
        } else {
          return [...prev, data.user]
        }
      })
    })

    socket.on("new_user", (newUser: string) => {
      setChat((prev) => [
        ...prev,
        { content: `${newUser} joined`, type: "server", user: { id: "", name: newUser } }
      ]);
    });

    return () => {
      socket.off("receive_message");
      socket.off("new_user");
      socket.off("user_typing");
    }
  }) 
  

  return (
    <div
      style={{
        height: "calc(var(--vh) - env(safe-area-inset-bottom, 0px))",
      }}
      className="flex flex-col h-screen w-screen bg-gray-900 p-5 md:p-12"
    >
      <div className="flex flex-col h-full w-full max-w-3xl mx-auto bg-gray-800 rounded-lg overflow-hidden">
        {user ? (
          <>
            {/* Scrollable messages area */}
            <div className="flex-1 min-h-0 flex flex-col">
              <Chat user={user} chat={chat} typing={typing} />
            </div>
            {/* Inputs always at the bottom */}
            <Inputs setChat={setChat} user={user} socket={socket} />
          </>
        ) : (
          <SignUp setUser={setUser} socket={socket} input={input} setInput={setInput} />
        )}
      </div>
    </div>
  );
}
