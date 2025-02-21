import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { LuHeart, LuMessageCircle } from "react-icons/lu";
import { BsThreeDots } from "react-icons/bs";

export default function Feed() {
  const [otherUsers, setOtherUsers] = useState<UserType[]>([]);
  const [posts, setPosts] = useState<PostType[]>([]);
  const { user, isAuthenticated } = useUser();
  const { register, handleSubmit, reset } = useForm<PostType>();

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

  const renderTextWithLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="link link-primary"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  const onSubmit = async (data: PostType) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/posts`, data, {
        withCredentials: true,
      });

      // Reload posts after posting
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/posts`,
      );
      setPosts(response.data);
      reset();
    } catch (error) {
      console.error("Error posting:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/posts/${id}`, {
        withCredentials: true,
      });
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

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
    <main className="min-h-screen bg-base-200 mt-16">
      <div className="mx-auto max-w-2xl p-4">
        <h1 className="text-3xl font-bold">Feed</h1>
      </div>
      <section className="max-w-2xl mx-auto">
        <form
          className="flex items-center justify-between bg-base-100 rounded-lg p-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Link to={"/profile"} className="mr-4">
            <img
              src={
                user?.profile_picture ||
                "https://cdn.pixabay.com/photo/2022/06/05/07/04/person-7243410_1280.png"
              }
              alt={user?.username || "User"}
              className="w-12 md:w-16 rounded-full"
            />
          </Link>

          <textarea
            placeholder="What's on your mind?"
            className="textarea textarea-bordered w-full"
            {...register("content", {
              required: true,
              minLength: 1,
              maxLength: 255,
            })}
          />
          <button type="submit" className="btn btn-primary ml-4">
            Post
          </button>
        </form>
      </section>

      <section className="max-w-2xl mx-auto p-4 space-y-4">
        {posts.map((post) => (
          <article key={post.id} className="card bg-base-100 shadow-xl">
            <div className="card-body p-4">
              {/* Post Header with User Info */}
              <div className="flex justify-between items-start">
                <div className="flex gap-3 items-center">
                  <Link to={`/profile/${post.user_id}`}>
                    <figure className="avatar w-12 h-12 rounded-full">
                      <img
                        src={
                          otherUsers.find(
                            (u) => Number(u.id) === Number(post.user_id),
                          )?.profile_picture ||
                          "https://cdn.pixabay.com/photo/2022/06/05/07/04/person-7243410_1280.png"
                        }
                        alt="User avatar"
                      />
                    </figure>
                  </Link>
                  <Link to={`/profile/${post.user_id}`}>
                    <div>
                      <h3 className="font-semibold text-sm">
                        {otherUsers.find(
                          (u) => Number(u.id) === Number(post.user_id),
                        )?.username || "Utilisateur"}
                      </h3>
                      <time className="text-xs text-base-content/60">
                        {new Date(post.created_at).toLocaleDateString()} à{" "}
                        {new Date(post.created_at).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </time>
                    </div>
                  </Link>
                </div>

                {user?.id === Number(post.user_id) && (
                  <details className="dropdown">
                    <summary className="btn btn-ghost btn-xs">
                      <BsThreeDots />
                    </summary>
                    <ul className="menu dropdown-content bg-base-100 rounded-box z-1 shadow-sm right-0">
                      <li>
                        <button
                          type="button"
                          className="btn btn-ghost btn-xs text-red-500"
                          onClick={() => handleDelete(post.id)}
                        >
                          Supprimer
                        </button>
                      </li>
                    </ul>
                  </details>
                )}
              </div>

              {/* Post Content */}
              <div className="mt-3 text-base-content/90 text-lg">
                {renderTextWithLinks(post.content)}
              </div>

              {/* Post Actions */}
              <div className="flex gap-2 mt-3">
                <button type="button" className="btn btn-ghost btn-xs gap-1">
                  <LuHeart className="h-4 w-4" />
                  <span className="text-xs">0</span>
                </button>
                <button type="button" className="btn btn-ghost btn-xs gap-1">
                  <LuMessageCircle className="h-4 w-4" />
                  <span className="text-xs">0</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
