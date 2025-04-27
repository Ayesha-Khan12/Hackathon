import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../lib/firebase";

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) 
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-400 to-gray-600">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );

  if (!user) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
