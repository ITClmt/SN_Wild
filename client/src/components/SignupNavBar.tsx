import { Link } from "react-router-dom";
import ThemeController from "./ThemeController";

export default function SignupNavBar() {
  return (
    <div className="fixed top-0 left-0 p-4 gap-4 flex justify-between w-full">
      <div className="flex gap-4">
        <Link to="/login">
          <button type="button" className="btn btn-outline btn-xs">
            Connexion
          </button>
        </Link>
        <Link to="/">
          <button type="button" className="btn btn-outline btn-xs">
            Retour
          </button>
        </Link>
      </div>
      <ThemeController />
    </div>
  );
}
