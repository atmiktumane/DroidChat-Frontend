import { Button, Textarea } from "@mantine/core";
import { Sidebar } from "../Components/Sidebar";
import logo from "../assets/droidChat_Logo.png";
import { useEffect, useState } from "react";
import { sendChatAPI, userSummaryAPI } from "../Services/ChatService";
import { getLocalStorageItem } from "../Utils/LocalStorage";
import { setUserSummary } from "../ReduxStore/Slices/userSummarySlice";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../ReduxStore/Slices/loadingSlice";
import { useNavigate } from "react-router-dom";

export const ChatBoxPage = () => {
  const [prompt, setPrompt] = useState("");

  const user = getLocalStorageItem("user");

  const dispatch = useDispatch();

  const userSummary = useSelector((state: any) => state.userSummary.data);

  const [navigateToLatestChat, setNavigateToLatestChat] = useState(false);

  console.log("User Summary in ChatBoxPage :", userSummary);

  const navigate = useNavigate();

  // GET - User Summary API definition
  const fetchUserSummary = async () => {
    try {
      const response = await userSummaryAPI(user.id);
      dispatch(setUserSummary(response));
    } catch (error) {
      console.error("Failed to fetch user summary:", error);
    }
  };

  // POST - Send Chat API definition
  const sendChatFunction = async () => {
    dispatch(setLoading(true));
    try {
      const chatData = {
        chat_id_input: "",
        user_id_input: user.id,
        chat_name_input: prompt.slice(0, 40),
        prompt_input: prompt,
      };

      // Send Chat API call
      await sendChatAPI(chatData);

      // Fetch updated user summary
      await fetchUserSummary();

      setNavigateToLatestChat(true);

      setPrompt("");
    } catch (error) {
      console.error("Failed to send chat:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  // On userSummary update, navigate to latest chat
  useEffect(() => {
    if (navigateToLatestChat && userSummary.length > 0) {
      const lastElement = userSummary[userSummary.length - 1];
      navigate(`/chat/${lastElement.chatId}`);

      setNavigateToLatestChat(true);
    }
  }, [userSummary, navigateToLatestChat]);

  // PageLoad workflow
  useEffect(() => {
    fetchUserSummary();
  }, []);

  return (
    <div className="flex w-full">
      <Sidebar />

      <div className="w-4/5 h-screen flex flex-col items-center justify-center">
        {/* Row 1 - Logo + App Name */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-3">
            {/* Left - Logo */}
            <img
              src={logo}
              alt="Logo"
              className="h-24 w-24 place-self-center"
            />

            {/* Right - Heading + Subheading */}
            <div>
              <h3 className="font-semibold text-3xl bg-gradient-to-r from-blue-500 to-fuchsia-600 bg-clip-text text-transparent">
                Droid Chat
              </h3>
              <p className="text-lg font-medium text-zinc-500">
                Intelligent AI Assistant
              </p>
            </div>
          </div>

          <p className="text-6xl font-medium text-zinc-500">Ask me anything.</p>
        </div>

        <div className="fixed bottom-6 left-2/3 transform -translate-x-1/2 w-2/3 flex items-end gap-4">
          <Textarea
            className="w-xl"
            placeholder="Ask anything"
            autosize
            minRows={1}
            maxRows={6}
            radius="lg"
            styles={{
              input: {
                borderColor: "#22d3ee",
                backgroundColor: "#f0f9ff",
              },
            }}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button onClick={sendChatFunction} radius="lg" color="cyan.3">
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};
