import { Box, Button, Text, TextInput } from "@mantine/core";
import logo from "../assets/droidChat_Logo.png";
import { FiPlus } from "react-icons/fi";
import { BiSearch } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const chatList = [
    { id: 1, name: "Chat with Alice", timeStamp: "10:30 AM" },
    { id: 2, name: "Project Discussion", timeStamp: "12:20 AM" },
    { id: 3, name: "Family Group", timeStamp: "15:30 AM" },
    { id: 1, name: "Chat with Alice", timeStamp: "10:30 AM" },
    { id: 1, name: "Chat with Alice", timeStamp: "10:30 AM" },
    { id: 1, name: "Chat with Alice", timeStamp: "10:30 AM" },
    { id: 1, name: "Chat with Alice", timeStamp: "10:30 AM" },
    { id: 1, name: "Chat with Alice", timeStamp: "10:30 AM" },
    { id: 1, name: "Chat with Alice", timeStamp: "10:30 AM" },
  ];

  const navigate = useNavigate();
  return (
    <div className="w-1/5 h-screen p-3 flex flex-col justify-between gap-10 border-r border-gray-300">
      <div className="space-y-10">
        {/* Row 1 - Logo + App Name */}
        <div className="flex items-center gap-3">
          {/* Left - Logo */}
          <img src={logo} alt="Logo" className="h-14 w-14 place-self-center" />

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
          />

          <p className="font-medium text-sm">Recent Chats</p>

          <div className="space-y-3 max-h-70 xl:max-h-90 overflow-y-auto">
            {chatList.map((chat) => (
              <div
                key={chat.id}
                className="px-3 py-2 border border-zinc-300 rounded-md hover:bg-gray-200 cursor-pointer"
              >
                <div className="space-y-[2px]">
                  <Box w={{ base: 50, sm: 100, md: 150, lg: 200, xl: 250 }}>
                    <Text size="sm" truncate="end" fw={500}>
                      {chat.name}
                    </Text>
                  </Box>

                  <p className="text-xs text-gray-500">{chat.timeStamp}</p>
                </div>
              </div>
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
          <p className="font-medium text-sm">John Doe</p>
        </div>

        {/* Logout btn */}
        <Button
          onClick={() => navigate("/")}
          variant="outline"
          color="red"
          size="xs"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};
