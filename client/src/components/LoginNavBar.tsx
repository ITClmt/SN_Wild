import { Link } from "react-router-dom";
import ThemeController from "./ThemeController";

export default function LoginNavBar() {
  return (
    <div className="fixed top-0 left-0 p-4 flex justify-between w-full">
      <div className="flex gap-4">
        <Link to="/">
          <button type="button" className="btn btn-outline btn-xs">
            Retour
          </button>
        </Link>
        <Link to="/signup">
          <button type="button" className="btn btn-outline btn-xs">
            Créer un compte
          </button>
        </Link>
      </div>
      <ThemeController />
    </div>
  );
}
