import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";

function ResetPassword() {

    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email;

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (password !== confirmPassword) {

            return toast.error("Passwords do not match");

        }

        try {

            const res = await API.post("/users/reset-password", {
                email,
                password
            });

            toast.success(res.data.message);

            navigate("/login");

        } catch (error) {

            toast.error(
                error.response?.data?.message || "Something went wrong"
            );

        }

    };

    return (

        <div className="min-h-screen bg-zinc-950 flex items-center justify-center">

            <form
                onSubmit={handleSubmit}
                className="bg-zinc-900 p-8 rounded-2xl w-[400px]"
            >

                <h1 className="text-3xl text-white text-center mb-6 font-bold">
                    Reset Password
                </h1>

                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 rounded-lg mb-4 bg-zinc-800 text-white outline-none"
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-3 rounded-lg mb-5 bg-zinc-800 text-white outline-none"
                />

                <button
                    type="submit"
                    className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600"
                >
                    Reset Password
                </button>

            </form>

        </div>

    );

}

export default ResetPassword;