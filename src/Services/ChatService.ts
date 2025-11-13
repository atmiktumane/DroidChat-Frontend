import axios from "axios";

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

export { userSummaryAPI, deleteChatAPI };
