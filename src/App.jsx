import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import AddPost from "./components/blogsPages/addPosts";
import UserPosts from "./components/blogsPages/userPosts";
import HomePage from "./components/blogsPages/Home";
import Navbar from "./components/common/Navbar";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    // Listen for token changes (storage events)
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <BrowserRouter>
      <Navbar token={token} setToken={setToken} />
      <Routes key={token ? "auth" : "guest"}>
        {token ? (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/addpost" element={<AddPost />} />
            <Route path="/userposts" element={<UserPosts />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/register" element={<Register setToken={setToken} />} />
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}
