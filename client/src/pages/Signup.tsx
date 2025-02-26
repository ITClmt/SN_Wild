import SignupNavBar from "../components/SignupNavBar";
import SignupForm from "../components/SignupForm";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Signup() {
  const { user, isAuthenticated } = useUser();
  if (isAuthenticated || user) {
    return <Navigate to="/profile" />;
  }
  return (
    <section className="flex flex-col items-center justify-center h-screen font-poppins">
      <SignupNavBar />
      <h1 className="text-5xl font-oswald font-bold mb-10 text-center">
        Créez votre compte
      </h1>
      <SignupForm />
    </section>
  );
}
