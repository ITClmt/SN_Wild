import axios from "axios";
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

  if (posts.length === 0) {
    return <div>Aucun post trouvé</div>;
  }

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

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Posts de {user.username}</h2>
        <button
          type="button"
          className="btn btn-primary"
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
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <p className="text-base-content">{post.content}</p>
              <div className="card-actions justify-end">
                <span className="text-sm text-base-content/70">
                  {new Date(post.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
