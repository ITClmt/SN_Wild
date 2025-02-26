import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import LoginNavBar from "../components/LoginNavBar";
import LoginForm from "../components/LoginForm";

export default function Login() {
  const { user, isAuthenticated } = useUser();
  if (isAuthenticated || user) {
    return <Navigate to="/profile" />;
  }

  return (
    <section className="flex flex-col items-center justify-center h-screen font-poppins">
      <LoginNavBar />
      <h1 className="text-5xl font-oswald font-bold mb-10">Connectez-vous</h1>
      <LoginForm />
    </section>
  );
}
