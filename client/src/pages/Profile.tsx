import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import UserPosts from "../components/UserPosts";

import EditProfileModal from "../components/EditProfileModal";

export default function Profile() {
  const { user, logout, setUser } = useUser();

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen flex-col gap-4">
        <p className="text-2xl font-bold">Please login</p>
        <Link to="/login" className="btn btn-secondary">
          Login
        </Link>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-base-200 p-4">
      <header className="container mx-auto px-4 max-w-4xl mt-16">
        {/* Profile Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body p-4 md:p-6">
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center md:items-start">
              <div className="avatar">
                <div className="w-24 md:w-32 rounded-full ring ring-primary">
                  <img
                    src={
                      user.profile_picture ||
                      "https://cdn.pixabay.com/photo/2022/06/05/07/04/person-7243410_1280.png"
                    }
                    alt={user.username}
                  />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left space-y-2">
                <h2 className="text-2xl font-bold">{user.username}</h2>
                <p className="text-base-content/70">{user.email}</p>
                {user.bio && (
                  <div className="card bg-base-200 p-4 mt-4">
                    <p className="text-base-content/80">{user.bio}</p>
                  </div>
                )}
                {user.website && (
                  <a
                    href={user.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-link btn-sm px-0"
                  >
                    {user.website}
                  </a>
                )}
              </div>
              <EditProfileModal logout={logout} setUser={setUser} user={user} />
            </div>

            {/* Posts Section */}
            <div className="divider mt-8">Publications</div>
            <div className="mt-8">
              <UserPosts user={user} />
            </div>
          </div>
        </div>
      </header>
    </section>
  );
}
