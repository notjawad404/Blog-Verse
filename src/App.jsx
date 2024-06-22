import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/auth/register";
import Login from "./components/auth/login";


export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />

        </Routes>

      </BrowserRouter>
    </>
  )
}
