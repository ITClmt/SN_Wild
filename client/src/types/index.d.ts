interface UserType {
  username: string;
  id: number;
  email: string;
  display_name?: string;
  bio?: string;
  profile_picture?: string;
  website?: string;
}

interface PostType {
  id: number;
  content: string;
  created_at: string;
  updated_at: string;
  user_id: number;
}
