import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [title, setTitle] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/posts`);
        setPosts(response.data);
        setFilteredPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(title.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [title, posts]);

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">Latest Posts</h1>
        
        {token && (
          <Link
            to="/userposts"
            className="bg-blue-500 hover:bg-blue-600 transition-all text-white px-4 py-2 rounded shadow"
          >
            My Posts
          </Link>
        )}
      </div>

      {/* Search Bar */}
      <input
        type="text"
        className="border border-gray-300 rounded-lg px-4 py-2 mb-6 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Search posts by title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Posts List */}
      {filteredPosts.length === 0 ? (
        <p className="text-gray-500 text-center">No posts found.</p>
      ) : (
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <div
              key={post._id}
              className="p-6 border rounded-lg shadow hover:shadow-lg transition-shadow bg-white"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">{post.title}</h2>
              <p className="text-sm text-gray-500 mb-4">By {post.username}</p>
              <p className="text-gray-700 whitespace-pre-line">{post.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
