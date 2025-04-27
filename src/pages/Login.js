import { useState } from "react";
import { auth } from "../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/board");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-400 to-gray-600">
      <form
        onSubmit={handleLogin}
        className="bg-white/10 backdrop-blur-md p-8 rounded-lg flex flex-col gap-4 w-full sm:w-[320px] md:w-[400px] lg:w-[500px] border-2 border-black shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out"
      >
        <h2 className="text-2xl font-bold text-black mb-4 text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="p-3 rounded bg-white/20 text-black placeholder:text-black focus:outline-none focus:ring-2 focus:ring-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="p-3 rounded bg-white/20 text-black placeholder:text-black focus:outline-none focus:ring-2 focus:ring-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-black hover:bg-gray-800 p-3 rounded text-white mt-4 transition-all duration-200 shadow-md hover:shadow-xl"
        >
          Login
        </button>
        <p className="text-black text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="underline text-black">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
