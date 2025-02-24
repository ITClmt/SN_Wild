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

interface UserContextType {
  user: UserType | null;
  isAuthenticated: boolean;
  login: (userData: { id: number; username: string }) => void;
  logout: () => void;
  setUser: (userData: UserType) => void;
}

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

type ProfileFormData = {
  username: string;
  email: string;
  bio: string;
  website: string;
  profile_picture?: string;
};

interface TextAreaFeedProps {
  user: UserType;
  setPosts: (posts: PostType[]) => void;
}

interface UsersPostsFeedProps {
  posts: PostType[];
  setPosts: (posts: PostType[]) => void;
  otherUsers: UserType[];
  user: UserType;
}
