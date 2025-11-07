import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./Pages/LoginPage";

const App = () => {
  return (
    <MantineProvider>
      <div>
        <Routes>
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </div>
    </MantineProvider>
  );
};

export default App;
