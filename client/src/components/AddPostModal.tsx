import axios from "axios";
import { useForm } from "react-hook-form";

export default function AddPostModal({
  user,
  setPosts,
}: { user: UserType; setPosts: (posts: PostType[]) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormData>();

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

  return (
    <>
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
    </>
  );
}
