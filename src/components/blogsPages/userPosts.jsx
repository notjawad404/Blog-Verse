import { useState, useEffect } from 'react';
import axios from 'axios';

const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [editPost, setEditPost] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const username = localStorage.getItem('username');

  useEffect(() => {
    // Fetch all posts
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://blog-verse-node-backend.vercel.app/posts');
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    // Filter posts by username
    const filtered = posts.filter(post => post.username.toLowerCase() === username.toLowerCase());
    setFilteredPosts(filtered);
  }, [username, posts]);

  const handleEdit = (post) => {
    setEditPost(post._id);
    setTitle(post.title);
    setContent(post.content);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`https://blog-verse-node-backend.vercel.app/posts/${editPost}`, { title, content });
      const updatedPosts = posts.map(post => post._id === editPost ? response.data : post);
      setPosts(updatedPosts);
      setEditPost(null);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`https://blog-verse-node-backend.vercel.app/posts/${postId}`);
      const updatedPosts = posts.filter(post => post._id !== postId);
      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Posts by {username}</h1>
      <div className="grid grid-cols-1 gap-4">
        {filteredPosts.map(post => (
          <div key={post._id} className="p-4 border rounded shadow">
            {editPost === post._id ? (
              <>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border p-2 mb-2 w-full"
                />
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="border p-2 mb-2 w-full"
                />
                <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Update</button>
                <button onClick={() => setEditPost(null)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p className="text-gray-600">{post.username}</p>
                <p>{post.content}</p>
                <button onClick={() => handleEdit(post)} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Edit</button>
                <button onClick={() => handleDelete(post._id)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPosts;
