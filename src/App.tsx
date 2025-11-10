import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./Pages/LoginPage";
import { SignupPage } from "./Pages/SignupPage";
import { ChatBoxPage } from "./Pages/ChatBoxPage";

const App = () => {
  return (
    <MantineProvider>
      <div>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/chat" element={<ChatBoxPage />} />
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </div>
    </MantineProvider>
  );
};

export default App;
