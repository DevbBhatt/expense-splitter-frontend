import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");

        navigate("/");
    };

    return (

        <nav className="bg-blue-600 text-white flex justify-between items-center px-8 py-4 shadow-md">

            <h1 className="text-2xl font-bold">
                Expense Splitter
            </h1>

            <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
            >
                Logout
            </button>

        </nav>

    );

}

export default Navbar;