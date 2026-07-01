import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";

function SingleBlog() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [comment, setComment] = useState("");

    const fetchBlog = async () => {
        try {
            const res = await API.get(`/blogs/single/${id}`);
            setBlog(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchBlog();
    }, []);

   const addComment = async () => {

    try {

        const token = localStorage.getItem("token");

        const res = await API.post(

            `/blogs/comment/${id}`,

            {
                text: comment
            },

            {
                headers: {
                    authorization: token
                }
            }

        );

        toast.success(res.data.message);

        setComment("");

        fetchBlog();

    } catch (error) {

        console.log(error);

        toast.error("Comment failed");

    }

};
    if (!blog) {
        return (
            <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-white p-10">
            <div className="max-w-4xl mx-auto bg-zinc-900 p-10 rounded-2xl border border-zinc-700">
                <h1 className="text-5xl font-bold mb-6">
                    {blog.title}
                </h1>
                <p className="text-zinc-400 mb-8">
                    By {blog.author?.name}
                </p>
                <p className="text-lg leading-9 text-zinc-200">
                    {blog.content}
                </p>

                <div className="mt-10">

                    <h2 className="text-2xl font-bold mb-4">
                        Comments
                    </h2>

                    <div className="flex gap-4 mb-6">

                        <input
                            type="text"
                            placeholder="Write comment..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="flex-1 p-4 rounded-xl bg-zinc-800 outline-none"
                        />

                        <button
                            onClick={addComment}
                            className="bg-white text-black px-6 rounded-xl hover:bg-zinc-300"
                        >
                            Post
                        </button>

                    </div>

                    <div className="flex flex-col gap-4">

                        {blog.comments?.map((c, index) => (

                            <div
                                key={index}
                                className="bg-zinc-800 p-4 rounded-xl"
                            >

                                <p className="text-zinc-200">
                                    {c.text}
                                </p>

                            </div>

                        ))}

                    </div>

                </div>
        </div>

        </div>
    );
}

export default SingleBlog;