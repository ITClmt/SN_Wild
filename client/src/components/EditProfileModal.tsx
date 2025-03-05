import axios from "axios";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

interface EditProfileModalProps {
  logout: () => void;
  setUser: (user: UserType) => void;
  user: UserType;
}

export default function EditProfileModal({
  logout,
  setUser,
  user,
}: EditProfileModalProps) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      email: user?.email,
      username: user?.username,
      bio: user?.bio,
      website: user?.website,
      profile_picture: user?.profile_picture,
    },
  });

  const handleProfileUpdate = async (data: ProfileFormData) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/users/me`, data, {
        withCredentials: true,
      });

      // Refresh user data after update
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/users/me`,
        { withCredentials: true },
      );
      setUser(response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const onSubmit = (data: ProfileFormData) => {
    handleProfileUpdate(data);
    const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
    modal?.close();
    window.location.reload();
  };
  return (
    <>
      <article className="flex flex-col gap-2">
        <button
          type="button"
          className="btn btn-outline btn-sm"
          onClick={() => {
            const modal = document.getElementById(
              "my_modal_1",
            ) as HTMLDialogElement;
            modal?.showModal();
          }}
        >
          Éditer le profil
        </button>
        <button
          type="button"
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="btn btn-ghost btn-sm text-error"
        >
          Déconnexion
        </button>
      </article>

      {/* Edit Modal */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => {
                const modal = document.getElementById(
                  "my_modal_1",
                ) as HTMLDialogElement;
                modal?.close();
              }}
            >
              <RxCross2 />
            </button>
          </form>

          <h3 className="font-bold text-lg mb-4">Éditer le profil</h3>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full">
              <label className="label" htmlFor="profile_picture">
                <span className="label-text">URL de la photo de profil</span>
              </label>
              <input
                id="profile_picture"
                type="url"
                {...register("profile_picture")}
                className="input input-bordered w-full"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="form-control w-full">
              <label className="label" htmlFor="username">
                <span className="label-text">Nom d'utilisateur</span>
              </label>
              <input
                id="username"
                type="text"
                {...register("username", {
                  required: true,
                  minLength: 3,
                  maxLength: 15,
                })}
                className="input input-bordered w-full"
              />
              {errors.username && (
                <label className="label" htmlFor="username">
                  <span className="label-text-alt text-error">
                    Le nom d'utilisateur est requis
                  </span>
                </label>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label" htmlFor="email">
                <span className="label-text">Email</span>
              </label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Adresse email invalide",
                  },
                })}
                className="input input-bordered w-full"
              />
              {errors.email && (
                <label className="label" htmlFor="email">
                  <span className="label-text-alt text-error">
                    {errors.email.message || "L'email est requis"}
                  </span>
                </label>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label" htmlFor="bio">
                <span className="label-text">Bio</span>
              </label>
              <textarea
                id="bio"
                {...register("bio")}
                className="textarea textarea-bordered w-full min-h-[100px]"
              />
            </div>

            <div className="form-control w-full">
              <label className="label" htmlFor="website">
                <span className="label-text">Site web</span>
              </label>
              <input
                id="website"
                type="url"
                {...register("website")}
                className="input input-bordered w-full"
                placeholder="https://example.com"
              />
            </div>

            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                Enregistrer
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button type="button">close</button>
        </form>
      </dialog>
    </>
  );
}
