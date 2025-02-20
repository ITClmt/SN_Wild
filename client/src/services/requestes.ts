import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

const authenticateUser = async (data: { email: string; password: string }) => {
  const response = await axios
    .post(`${baseUrl}/api/auth/login`, data)
    .catch((error) => {
      console.error("Error authenticating user:", error);
      throw error;
    });
  return response.data;
};

const getUserbyid = async (id: number) => {
  const response = await axios
    .get(`${baseUrl}/api/users/${id}`)
    .catch((error) => {
      console.error("Error getting user by id:", error);
      throw error;
    });
  return response.data;
};

export { authenticateUser, getUserbyid };
