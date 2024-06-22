import { useState } from 'react';
import axios from 'axios';

function AddPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const user1 = localStorage.getItem('username');

  const handleAddPost = async (e) => {
    e.preventDefault();
    console.log(user1);
    try {
      const token = localStorage.getItem('token');
      console.log(token);
      const response = await axios.post('http://localhost:5000/posts', {
        username: user1,
        title,
        content,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Post</h2>
      <form onSubmit={handleAddPost} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Post
        </button>
      </form>
    </div>
  );
}

export default AddPost;
