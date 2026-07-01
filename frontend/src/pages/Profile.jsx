import { useEffect, useState } from "react";
import API from "../services/api";

function Profile() {

    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);

    const fetchProfile = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await API.get(
                "/users/profile",
                {
                    headers: {
                        authorization: token
                    }
                }
            );

            console.log(res.data);

            setUser(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    const fetchMyBlogs = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await API.get(
                "/blogs/myblogs",
                {
                    headers: {
                        authorization: token
                    }
                }
            );

            setBlogs(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchProfile();
        fetchMyBlogs();

    }, []);

    return (

        <div className="min-h-screen bg-zinc-950 text-white p-10">

            {/* Profile Card */}
            <div className="bg-zinc-900 rounded-3xl p-10 mb-10 border border-zinc-800 shadow-xl">

                <div className="flex flex-col items-center">

                    <div className="w-28 h-28 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-5xl font-bold text-white shadow-lg">

                        {user?.name
                            ? user.name.charAt(0).toUpperCase()
                            : "H"}

                    </div>

                    <h1 className="text-4xl font-bold mt-5">
                        {user?.name || "Hetal Chavda"}
                    </h1>

                    <p className="text-zinc-400 mt-2">
                        {user?.email || "hetal@gmail.com"}
                    </p>



                    <div className="flex gap-20 mt-8">

                        <div className="text-center">
                            <h2 className="text-3xl font-bold">
                                {blogs.length}
                            </h2>
                            <p className="text-zinc-400">
                                Blogs
                            </p>
                        </div>

                        <div className="text-center">
                            <h2 className="text-3xl font-bold">
                                {blogs.reduce(
                                    (total, blog) =>
                                        total + (blog.likes || 0),
                                    0
                                )}
                            </h2>
                            <p className="text-zinc-400">
                                Likes
                            </p>
                        </div>

                    </div>

                </div>

            </div>

            {/* My Blogs */}
            <h2 className="text-4xl font-bold mb-8">
                My Blogs
            </h2>

            <div className="flex flex-col gap-6">

                {blogs.length === 0 ? (

                    <div className="bg-zinc-900 p-10 rounded-2xl text-center">

                        <h2 className="text-2xl font-bold">
                            No Blogs Yet 😔
                        </h2>

                        <p className="text-zinc-400 mt-2">
                            Create your first blog
                        </p>

                    </div>

                ) : (

                    blogs.map((blog) => (

                        <div
                            key={blog._id}
                            className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 hover:border-pink-500 transition duration-300"
                        >

                            <h3 className="text-2xl font-bold mb-3">
                                {blog.title}
                            </h3>

                            <p className="text-zinc-400 mb-5">
                                {blog.content}
                            </p>

                            <div className="flex gap-4">

                                <span className="bg-pink-500 px-4 py-2 rounded-lg">
                                    ❤️ {blog.likes || 0}
                                </span>

                                <span className="bg-zinc-800 px-4 py-2 rounded-lg">
                                    💬 {blog.comments?.length || 0}
                                </span>

                            </div>

                        </div>

                    ))

                )}

            </div>

        </div>

    );
}

export default Profile;