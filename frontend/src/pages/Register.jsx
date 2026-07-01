import { useState } from "react";
import { toast } from "react-toastify";
import API from "../services/api";

function Register() {

    const [formData, setFormData] = useState({
        name: "",
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
                "/users/register",
                formData
            );

            console.log(res.data);

            toast.success(res.data.message);

        } catch (error) {

            console.log(error);

            toast.error(error.response.data.message);

        }
    };

    return (

        <div className="min-h-screen bg-zinc-950 flex items-center justify-center">

            <form
                onSubmit={handleSubmit}
                className="bg-zinc-900 p-8 rounded-2xl w-[400px] shadow-lg"
            >

                <h1 className="text-3xl text-white font-bold mb-6 text-center">
                    Register
                </h1>

                <input
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg mb-4 bg-zinc-800 text-white outline-none"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg mb-4 bg-zinc-800 text-white outline-none"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg mb-4 bg-zinc-800 text-white outline-none"
                />

                <button
                    type="submit"
                    className="w-full bg-white text-black p-3 rounded-lg font-bold hover:bg-zinc-300"
                >
                    Register
                </button>

            </form>

        </div>

    );
}

export default Register;