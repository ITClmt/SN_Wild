import { Link } from "react-router-dom";

export default function FirstPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">FirstPage</h1>
      <Link to="/login" className="btn btn-primary">
        Login
      </Link>
      <Link to="/signup" className="btn btn-primary">
        Signup
      </Link>
    </div>
  );
}
