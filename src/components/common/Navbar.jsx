import { Link, useNavigate } from "react-router-dom";
import blogVerse from "../../assets/blogVerse.jpeg";

const Navbar = () => {

    const navigation = useNavigate();

    const logout = () => {
        // remove token and username from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('username');

        alert('Logout Successfully')
        navigation('/login')
    }

  return (
    <nav className="bg-blue-600 p-1">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
        <img src={blogVerse} alt="Blog-Verse" className="w-20 h-20 inline-block mx-2 rounded-full" />
        Blog Verse
        </div>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-gray-300">Home</Link>
          <Link to="/addpost" className="text-white hover:text-gray-300">Add Posts</Link>
          <Link to="/userposts" className="text-white hover:text-gray-300">UserPosts</Link>
          <button className="text-white hover:text-gray-300" onClick={logout}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
