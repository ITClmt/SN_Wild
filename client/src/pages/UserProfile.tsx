import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import OtherUserPosts from "../components/OtherUserPosts";

interface UserProfileData {
  id: number;
  username: string;
  email: string;
  bio?: string;
  website?: string;
  profile_picture?: string;
}

export default function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState<UserProfileData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/api/users`);
        const foundUser = data.find(
          (u: UserProfileData) => u.id === Number(id),
        );
        if (!foundUser) {
          throw new Error("Utilisateur non trouvé");
        }
        setUser(foundUser);
      } catch (err) {
        setError("Utilisateur non trouvé");
      }
    };

    fetchUsers();
  }, [id]);

  if (error || !user) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <p className="text-error">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-4">
      <div className="container mx-auto px-4 max-w-4xl mt-16">
        <div className="card bg-base-100 shadow-xl">
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

            <div className="divider mt-8">Publications</div>
            <div className="mt-4">
              <OtherUserPosts user={user} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
