import { BsThreeDots } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

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

export default function UserPosts({ user }: { user: UserType }) {
  const [posts, setPosts] = useState([] as PostType[]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormData>();

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

  const onSubmit = async (data: PostFormData) => {
    const modal = document.getElementById("my_modal_3") as HTMLDialogElement;
    modal?.close();
    try {
      await axios
        .post(
          `${import.meta.env.VITE_API_URL}/api/posts`,
          {
            content: data.content,
            user_id: user.id,
          },
          {
            withCredentials: true,
          },
        )
        .catch((err) => {
          console.error(err);
        });
    } catch (error) {
      console.error("Error posting:", error);
    }

    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/posts`,
    );
    setPosts(
      response.data.filter((post: PostType) => post.user_id === user.id),
    );
  };

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

  if (posts.length === 0) {
    return (
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Posts de {user.username}</h2>
          <button
            type="button"
            className="btn btn-primary btn-xs md:btn-sm"
            onClick={() => {
              const modal = document.getElementById(
                "my_modal_3",
              ) as HTMLDialogElement;
              modal?.showModal();
            }}
          >
            Ajouter un post
          </button>
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
                {/* if there is a button in form, it will close the modal */}
                <textarea
                  className="textarea textarea-bordered"
                  placeholder="J'ai mangé un gâteau"
                  {...register("content", {
                    required: true,
                    minLength: 1,
                    maxLength: 256,
                  })}
                />
                {errors.content && (
                  <p className="text-red-500">
                    Vous devez entrer un message entre 1 et 255 caractères
                  </p>
                )}
                <button type="submit" className="btn btn-secondary m-4">
                  Ajouter
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  onClick={() => {
                    const modal = document.getElementById(
                      "my_modal_3",
                    ) as HTMLDialogElement;
                    modal?.close();
                  }}
                >
                  ✕
                </button>
              </form>
            </div>
          </dialog>
        </div>
        <p className="text-base-content/70 mt-4">Aucun post trouvé</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Posts de {user.username}</h2>
        <button
          type="button"
          className="btn btn-primary btn-xs md:btn-sm"
          onClick={() => {
            const modal = document.getElementById(
              "my_modal_3",
            ) as HTMLDialogElement;
            modal?.showModal();
          }}
        >
          Ajouter un post
        </button>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
              {/* if there is a button in form, it will close the modal */}
              <textarea
                className="textarea textarea-bordered"
                placeholder="J'ai mangé un gâteau"
                {...register("content", {
                  required: true,
                  minLength: 1,
                  maxLength: 255,
                })}
              />
              {errors.content && (
                <p className="text-red-500">
                  Vous devez entrer un message entre 1 et 255 caractères
                </p>
              )}
              <button type="submit" className="btn btn-secondary m-4">
                Ajouter
              </button>
              <button
                type="button"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => {
                  const modal = document.getElementById(
                    "my_modal_3",
                  ) as HTMLDialogElement;
                  modal?.close();
                }}
              >
                ✕
              </button>
            </form>
          </div>
        </dialog>
      </div>
      <div className="space-y-4">
        {posts.map((post) => (
          <div
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
              <details className="dropdown">
                <summary className="btn btn-ghost btn-xs">
                  <BsThreeDots />
                </summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-24 p-2 shadow-sm right-0">
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
            </div>

            <div className="card-body">
              <div className="flex justify-between items-center">
                <p className="text-base-content whitespace-pre-wrap">
                  {renderTextWithLinks(post.content)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
