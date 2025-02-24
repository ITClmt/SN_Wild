import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function TextAreaFeed({ user, setPosts }: TextAreaFeedProps) {
  const { register, handleSubmit, reset } = useForm<PostType>();

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

  return (
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
  );
}
