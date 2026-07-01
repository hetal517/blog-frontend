import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";

function VerifyOTP() {

    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email;

    const [otp, setOtp] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await API.post("/users/verify-otp", {
                email,
                otp
            });

            toast.success(res.data.message);

            navigate("/reset-password", {
                state: { email }
            });

        } catch (error) {

            toast.error(error.response?.data?.message || "Something went wrong");

        }

    };

    return (

        <div className="min-h-screen bg-zinc-950 flex items-center justify-center">

            <form
                onSubmit={handleSubmit}
                className="bg-zinc-900 p-8 rounded-2xl w-[400px]"
            >

                <h1 className="text-3xl text-white text-center mb-6 font-bold">
                    Verify OTP
                </h1>

                <input
                    type="text"
                    placeholder="Enter 6 Digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full p-3 rounded-lg bg-zinc-800 text-white mb-5 outline-none"
                />

                <button
                    type="submit"
                    className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600"
                >
                    Verify OTP
                </button>

            </form>

        </div>

    );

}

export default VerifyOTP;