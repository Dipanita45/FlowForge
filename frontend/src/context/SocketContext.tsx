import { createContext, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export const SocketContext = createContext(socket);

export const SocketProvider = ({ children }: any) => {
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) socket.emit("join", userId);
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};