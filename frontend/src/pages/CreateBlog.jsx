import { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function CreateBlog() {

    const [formData, setFormData] = useState({
        title: "",
        content: ""
    });

    const [image, setImage] = useState(null);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            const data = new FormData();

            data.append("title", formData.title);
            data.append("content", formData.content);
            data.append("image", image);

            const res = await API.post(
                "/blogs/create",
                data,
                {
                    headers: {
                        authorization: token,
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            toast.success(res.data.message);

            setFormData({
                title: "",
                content: ""
            });

            setImage(null);

        } catch (error) {

            console.log(error);

            toast.error(
                error?.response?.data?.message || "Something went wrong"
            );

        }

    };

    return (

        <div className="min-h-screen bg-zinc-950 flex items-center justify-center">

            <form
                onSubmit={handleSubmit}
                className="bg-zinc-900 p-8 rounded-2xl w-[500px] shadow-lg"
            >

                <h1 className="text-3xl text-white font-bold mb-6 text-center">
                    Create Blog
                </h1>

                <input
                    type="text"
                    name="title"
                    placeholder="Enter title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg mb-4 bg-zinc-800 text-white outline-none"
                />

                <textarea
                    name="content"
                    placeholder="Enter content"
                    rows="6"
                    value={formData.content}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg mb-4 bg-zinc-800 text-white outline-none"
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="w-full p-3 rounded-lg mb-4 bg-zinc-800 text-white"
                />

                <button
                    type="submit"
                    className="w-full bg-white text-black p-3 rounded-lg font-bold hover:bg-zinc-300"
                >
                    Create Blog
                </button>

            </form>

        </div>

    );
}

export default CreateBlog;