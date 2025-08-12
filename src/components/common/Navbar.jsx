import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import blogVerse from "../../assets/blogVerse.jpeg";

const Navbar = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const logout = () => {
    // Clear authentication
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken(null);

    alert("Logout Successfully");

    // Navigate after state update to ensure rerender
    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 0);
  };

  return (
    <nav className="bg-blue-600 p-2">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold flex items-center">
          <img
            src={blogVerse}
            alt="Blog-Verse"
            className="w-12 h-12 mr-2 rounded-full"
          />
          Blog Verse
        </div>

        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-gray-300">
            Home
          </Link>

          {token ? (
            <>
              <Link to="/addpost" className="text-white hover:text-gray-300">
                Add Posts
              </Link>
              <Link to="/userposts" className="text-white hover:text-gray-300">
                User Posts
              </Link>
              <button
                className="text-white hover:text-gray-300"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-gray-300">
                Login
              </Link>
              <Link to="/register" className="text-white hover:text-gray-300">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
