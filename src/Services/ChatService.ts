import axios from "axios";
import { errorNotification } from "../Utils/NotificationService";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

// GET : User Summary API
const userSummaryAPI = async (userId: any) => {
  try {
    const response = await axios.get(
      `${apiUrl}/api/v1/chat/user/${userId}/summary`
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data);
    } else {
      console.error("An unexpected error occurred : ", error);
    }
  }
};

// DELETE : Chat API
const deleteChatAPI = async (chatId: any) => {
  try {
    const response = await axios.delete(`${apiUrl}/api/v1/chat/${chatId}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data);
    } else {
      console.error("An unexpected error occurred : ", error);
    }
  }
};

// GET : Chat Details API
const getChatDetailsAPI = async (chatId: any) => {
  try {
    const response = await axios.get(`${apiUrl}/api/v1/chat/${chatId}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data);
    } else {
      console.error("An unexpected error occurred : ", error);
    }
  }
};

// POST : Send Chat API
const sendChatAPI = async (chatData: any) => {
  try {
    const response = await axios.post(`${apiUrl}/api/v1/chat/send`, chatData);

    return response.data;
  } catch (error: any) {
    // Error Notification
    errorNotification("Error", "Failed to Signup");

    throw new Error("An unexpected error occurred : ", error);
  }
};

export { userSummaryAPI, deleteChatAPI, getChatDetailsAPI, sendChatAPI };
