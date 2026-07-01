import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

function Login() {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await API.post(
                "/users/login",
                formData
            );

            // Save Token
            localStorage.setItem(
                "token",
                res.data.token
            );

            toast.success("Login Successful 🎉");

            // Redirect
            window.location.href = "/";

        } catch (error) {

            toast.error(
                error.response?.data?.message || "Login Failed"
            );

        }

    };

    return (

        <div className="min-h-screen bg-zinc-950 flex items-center justify-center">

            <form
                onSubmit={handleSubmit}
                className="bg-zinc-900 p-8 rounded-2xl w-[400px] shadow-lg"
            >

                <h1 className="text-3xl text-white font-bold mb-6 text-center">
                    Login
                </h1>

                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg mb-4 bg-zinc-800 text-white outline-none"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg mb-2 bg-zinc-800 text-white outline-none"
                />

                <div className="text-right mb-5">

                    <Link
                        to="/forgot-password"
                        className="text-blue-400 hover:text-blue-300 hover:underline text-sm"
                    >
                        Forgot Password?
                    </Link>

                </div>

                <button
                    type="submit"
                    className="w-full bg-white text-black p-3 rounded-lg font-bold hover:bg-zinc-300"
                >
                    Login
                </button>

                <p className="text-center text-zinc-400 mt-6">

                    Don't have an account?{" "}

                    <Link
                        to="/register"
                        className="text-green-400 hover:underline"
                    >
                        Register
                    </Link>

                </p>

            </form>

        </div>

    );

}

export default Login;