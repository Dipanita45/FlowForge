import axios from "axios";

export const getNotifications = (userId: string) =>
  axios.get(`/api/notifications/${userId}`);

export const markAsRead = (id: string) =>
  axios.patch(`/api/notifications/${id}/read`);