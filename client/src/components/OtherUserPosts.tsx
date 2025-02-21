import axios from "axios";
import { useEffect, useState } from "react";

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

export default function OtherUserPosts({ user }: { user: UserType }) {
  const [posts, setPosts] = useState([] as PostType[]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/posts`,
        );
        setPosts(
          data.filter(
            (post: PostType) => Number(post.user_id) === Number(user.id),
          ),
        );
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [user.id]);

  if (posts.length === 0) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold">Posts de {user.username}</h2>
        <p className="text-base-content/70 mt-4">Aucun post trouvé</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Posts de {user.username}</h2>
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="card bg-base-100 shadow-xl container mx-auto"
          >
            <div className="card-body">
              <span className="text-sm text-base-content/70">
                {`${new Date(post.created_at).toLocaleDateString()} ${new Date(
                  post.created_at,
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}`}
              </span>
              <p className="text-base-content whitespace-pre-wrap mt-2">
                {renderTextWithLinks(post.content)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
