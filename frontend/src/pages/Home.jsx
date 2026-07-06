import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";

function Home() {

    const [blogs, setBlogs] = useState([]);
    const [search, setSearch] = useState("");

    const fetchBlogs = async () => {

        try {

            const res = await API.get("/blogs/all");

            console.log(res.data);

            setBlogs(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

     // eslint-disable-next-line react-hooks/set-state-in-effect
     fetchBlogs();

    }, []);

    const deleteBlog = async (id) => {

        try {

            const res = await API.delete(`/blogs/delete/${id}`);

            toast.success(res.data.message || "Blog Deleted");

            fetchBlogs();

        } catch (error) {

            console.log(error);
            toast.error(error.response?.data?.message || "Delete failed");

        }

    };

    const likeBlog = async (id) => {

        try {

            const res = await API.put(`/blogs/like/${id}`);

            toast.success(res.data.message);

            fetchBlogs();

        } catch (error) {

            console.log(error);
            toast.error(error.response?.data?.message || "Like failed");

        }

    };

    return (

        <div className="min-h-screen bg-zinc-950 text-white p-10">

            <h1 className="text-5xl font-bold mb-3">
                Explore Blogs 🚀
            </h1>

            <p className="text-zinc-400 mb-10">
                Read blogs from developers
            </p>

            <input
                type="text"
                placeholder="Search blogs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-4 rounded-xl bg-zinc-900 text-white outline-none border border-zinc-700 mb-8"
            />

            <h2 className="mb-6 text-xl">
                Total Blogs : {blogs.length}
            </h2>

            <div className="flex flex-col gap-6">

                {blogs
                    .filter((blog) =>
                        blog.title
                            .toLowerCase()
                            .includes(search.toLowerCase())
                    )
                    .map((blog) => (

                        <div
                            key={blog._id}
                            className="bg-zinc-900 p-6 rounded-2xl border border-zinc-700 hover:scale-[1.02] transition duration-300"
                        >

                            {blog.image && (
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="w-full h-64 object-cover rounded-xl mb-4"
                                />
                            )}

                            <h2 className="text-3xl font-bold mb-4">
                                {blog.title}
                            </h2>

                            <p className="text-zinc-300 mb-5">
                                {blog.content}
                            </p>

                            <p className="text-sm text-zinc-500 mb-4">
                                Author : {blog.author?.name}
                            </p>

                            <div className="flex flex-wrap gap-3">

                                <Link
                                    to={`/single/${blog._id}`}
                                    className="bg-white text-black px-4 py-2 rounded-lg hover:bg-zinc-300"
                                >
                                    Read More
                                </Link>

                                <Link
                                    to={`/edit/${blog._id}`}
                                    className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-400"
                                >
                                    Edit
                                </Link>

                                <button
                                    onClick={() => deleteBlog(blog._id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                >
                                    Delete
                                </button>

                                <button
                                    onClick={() => likeBlog(blog._id)}
                                    className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600"
                                >
                                    ❤️ {blog.likes}
                                </button>

                            </div>

                        </div>

                    ))
                }
                

            </div>

        </div>

    );
}

export default Home;