import { markAsRead } from "../api/notification";

export default function NotificationPanel({ notifications, refresh }: any) {
  const handleRead = async (id: string) => {
    await markAsRead(id);
    refresh();
  };

  return (
    <div className="p-4 w-80 max-h-96 overflow-y-auto">
      {notifications.map((n: any) => (
        <div
          key={n._id}
          className={`p-2 border-b cursor-pointer ${
            n.isRead ? "opacity-50" : ""
          }`}
          onClick={() => handleRead(n._id)}
        >
          {n.content}
        </div>
      ))}
    </div>
  );
}