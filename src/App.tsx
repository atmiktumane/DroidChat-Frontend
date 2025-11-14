import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import { MantineProvider } from "@mantine/core";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./Pages/LoginPage";
import { SignupPage } from "./Pages/SignupPage";
import { ChatBoxPage } from "./Pages/ChatBoxPage";
import { Notifications } from "@mantine/notifications";
import { ChatDetailsPage } from "./Pages/ChatDetailsPage";

const App = () => {
  return (
    <MantineProvider>
      <Notifications position="top-center" zIndex={10000} />
      <div>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/chat" element={<ChatBoxPage />} />
          <Route path="/chat/:id" element={<ChatDetailsPage />} />
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </div>
    </MantineProvider>
  );
};

export default App;
