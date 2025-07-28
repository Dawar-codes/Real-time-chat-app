import { send, upload } from "@/assets";
import Image from "next/image";
import { useRef, useState } from "react";
import { MessageProps } from "./Messages/Message";
import { UserType } from "@/models/user";

interface InputsProps {
  setChat: React.Dispatch<React.SetStateAction<MessageProps[]>>;
  user: UserType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  socket: any; // (You can type this better later)
}

const Inputs: React.FC<InputsProps> = ({setChat, user, socket}) => {

  const [input, setInput] = useState("");

  const uploadInput = useRef<HTMLInputElement>(null);

  const userTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    // Emit the typing event to the server
    socket.emit("user_typing", { user: user.name, typing: e.target.value ? true : false });
  };

  const sendMessage = () => {
    if(input) {
      const msg: MessageProps = {content: input, type: "text", user};
    socket.emit("send_message", msg);
    socket.emit("user_typing", {user: user.name, typing: false})
    setChat((prev) => [...prev, msg]);
    setInput("");
    } else {
      uploadInput?.current?.click();
    }
    
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file?.type === "image/jpeg" || file?.type === "image/png") {
      if (file.size > 1024 * 1024) { // 1 MB
  alert("Image is too large! Please upload a file under 1 MB.");
  return;
}
      const reader = new FileReader();
      reader.onloadend = () => {
        const msg: MessageProps = {content: reader.result as string, type: "image", user};
        socket.emit("send_message", msg);
        setChat((prev) => [...prev, msg]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full flex items-center px-2 py-3 bg-gray-900 gap-2">
      <input
        value={input}
        onChange={(e) => userTyping(e)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        onBlur={() => socket.emit("user_typing", { user: user.name, typing: false })}
        className="flex-1 h-10 md:h-12 rounded-2xl bg-gray-800 text-white placeholder-slate-400 px-4 text-base md:text-xl focus:outline-none"
        type="text"
        placeholder="Enter your message"
      />
      <input className="hidden" type="file" ref={uploadInput} onChange={(e) => handleImageUpload(e)} />
      <button
        className="flex items-center justify-center h-10 w-10 md:h-12 md:w-12 rounded-full bg-cyan-900 text-white font-bold text-xl md:text-2xl cursor-pointer transition hover:bg-cyan-600"
        type="submit"
        onClick={sendMessage}
      >
        <Image
          src={input ? send : upload}
          alt="send"
          height={20}
          width={20}
          className="mx-auto md:w-8 md:h-8"
        />
      </button>
    </div>
  );
};

export default Inputs;
