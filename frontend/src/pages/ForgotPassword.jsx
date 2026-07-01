import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";

function ForgotPassword() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await API.post("/users/forgot-password", {
                email
            });

            toast.success(res.data.message);

            navigate("/verify-otp", {
                state: { email }
            });

        } catch (error) {

            toast.error(error.response.data.message);

        }

    };

    return (

        <div className="min-h-screen bg-zinc-950 flex items-center justify-center">

            <form
                onSubmit={handleSubmit}
                className="bg-zinc-900 p-8 rounded-2xl w-[400px]"
            >

                <h1 className="text-3xl text-white mb-6 font-bold text-center">
                    Forgot Password
                </h1>

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    className="w-full p-3 rounded-lg mb-5 bg-zinc-800 text-white"
                />

                <button
                    className="w-full bg-white text-black p-3 rounded-lg"
                >
                    Send OTP
                </button>

            </form>

        </div>

    );

}

export default ForgotPassword;