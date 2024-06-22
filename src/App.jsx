import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import AddPost from "./components/blogsPages/addPosts";
import UserPosts from "./components/blogsPages/userPosts";
import HomePage from "./components/blogsPages/Home";


export default function App() {
  const token = localStorage.getItem('token');

  return (

    <>
      <BrowserRouter>
        <Routes>
          {token ? (
            <>
              <Route path="/" element={<HomePage />} />
              <Route path="/addpost" element={<AddPost />} />
              <Route path="/userposts" element={<UserPosts />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}
