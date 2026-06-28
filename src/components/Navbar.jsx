import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import api from "../services/api";

function Navbar() {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const logout = () => {

        localStorage.removeItem("token");

        toast.success("Logged out successfully");

        setTimeout(() => {
        navigate("/");
            }, 800);

    };

    useEffect(() => {

    const loadCurrentUser = async () => {

        try {

            const response = await api.get("/users/me");

            setUser(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    loadCurrentUser();

}, []);

    return (

        <nav className="bg-blue-600 text-white flex justify-between items-center px-8 py-4 shadow-md">

            <div>

                <h1 className="text-2xl font-bold">
                    Expense Splitter
                </h1>

                <p className="text-blue-100 text-sm">
                    Split expenses with your friends
                </p>

            </div>

            <div className="flex items-center gap-4">

    <div className="text-right">

        <p className="font-semibold">
            👤 {user?.name}
        </p>

        <p className="text-sm text-blue-100">
            {user?.email}
        </p>

    </div>

    <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold"
    >
        Logout
    </button>

</div>

        </nav>

    );

}

export default Navbar;