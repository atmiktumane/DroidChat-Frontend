import {
  Box,
  Button,
  LoadingOverlay,
  Modal,
  Text,
  TextInput,
} from "@mantine/core";
import logo from "../assets/droidChat_Logo.png";
import { FiPlus } from "react-icons/fi";
import { BiSearch } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  clearAllLocalStorageItems,
  getLocalStorageItem,
} from "../Utils/LocalStorage";
import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { deleteChatAPI, userSummaryAPI } from "../Services/ChatService";
import { useDispatch } from "react-redux";
import { setUserSummary } from "../ReduxStore/Slices/UserSummarySlice";

export const Sidebar = ({ userSummary }: any) => {
  const [filterVar, setFilterVar] = useState("");

  const navigate = useNavigate();

  const user = getLocalStorageItem("user");

  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [deleteChatId, setDeleteChatId] = useState("");

  const [loader, setLoader] = useState<boolean>(false);

  const dispatch = useDispatch();

  const deleteChatFunction = async () => {
    try {
      setLoader(true);

      // Delete chat
      await deleteChatAPI(deleteChatId);

      // Fetch updated user summary
      const response = await userSummaryAPI(user.id);

      dispatch(setUserSummary(response));

      alert("Successfully deleted the chat.");
    } catch (error) {
      console.error("Error deleting chat:", error);
    } finally {
      // reset UI state, even if API fails
      setLoader(false);
      setDeleteModalOpened(false);
      setDeleteChatId("");
    }
  };

  return (
    <>
      <div className="w-1/5 h-screen p-3 flex flex-col justify-between gap-10 border-r border-gray-300">
        <div className="space-y-10">
          {/* Row 1 - Logo + App Name */}
          <div className="flex items-center gap-3">
            {/* Left - Logo */}
            <img
              src={logo}
              alt="Logo"
              className="h-14 w-14 place-self-center"
            />

            {/* Right - Heading + Subheading */}
            <div>
              <h3 className="font-semibold text-lg bg-gradient-to-r from-blue-500 to-fuchsia-600 bg-clip-text text-transparent">
                Droid Chat
              </h3>
              <p className="text-sm font-medium text-zinc-500">
                Intelligent AI Assistant
              </p>
            </div>
          </div>

          {/* Row 2 - New chat btn + search box + recent chat history */}
          <div className="space-y-5">
            <Button
              variant="filled"
              color="cyan.3"
              leftSection={<FiPlus />}
              fullWidth
            >
              New Chat
            </Button>

            <TextInput
              size="sm"
              radius="sm"
              leftSection={<BiSearch />}
              placeholder="Search conversations"
              onChange={(e) => setFilterVar(e.target.value)}
            />

            <p className="font-medium text-sm">Recent Chats</p>

            <div className="space-y-3 max-h-70 xl:max-h-90 overflow-y-auto">
              {userSummary?.length === 0 && (
                <p className="text-xs text-gray-500">No chats present.</p>
              )}
              {userSummary
                ?.filter((chat: any) =>
                  chat.chatName?.toLowerCase().includes(filterVar.toLowerCase())
                )
                ?.map((chat: any) => (
                  <>
                    <div
                      key={chat.chatId}
                      className="relative px-3 py-2 border border-zinc-300 rounded-md cursor-pointer 
             bg-white hover:bg-gray-200 transition-colors duration-150 ease-in-out"
                    >
                      {/* Chat name */}
                      <div className="flex justify-between items-center">
                        <Box
                          w={{ base: 50, sm: 100, md: 150, lg: 200, xl: 250 }}
                        >
                          <Text size="sm" truncate="end" fw={500}>
                            {chat.chatName}
                          </Text>
                        </Box>

                        {/* 3-dot (trash) icon */}
                        <div className="w-[20px] h-[20px] flex justify-center items-center">
                          <HiOutlineTrash
                            size={18}
                            className="text-gray-600 hover:text-black transition-colors duration-150"
                            onClick={() => {
                              setDeleteModalOpened(true);
                              setDeleteChatId(chat.chatId);
                            }}
                          />
                        </div>

                        <Modal
                          opened={deleteModalOpened}
                          onClose={() => {
                            setDeleteModalOpened(false);
                            setDeleteChatId("");
                          }}
                          title="Delete Chat"
                        >
                          {/* Modal content */}
                          <div className="flex flex-col gap-6 items-center">
                            <p className="text-red-500">
                              Are You Sure, you want to delete this chat ?
                            </p>
                            <div className="flex gap-4">
                              <Button
                                variant="outline"
                                color="gray"
                                onClick={() => {
                                  setDeleteModalOpened(false);
                                  setDeleteChatId("");
                                }}
                              >
                                Cancel
                              </Button>

                              <Button
                                variant="filled"
                                color="red.8"
                                onClick={deleteChatFunction}
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        </Modal>
                      </div>
                    </div>
                  </>
                ))}
            </div>
          </div>
        </div>

        {/* Row 3 - Profile + Logout */}
        <div className="flex justify-between items-center border-t pt-4">
          <div className="flex items-center gap-3">
            {/* User Img */}
            <FaRegUserCircle />

            {/* User name */}
            <p className="font-medium text-sm">{user.name}</p>
          </div>

          {/* Logout btn */}
          <Button
            onClick={() => {
              clearAllLocalStorageItems();
              navigate("/");
            }}
            variant="outline"
            color="red"
            size="xs"
          >
            Logout
          </Button>
        </div>
      </div>

      {/* Loader */}
      <LoadingOverlay
        visible={loader}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "cyan.4", type: "bars" }}
      />
    </>
  );
};
