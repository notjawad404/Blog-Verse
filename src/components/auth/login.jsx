

import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const Navigate1 = useNavigate();

    // Redirect if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      Navigate1('/');
    }
  }, [Navigate1]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://blog-verse-node-backend.vercel.app/api/auth/login', { email, password });
      alert(`Login successful! Token: ${response.data.token}`);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.username);

        console.log(response.data);

      setError('');
      Navigate1('/');
    } catch (error) {
      setError('Invalid credentials, please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
          >
            Login
          </button>
          <Link to="/register" className="text-blue-500 hover:underline">
            Don&apos;t have an account? Register here
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
