import  { useState } from 'react';
import axios from 'axios';

function AddPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleAddPost = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/posts', {
        username: 'testuser',
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
    <div>
      <h2>Add Post</h2>
      <form onSubmit={handleAddPost}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
}

export default AddPost;
