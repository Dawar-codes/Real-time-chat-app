import type { UserType } from "@/models/user";

interface SignupProps {
    setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  socket: any; // (You can type this better later)
}

const SignUp: React.FC<SignupProps> = ({ setUser, socket, input, setInput }) => {
  const addUser = () => {
     const newUser = { name: input.trim(), id: socket.id };
     setUser(newUser);
    socket.emit("new_user", { user: input });
    setInput("");
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900">
      <div className="text-center flex flex-col gap-4 bg-gray-800 p-10 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-md">
        <h1 className="text-5xl md:text-6xl font-bold text-cyan-500 tracking-tight">
          Chat App
        </h1>
        <h2 className="text-xl md:text-2xl text-slate-400">
          Enter your name to join
        </h2>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addUser()}
          type="text"
          className="text-lg md:text-xl text-center rounded-lg py-3 px-4 text-slate-200 bg-gray-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-700 transition"
          placeholder="e.g. John"
        />
        {/* Example button, not hooked up */}
        <button
          disabled={!input}
          onClick={addUser}
          className={`mt-4 py-2 rounded-lg bg-cyan-800 hover:bg-cyan-600 text-white font-semibold text-lg shadow transition
            ${!input ? "opacity-50 cursor-not-allowed hover:bg-cyan-800" : ""}
          `}
        >
          Join Chat
        </button>
      </div>
    </div>
  );
};

export default SignUp;
