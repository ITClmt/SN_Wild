import "./App.css";
import { Outlet } from "react-router-dom";
import ThemeController from "./components/ThemeController";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <ThemeController />
      <Outlet />
    </UserProvider>
  );
}

export default App;
