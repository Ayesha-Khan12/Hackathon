import { useState } from "react";
import { auth } from "../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/board");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleRegister}
        className="bg-white/10 backdrop-blur-md p-8 rounded-lg flex flex-col gap-4 w-80"
      >
        <h2 className="text-2xl font-bold text-white">Register</h2>
        <input
          type="email"
          placeholder="Email"
          className="p-2 rounded bg-white/20 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 rounded bg-white/20 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-white/20 p-2 rounded text-white hover:bg-white/30"
        >
          Register
        </button>
        <p className="text-white text-sm text-center">
          Already have an account? <Link to="/login" className="underline">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
