import ThemeController from "../components/ThemeController";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useState } from "react";
import axios from "axios";
import type { AxiosError } from "axios";

interface IFormInput {
  email: string;
  password: string;
  username: string;
}

export default function Signup() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit = async (data: IFormInput) => {
    setError("");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        {
          username: data.username,
          email: data.email,
          password: data.password,
        },
        { withCredentials: true },
      );

      login(response.data.user);
      navigate("/profile");
    } catch (error) {
      if ((error as AxiosError)?.response?.status === 401) {
        setError("Identifiants invalides");
      } else {
        setError("Une erreur est survenue. Veuillez réessayer plus tard.");
      }
    }
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen font-poppins">
      <ThemeController />
      <div className="fixed top-0 left-0 p-4 gap-4 flex">
        <Link to="/login">
          <button type="button" className="btn btn-outline btn-xs">
            Connexion
          </button>
        </Link>
        <Link to="/">
          <button type="button" className="btn btn-outline btn-xs">
            Retour
          </button>
        </Link>
      </div>
      <h1 className="text-5xl font-oswald font-bold mb-10 text-center">
        Créez votre compte
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center"
      >
        <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
          <legend className="fieldset-legend">Sign-up</legend>
          <label className="fieldset-label" htmlFor="username">
            Pseudo/Nom
          </label>
          <input
            type="text"
            placeholder="Nom"
            className="input"
            autoComplete="username"
            {...register("username", { required: true, minLength: 3 })}
          />
          {errors.username && (
            <p className="text-error">Le pseudo/nom est requis</p>
          )}
          <label className="fieldset-label" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            className="input"
            autoComplete="email"
            placeholder="name@example.com"
            {...register("email", { required: true })}
          />
          {errors.email && <p className="text-error">L'email est requis</p>}
          <label className="fieldset-label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            className="input"
            placeholder="********"
            autoComplete="current-password"
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors.password && (
            <p className="text-error">
              Le mot de passe doit contenir au moins 6 caractères
            </p>
          )}
          {error && <p className="text-error">{error}</p>}
          <button type="submit" className="btn btn-primary">
            Créer un compte
          </button>
        </fieldset>
      </form>
    </section>
  );
}
