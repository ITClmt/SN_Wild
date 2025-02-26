import { LuHeart } from "react-icons/lu";
import { LuMessageCircle } from "react-icons/lu";
import { Link } from "react-router-dom";
import DeletePost from "./DeletePost";

export default function UsersPostsFeed({
  posts,
  setPosts,
  otherUsers,
  user,
}: UsersPostsFeedProps) {
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

  return (
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
                <DeletePost posts={posts} setPosts={setPosts} />
              )}
            </div>

            {/* Post Content */}
            <div className="mt-3 text-base-content/90 text-lg whitespace-pre-wrap break-all">
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
  );
}
