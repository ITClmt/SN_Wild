import { Link } from "react-router-dom";
import ThemeController from "./ThemeController";
import { useUser } from "../context/UserContext";

export default function NavBar() {
  const { isAuthenticated, user } = useUser();
  return (
    <nav className="navbar">
      <div className="navbar-start">
        <Link
          to={isAuthenticated ? "/feed" : "/"}
          className="btn btn-ghost text-xl"
        >
          CampCoders
        </Link>
      </div>

      <div className="navbar-end">
        {isAuthenticated && (
          <Link to="/profile">
            <img
              src={
                user?.profile_picture ||
                "https://cdn.pixabay.com/photo/2022/06/05/07/04/person-7243410_1280.png"
              }
              alt={user?.username || "User Avatar"}
              className="w-8 rounded-full mr-2"
            />
          </Link>
        )}
        <ThemeController />
      </div>
    </nav>
  );
}
