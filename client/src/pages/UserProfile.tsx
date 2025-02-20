import { Link, useLoaderData } from "react-router-dom";
import OtherUserPosts from "../components/OtherUserPosts";
import { useUser } from "../context/UserContext";

interface UserProfileData {
  id: number;
  username: string;
  email: string;
  bio?: string;
  website?: string;
  profile_picture?: string;
}

export default function UserProfile() {
  const user = useLoaderData() as UserProfileData;
  const { isAuthenticated } = useUser();
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        Connectez-vous pour voir votre feed
        <Link to="/login" className="btn btn-outline btn-primary mt-4">
          Connexion
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-4">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="card bg-base-100 shadow-xl mt-16">
          <div className="card-body p-4 md:p-6">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center md:items-start">
              <div className="avatar">
                <div className="w-24 md:w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
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
            </div>

            {/* Posts Section */}
            <div className="mt-8">
              <OtherUserPosts user={user} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
