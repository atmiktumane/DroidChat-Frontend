import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./Pages/LoginPage";
import { SignupPage } from "./Pages/SignupPage";

const App = () => {
  return (
    <MantineProvider>
      <div>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </div>
    </MantineProvider>
  );
};

export default App;
