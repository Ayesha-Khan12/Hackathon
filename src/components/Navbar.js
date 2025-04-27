import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-gray-400 to-gray-600 backdrop-blur-md p-4 rounded-lg mx-4 my-2 flex justify-between items-center">
      <h1 className="text-xl font-bold text-black">Task Tracker</h1>
      <button
        onClick={handleLogout}
        className="bg-white/20 px-4 py-2 rounded-md text-black hover:bg-white/30 transition-all duration-200"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
