import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

function EditBlog() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        content: ""
    });

    // Fetch Single Blog
    const fetchBlog = async () => {
        try {
            const res = await API.get(`/blogs/single/${id}`);

            setFormData({
                title: res.data.title,
                content: res.data.content
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchBlog();
    }, []);

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

            await API.put(
                `/blogs/update/${id}`,
                formData,
                {
                    headers: {
                        Authorization: token
                    }
                }
            );

            toast.success("Blog Updated Successfully!");
            navigate("/");
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
                className="bg-zinc-900 p-8 rounded-2xl w-[500px]"
            >
                <h1 className="text-3xl text-white font-bold mb-6 text-center">
                    Edit Blog
                </h1>

                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter title"
                    className="w-full p-3 rounded-lg mb-4 bg-zinc-800 text-white outline-none"
                />

                <textarea
                    name="content"
                    rows="6"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Enter content"
                    className="w-full p-3 rounded-lg mb-4 bg-zinc-800 text-white outline-none"
                />

                <button
                    type="submit"
                    className="w-full bg-white text-black p-3 rounded-lg font-bold hover:bg-zinc-300"
                >
                    Update Blog
                </button>
            </form>
        </div>
    );
}

export default EditBlog;