import axios from "axios";
import { BsThreeDots } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface PostType {
  id: number;
  content: string;
  created_at: string;
  updated_at: string;
  user_id: number;
}

interface PostFormData {
  content: string;
}

// Fonction pour rendre les liens cliquables
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

export default function UserPosts({ user }: { user: UserType }) {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [refresh, setRefresh] = useState(0);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostFormData>();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/posts`)
      .then((res) => {
        setPosts(
          res.data.filter(
            (post: PostType) => Number(post.user_id) === Number(user.id),
          ),
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }, [user.id, refresh]);

  const onSubmit = (data: PostFormData) => {
    const token = localStorage.getItem("token");
    const modal = document.getElementById("my_modal_3") as HTMLDialogElement;
    modal?.close();

    axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/posts`,
        {
          content: data.content,
          user_id: user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(() => {
        reset();
        setRefresh((prev) => prev + 1);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDelete = (id: number) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`${import.meta.env.VITE_API_URL}/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setRefresh((prev) => prev + 1);
      })
      .catch((err) => {
        console.error(err);
      });
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
