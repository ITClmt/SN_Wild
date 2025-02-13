import "./App.css";
import { Outlet } from "react-router-dom";
import ThemeController from "./components/ThemeController";
function App() {
  return (
    <>
      <ThemeController />
      <Outlet />
    </>
  );
}

export default App;
