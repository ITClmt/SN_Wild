import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useEffect } from "react";
import TextAreaFeed from "../components/TextAreaFeed";
import UsersPostsFeed from "../components/UsersPostsFeed";

export default function Feed() {
  const [otherUsers, setOtherUsers] = useState<UserType[]>([]);
  const [posts, setPosts] = useState<PostType[]>([]);
  const { user, isAuthenticated } = useUser();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const [usersResponse, postsResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/users`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/posts`),
        ]);
        setOtherUsers(usersResponse.data);
        setPosts(postsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPosts();
  }, []);

  if (!isAuthenticated || !user) {
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
    <main className="min-h-screen bg-base-200 mt-16">
      <div className="mx-auto max-w-2xl p-4">
        <h1 className="text-3xl font-bold">Feed</h1>
      </div>
      <TextAreaFeed user={user} setPosts={setPosts} />
      <UsersPostsFeed
        otherUsers={otherUsers}
        posts={posts}
        setPosts={setPosts}
        user={user}
      />
    </main>
  );
}
