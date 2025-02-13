import axios from "axios";

const authenticateUser = async (data: { email: string; password: string }) => {
  const response = await axios.post(
    "http://localhost:3310/api/auth/login",
    data,
  );
  return response.data;
};

export { authenticateUser };
