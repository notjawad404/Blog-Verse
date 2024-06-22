import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import AddPost from "./components/blogsPages/addPosts";
import UserPosts from "./components/blogsPages/userPosts";
import HomePage from "./components/blogsPages/Home";


export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/" element={<HomePage/>} />
          <Route path="/addpost" element={<AddPost/>} />
          <Route path="/userposts" element={<UserPosts/>} />


        </Routes>

      </BrowserRouter>
    </>
  )
}
