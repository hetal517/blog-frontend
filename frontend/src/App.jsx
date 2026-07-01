import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateBlog from "./pages/CreateBlog";
import SingleBlog from "./pages/SingleBlog";
import EditBlog from "./pages/EditBlog";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP";
import ResetPassword from "./pages/ResetPassword";

function App() {

  return (

    <>

      <Navbar />

      <Routes>

        {/* Protected Home */}
        <Route path="/" element={ <ProtectedRoute> <Home /></ProtectedRoute>}/>
        <Route path="/create" element={ <ProtectedRoute> <CreateBlog /> </ProtectedRoute> }/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/single/:id" element={<SingleBlog />} />
        <Route path="/edit/:id" element={<EditBlog />} />
        <Route path = "/profile" element={<Profile/>}/>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword/>}/>
      </Routes>

      <ToastContainer />

    </>

  );
}

export default App;