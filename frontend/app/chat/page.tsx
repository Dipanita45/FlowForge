"use client";

import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

type Message = {
  id?: string;
  user: string;
  text: string;
  time?: string;
  status?: string;
  reactions?: { [emoji: string]: number };
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");
  const [typingUser, setTypingUser] = useState("");
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  const socketRef = useRef<Socket | null>(null);
  const typingTimeoutRef = useRef<any>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const isAtBottomRef = useRef(true);
  const [unreadCount, setUnreadCount] = useState(0);

  //  SOCKET SETUP
  useEffect(() => {
    const socket = io("http://localhost:5000");
    socketRef.current = socket;

    // FETCH MESSAGES
    fetch("http://localhost:5000/api/chat")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((msg: any) => ({
          id: msg.id,
          user: msg.username,
          text: msg.text,
          time: new Date(msg.created_at).toLocaleTimeString(),
          status: msg.status || "sent",
        }));
        setMessages(formatted);
      });

// NEW MESSAGE
socket.on("newMessage", (msg) => {
  setMessages((prev) => [
    ...prev,
    {
      id: msg.id,
      user: msg.username,
      text: msg.text,
      time: new Date(msg.created_at).toLocaleTimeString(),
      status: msg.status,
    },
  ]);

  //  new logic
  if (!isAtBottomRef.current) {
    setUnreadCount((prev) => prev + 1);
  }
});
    // TYPING
    socket.on("typing", (user) => {
      setTypingUser(user);

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = setTimeout(() => {
        setTypingUser("");
      }, 1500);
    });

    // ONLINE USERS
    socket.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });

    // SEEN
    socket.on("messageSeen", (messageId) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, status: "seen" } : msg
        )
      );
    });
    socket.on("reactionUpdate", ({ messageId, reactions }) => {
  setMessages((prev) =>
    prev.map((msg) =>
      msg.id === messageId
        ? { ...msg, reactions }
        : msg
    )
  );
});

    return () => {
      socket.disconnect();
    };
  }, []);

  //  JOIN USER
  useEffect(() => {
    if (socketRef.current && username.trim()) {
      socketRef.current.emit("join", username);
    }
  }, [username]);

  //  SMART AUTO SCROLL (FIXED)
  useEffect(() => {
    if (isAtBottomRef.current) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // MARK ONLY LAST MESSAGE AS SEEN (FIXED)
  useEffect(() => {
    if (!socketRef.current) return;

    const lastMsg = messages[messages.length - 1];
    if (lastMsg?.id) {
      socketRef.current.emit("seen", lastMsg.id);
    }
  }, [messages]);

  // SEND
  async function handleSend() {
    if (!input.trim() || !username.trim()) return;

    await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: input, username }),
    });

    setInput("");
  }

  // TYPING
  function handleTyping(e: any) {
    setInput(e.target.value);

    if (socketRef.current && username.trim()) {
      socketRef.current.emit("typing", username);
    }
  }
  function handleReact(messageId: string | undefined, emoji: string) {
  if (!messageId) return;

  // send reaction to server
  socketRef.current?.emit("react", { messageId, emoji, username,});
}


  


  return (
    <div className="p-4 max-w-4xl mx-auto relative">
      <h1 className="text-2xl font-bold mb-3">Team Chat</h1>

      {/* USERNAME */}
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter name"
        className="mb-3 p-2 border rounded w-full"
      />

      {/* ONLINE USERS */}
      <div className="mb-2 text-sm text-green-600">
        Online: {onlineUsers.join(", ")}
      </div>

      {/* MESSAGES */}
      <div
  ref={containerRef}
  onScroll={() => {
    const el = containerRef.current;
    if (!el) return;

    const threshold = 100;

    const atBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight < threshold;

    isAtBottomRef.current = atBottom;

    //  reset unread when user reaches bottom
    if (atBottom) {
      setUnreadCount(0);
    }
  }}
  className="h-[400px] overflow-y-auto space-y-2 border p-3"
>
        {messages.map((msg, i) => {
          const prevMsg = messages[i - 1];
          const isSameUser = prevMsg && prevMsg.user === msg.user;
          const isMe = msg.user === username;

          return (
            <div
  key={i}
  className={`flex ${isMe ? "justify-end" : "justify-start"} ${
    isSameUser ? "mt-0.5" : "mt-3"
  }`}
>
              <div
                className={`p-3 max-w-xs shadow ${
  isMe
    ? `bg-green-500 text-white ${
        isSameUser
          ? "rounded-lg rounded-tr-2xl"
          : "rounded-2xl rounded-br-md"
      }`
    : `bg-gray-200 text-black ${
        isSameUser
          ? "rounded-lg rounded-tl-2xl"
          : "rounded-2xl rounded-bl-md"
      }`
}`}
              >
                {/* Show name only for others */}
                {!isMe && !isSameUser && (
                      <p className="font-semibold text-sm">{msg.user}</p>
                )}

                <p>{msg.text}</p>
                <div className="flex gap-2 mt-1 text-sm">
                  {["👍", "❤️", "😂"].map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => handleReact(msg.id, emoji)}
                      className="hover:scale-110 transition"
                      >
                        {emoji}
                      </button>
                    ))}
                  {/* counts will show here*/}
                    {msg.reactions &&
                      Object.entries(msg.reactions).filter(([_, count]) => count > 0).map(([emoji, count]) => (
                        <span
                        key={emoji}
                        className={`px-2 py-0.5 rounded-full text-xs ${isMe ? "bg-white text-black" : "bg-gray-200"}`}
                      >
                        {emoji} {count}
                      </span>
                    ))}
                  </div>

                <p className="text-xs text-right opacity-70">
                  {msg.time} {msg.status === "seen" ? "✓✓" : "✓"}
                </p>
              </div>
            </div>
          );
        })}

        <div ref={bottomRef}></div>
      </div>
      {unreadCount > 0 && (
  <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10">
    <button
      onClick={() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        setUnreadCount(0);
      }}
      className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm shadow hover:bg-blue-600 transition"
    >
      {unreadCount} New Message{unreadCount > 1 ? "s" : ""}
    </button>
  </div>
)}

      {/* TYPING */}
      {typingUser && typingUser !== username && (
        <p className="text-sm italic mt-1">
          {typingUser} is typing...
        </p>
      )}

      {/* INPUT */}
      <div className="flex mt-3 gap-2">
        <input
          value={input}
          onChange={handleTyping}
          placeholder="Type message"
          className="flex-1 border p-2 rounded"
        />
        <button
          onClick={handleSend}
          className="bg-green-600 text-white px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}"use client";

import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { motion } from "framer-motion";

type Message = {
  id?: string;
  user: string;
  text: string;
  time?: string;
  status?: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");
  const [typingUser, setTypingUser] = useState("");
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const socketRef = useRef<Socket | null>(null);
  const typingTimeoutRef = useRef<any>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const isAtBottomRef = useRef(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // SOCKET SETUP
  useEffect(() => {
    const socket = io("http://localhost:5000");
    socketRef.current = socket;

    audioRef.current = new Audio("/ping.mp3");

    // FETCH OLD MESSAGES
    fetch("http://localhost:5000/api/chat")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((msg: any) => ({
          id: msg.id,
          user: msg.username,
          text: msg.text,
          time: new Date(msg.created_at).toLocaleTimeString(),
          status: msg.status || "sent",
        }));
        setMessages(formatted);
      });

    // NEW MESSAGE
    socket.on("newMessage", (msg) => {
      setMessages((prev) => {
        const exists = prev.some((m) => m.id === msg.id);
        if (exists) return prev;

        return [
          ...prev,
          {
            id: msg.id,
            user: msg.username,
            text: msg.text,
            time: new Date(msg.created_at).toLocaleTimeString(),
            status: msg.status || "sent",
          },
        ];
      });

      if (!isAtBottomRef.current) {
        setUnreadCount((prev) => prev + 1);
        audioRef.current?.play().catch(() => {});
      }
    });

    // TYPING
    socket.on("typing", (user) => {
      setTypingUser(user);

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = setTimeout(() => {
        setTypingUser("");
      }, 1500);
    });

    // ONLINE USERS
    socket.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });

    // SEEN
    socket.on("messageSeen", (messageId) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, status: "seen" } : msg
        )
      );
    });

    return () => socket.disconnect();
  }, []);

  // JOIN USER
  useEffect(() => {
    if (socketRef.current && username.trim()) {
      socketRef.current.emit("join", username);
    }
  }, [username]);

  // AUTO SCROLL
  useEffect(() => {
    if (isAtBottomRef.current) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // MARK LAST MESSAGE AS SEEN
  useEffect(() => {
    if (!socketRef.current) return;
    const lastMsg = messages[messages.length - 1];
    if (lastMsg?.id) {
      socketRef.current.emit("seen", lastMsg.id);
    }
  }, [messages]);

  // SEND MESSAGE (Optimistic UI)
  async function handleSend() {
    if (!input.trim() || !username.trim()) return;

    const tempId = Date.now().toString();

    setMessages((prev) => [
      ...prev,
      {
        id: tempId,
        user: username,
        text: input,
        time: new Date().toLocaleTimeString(),
        status: "sending",
      },
    ]);

    setInput("");

    try {
      await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: input, username }),
      });
    } catch (err) {
      console.error(err);
    }
  }

  // TYPING
  function handleTyping(e: any) {
    setInput(e.target.value);

    if (socketRef.current && username.trim()) {
      socketRef.current.emit("typing", username);
    }
  }

  return (
    <div className="p-4 max-w-4xl mx-auto relative">
      {/* HEADER */}
      <div className="sticky top-0 bg-white z-10 pb-2">
        <h1 className="text-2xl font-bold mb-2">Team Chat</h1>

        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter name"
          className="mb-2 p-2 border rounded w-full"
        />

        <div className="text-sm text-green-600">
          Online: {onlineUsers.join(", ")}
        </div>
      </div>

      {/* CHAT BOX */}
      <div
        ref={containerRef}
        onScroll={() => {
          const el = containerRef.current;
          if (!el) return;

          const atBottom =
            el.scrollHeight - el.scrollTop - el.clientHeight < 100;

          isAtBottomRef.current = atBottom;

          if (atBottom) setUnreadCount(0);
        }}
        className="h-[60vh] md:h-[400px] overflow-y-auto space-y-2 border p-3 bg-gray-50 rounded"
      >
        {messages.map((msg, i) => {
          const prevMsg = messages[i - 1];
          const isSameUser = prevMsg && prevMsg.user === msg.user;
          const isMe = msg.user === username;

          return (
            <motion.div
              key={msg.id || i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${
                isMe ? "justify-end" : "justify-start"
              } ${isSameUser ? "mt-1" : "mt-3"}`}
            >
              <div
                className={`p-3 max-w-xs shadow ${
                  isMe
                    ? "bg-green-500 text-white rounded-2xl"
                    : "bg-gray-200 text-black rounded-2xl"
                }`}
              >
                {/* Avatar + Name */}
                {!isMe && !isSameUser && (
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 bg-gray-400 text-white flex items-center justify-center rounded-full text-xs">
                      {msg.user[0]?.toUpperCase()}
                    </div>
                    <p className="font-semibold text-sm">{msg.user}</p>
                  </div>
                )}

                <p>{msg.text}</p>

                {/* STATUS */}
                <p className="text-xs text-right opacity-70 flex justify-end gap-1">
                  {msg.time}
                  {msg.status === "sending" && "🕓"}
                  {msg.status === "sent" && "✓"}
                  {msg.status === "seen" && (
                    <span className="text-blue-500">✓✓</span>
                  )}
                </p>
              </div>
            </motion.div>
          );
        })}

        <div ref={bottomRef}></div>
      </div>

      {/* UNREAD BUTTON */}
      {unreadCount > 0 && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
          <button
            onClick={() => {
              bottomRef.current?.scrollIntoView({ behavior: "smooth" });
              setUnreadCount(0);
            }}
            className="bg-blue-500 text-white px-4 py-1 rounded-full shadow-lg hover:scale-105 transition"
          >
            {unreadCount} New Message{unreadCount > 1 ? "s" : ""}
          </button>
        </div>
      )}

      {/* TYPING INDICATOR */}
      {typingUser && typingUser !== username && (
        <div className="text-sm italic mt-1 flex items-center gap-1">
          {typingUser} typing
          <span className="animate-bounce">.</span>
          <span className="animate-bounce delay-100">.</span>
          <span className="animate-bounce delay-200">.</span>
        </div>
      )}

      {/* INPUT */}
      <div className="flex mt-3 gap-2">
        <input
          value={input}
          onChange={handleTyping}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type message"
          className="flex-1 border p-2 rounded"
        />
        <button
          onClick={handleSend}
          className="bg-green-600 text-white px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}