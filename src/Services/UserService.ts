import axios from "axios";
import { errorNotification } from "../Utils/NotificationService";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

// POST : SignUp API
const signupAPI = async (user_data: any) => {
  try {
    const response = await axios.post(
      `${apiUrl}/api/v1/user/register`,
      user_data
    );

    return response.data;
  } catch (error: any) {
    // Error Notification
    errorNotification("Error", "Failed to Signup");

    throw new Error("An unexpected error occurred : ", error);
  }
};

export { signupAPI };
