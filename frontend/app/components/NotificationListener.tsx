import { useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { SocketContext } from "../context/SocketContext";

export default function NotificationListener() {
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on("new_notification", (data: any) => {
      toast.success(data.content);
    });

    return () => socket.off("new_notification");
  }, []);

  return null;
}