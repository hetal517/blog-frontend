import { Link } from "react-router-dom";

function Navbar() {

    const token = localStorage.getItem("token");

    const logoutHandler = () => {

        localStorage.removeItem("token");

        window.location.href = "/login";

    };

    return (

        <nav className="bg-zinc-900 text-white px-10 py-5 flex items-center justify-between border-b border-zinc-800">

            <Link
                to="/"
                className="text-3xl font-bold"
            >
                DevBlog 😎
            </Link>

            <div className="flex items-center gap-6 text-lg">

                {token && (

                    <>
                    
                        <Link
                            to="/"
                            className="hover:text-zinc-400"
                        >
                            Home
                        </Link>

                        <Link
                            to="/create"
                            className="hover:text-zinc-400"
                        >
                            Create
                        </Link>

                        <Link
                            to="/profile"
                            className="hover:text-zinc-400"
                        >
                            Profile
                        </Link>

                        <button
                            onClick={logoutHandler}
                            className="bg-red-500 px-4 py-2 rounded-xl hover:bg-red-600"
                        >
                            Logout
                        </button>

                    </>

                )}

                {!token && (

                    <>
                    
                        <Link
                            to="/login"
                            className="hover:text-zinc-400"
                        >
                            Login
                        </Link>

                        <Link
                            to="/register"
                            className="hover:text-zinc-400"
                        >
                            Register
                        </Link>

                    </>

                )}

            </div>

        </nav>

    );
}

export default Navbar;