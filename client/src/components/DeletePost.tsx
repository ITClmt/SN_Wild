import axios from "axios";
import { BsThreeDots } from "react-icons/bs";

export default function DeletePost({
  posts,
  setPosts,
}: { posts: PostType[]; setPosts: (posts: PostType[]) => void }) {
  const handleDelete = async (postId: number) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/posts/${postId}`,
        {
          withCredentials: true,
        },
      );
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <details className="dropdown">
      <summary className="btn btn-ghost btn-xs">
        <BsThreeDots />
      </summary>
      <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-24 p-2 shadow-sm right-0">
        <li>
          <button
            type="button"
            className="btn btn-ghost btn-xs text-red-500"
            onClick={() => handleDelete(posts[0].id)}
          >
            Supprimer
          </button>
        </li>
      </ul>
    </details>
  );
}
