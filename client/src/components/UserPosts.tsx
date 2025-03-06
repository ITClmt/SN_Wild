import { useEffect, useState } from "react";
import axios from "axios";
import DeletePost from "./DeletePost";
import AddPostModal from "./AddPostModal";
import { useUser } from "../context/UserContext";
import { LuHeart } from "react-icons/lu";
import { LuMessageCircle } from "react-icons/lu";

export default function UserPosts({ user }: { user: UserType }) {
  const [posts, setPosts] = useState([] as PostType[]);
  const { user: currentUser } = useUser();

  // Fonction pour rendre les liens cliquables
  const renderTextWithLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return parts.map((part) => {
      if (part.match(urlRegex)) {
        return (
          <a
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

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/posts`,
        );
        setPosts(data.filter((post: PostType) => post.user_id === user.id));
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [user.id]);

  if (posts.length === 0) {
    return (
      <section className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Posts de {user.username}</h2>
          <AddPostModal user={user} setPosts={setPosts} />
        </div>
        <p className="text-base-content/70 mt-4">Aucun post trouvé</p>
      </section>
    );
  }

  return (
    <section className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Posts de {user.username}</h2>
        {currentUser?.id === user.id && (
          <AddPostModal user={user} setPosts={setPosts} />
        )}
      </div>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li
            key={post.id}
            className="card bg-base-100 shadow-xl container mx-auto"
          >
            <div className="card-actions justify-between">
              <span className="text-sm text-base-content/70">
                {`${new Date(post.created_at).toLocaleDateString()} ${new Date(
                  post.created_at,
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}`}
              </span>

              {(currentUser?.is_admin || currentUser?.id === post.user_id) && (
                <DeletePost posts={posts} setPosts={setPosts} />
              )}
            </div>

            <div className="card-body">
              <div className="flex justify-between items-center">
                <p className="text-base-content whitespace-pre-wrap break-words">
                  {renderTextWithLinks(post.content)}
                </p>
              </div>
            </div>
            {/* Post Actions */}
            <div className="flex gap-2 p-2">
              <button type="button" className="btn btn-ghost btn-xs gap-1">
                <LuHeart className="h-4 w-4" />
                <span className="text-xs">{post.likes_count}</span>
              </button>
              <button type="button" className="btn btn-ghost btn-xs gap-1">
                <LuMessageCircle className="h-4 w-4" />
                <span className="text-xs">{post.comments_count}</span>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
