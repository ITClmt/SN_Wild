import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "./postRepository";

// 🔹 Récupérer tous les posts
export const browsePosts = async () => {
  return await getAllPosts();
};

// 🔹 Récupérer un post spécifique
export const readPost = async (id: number) => {
  const post = await getPostById(id);
  if (!post) {
    throw new Error("Post not found.");
  }
  return post;
};

// 🔹 Ajouter un post
export const addPost = async (userId: number, content: string) => {
  if (!content) {
    throw new Error("Content cannot be empty.");
  }
  const postId = await createPost(userId, content);
  return { message: "Post created successfully!", postId };
};

// 🔹 Modifier un post
export const editPost = async (
  postId: number,
  userId: number,
  content: string,
) => {
  const post = await getPostById(postId);
  if (!post) {
    throw new Error("Post not found.");
  }
  if (post.user_id !== userId) {
    throw new Error("Unauthorized.");
  }
  await updatePost(postId, content);
  return { message: "Post updated successfully!" };
};

// 🔹 Supprimer un post
export const removePost = async (postId: number, userId: number) => {
  const post = await getPostById(postId);
  if (!post) {
    throw new Error("Post not found.");
  }
  if (post.user_id !== userId) {
    throw new Error("Unauthorized.");
  }
  await deletePost(postId);
  return { message: "Post deleted successfully!" };
};
