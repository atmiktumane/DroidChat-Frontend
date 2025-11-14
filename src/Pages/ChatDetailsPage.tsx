import { Button, Textarea } from "@mantine/core";
import { Sidebar } from "../Components/Sidebar";
import { useLocation } from "react-router-dom";
import { getChatDetailsAPI, sendChatAPI } from "../Services/ChatService";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Loader } from "../Components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../ReduxStore/Slices/loadingSlice";
import { getLocalStorageItem } from "../Utils/LocalStorage";

export const ChatDetailsPage = () => {
  const location = useLocation();
  const chatId = location.pathname.split("/").pop();

  const [chatHistory, setChatHistory] = useState([]);

  const [prompt, setPrompt] = useState("");

  const user = getLocalStorageItem("user");

  // Scroll to bottom of Chat History
  const chatScrollRef = useRef<HTMLDivElement | null>(null);

  const isLoading = useSelector((state: any) => state.loading.isLoading);

  const dispatch = useDispatch();

  // GET - Chat Details API definition
  const fetchChatDetails = async () => {
    dispatch(setLoading(true));
    try {
      const response = await getChatDetailsAPI(chatId);

      setChatHistory(response.chatLogs);
    } catch (error) {
      console.error("Failed to fetch user summary:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  // POST - Send Chat API definition
  const sendChatFunction = async () => {
    dispatch(setLoading(true));
    try {
      const chatData = {
        chat_id_input: chatId,
        user_id_input: user.id,
        chat_name_input: "",
        prompt_input: prompt,
      };

      await sendChatAPI(chatData);

      await fetchChatDetails();

      setPrompt("");

      chatScrollRef.current?.scrollTo({
        top: chatScrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    } catch (error) {
      console.error("Failed to send chat:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  // On chatId change workflow
  useEffect(() => {
    fetchChatDetails();

    chatScrollRef.current?.scrollTo({
      top: chatScrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chatId]);

  return (
    <div className="flex w-full">
      <Sidebar />

      <div className="w-4/5 h-screen flex justify-center pt-4 pb-16">
        {/* Row 1 - Chat History */}
        <div ref={chatScrollRef} className="w-full px-30 overflow-y-auto">
          {chatHistory.map((chat: any, index) => (
            <div key={index} className="flex flex-col space-y-5 mb-6">
              {/* Prompt Bubble - Right */}
              <div className="flex justify-end">
                <div className="max-w-[75%] bg-cyan-300/90 text-sm p-3 rounded-xl rounded-br-none shadow-md">
                  <p className="whitespace-pre-line">{chat.prompt}</p>
                </div>
              </div>

              {/* Response Bubble - Left */}
              <div className="flex justify-start">
                <div className="max-w-[75%] bg-gray-100 text-sm text-gray-900 p-3 overflow-x-auto rounded-xl rounded-bl-none shadow-md prose">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {chat.response
                      .replace(/^\{content=/, "")
                      .replace(/\}$/, "")}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Prompt Input Box */}
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

      <Loader isLoading={isLoading} />
    </div>
  );
};
