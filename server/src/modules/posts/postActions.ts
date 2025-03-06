import postRepository from "./postRepository";

// 🔹 Récupérer tous les posts
const browsePosts = async () => {
  return await postRepository.getAllPosts();
};

// 🔹 Récupérer un post spécifique
const readPost = async (id: number) => {
  const post = await postRepository.getPostById(id);
  if (!post) {
    throw new Error("Post not found.");
  }
  return post;
};

// 🔹 Ajouter un post
const addPost = async (userId: number, content: string) => {
  if (!content) {
    throw new Error("Content cannot be empty.");
  }
  const postId = await postRepository.createPost(userId, content);
  return { message: "Post created successfully!", postId };
};

// 🔹 Modifier un post
const editPost = async (postId: number, userId: number, content: string) => {
  const post = await postRepository.getPostById(postId);
  if (!post) {
    throw new Error("Post not found.");
  }
  if (post.user_id !== userId) {
    throw new Error("Unauthorized.");
  }
  await postRepository.updatePost(postId, content);
  return { message: "Post updated successfully!" };
};

// 🔹 Supprimer un post
const removePost = async (postId: number) => {
  const post = await postRepository.getPostById(postId);
  if (!post) {
    throw new Error("Post not found.");
  }
  await postRepository.deletePost(postId);
  return { message: "Post deleted successfully!" };
};

export default {
  browsePosts,
  readPost,
  addPost,
  editPost,
  removePost,
};
