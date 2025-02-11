import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Profile() {
  const { user, logout } = useUser();

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen flex-col gap-4">
        <p className="text-2xl font-bold">Please login</p>
        <Link to="/login" className="btn btn-neutral">
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-4">
      <button type="button" onClick={logout} className="btn btn-secondary">
        Logout
      </button>
      <div className="max-w-4xl mx-auto">
        {/* Card principale */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            {/* En-tête du profil */}
            <div className="flex items-center gap-4">
              <div className="avatar">
                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={
                      "https://cdn.pixabay.com/photo/2022/06/05/07/04/person-7243410_1280.png"
                    }
                    alt={user.username}
                  />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold">{user.username}</h2>
                <p className="text-base-content/70">{user.email}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="card-actions justify-end mt-6">
              <button type="button" className="btn btn-xs btn-primary">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
