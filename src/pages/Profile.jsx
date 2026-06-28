import { useEffect, useState } from "react";
import api from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Loading from "../components/Loading";

import { toast } from "react-toastify";

function Profile() {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadProfile = async () => {

        try {

            const response = await api.get("/users/me");

            setUser(response.data);

        } catch (error) {

            console.log(error);

            toast.error("Failed to load profile");

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadProfile();

    }, []);

    return (

        <div>

            <Navbar />

            <div className="flex">

                <Sidebar />

                <div className="flex-1 bg-gray-100 min-h-screen p-10">

                    {

                        loading ?

                            <Loading />

                            :

                            <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-8">

                                <div className="text-center">

                                    <div className="text-6xl">
                                        👤
                                    </div>

                                    <h1 className="text-3xl font-bold mt-4">
                                        My Profile
                                    </h1>

                                </div>

                                <div className="mt-8 space-y-6">

                                    <div>

                                        <p className="text-gray-500">
                                            Name
                                        </p>

                                        <p className="text-xl font-semibold">
                                            {user.name}
                                        </p>

                                    </div>

                                    <div>

                                        <p className="text-gray-500">
                                            Email
                                        </p>

                                        <p className="text-xl font-semibold">
                                            {user.email}
                                        </p>

                                    </div>

                                    {
                                        user.createdAt && (

                                            <div>

                                                <p className="text-gray-500">
                                                    Member Since
                                                </p>

                                                <p className="text-xl font-semibold">
                                                    {new Date(user.createdAt).toLocaleDateString()}
                                                </p>

                                            </div>

                                        )
                                    }

                                </div>

                                <button
                                    disabled
                                    className="mt-8 w-full bg-gray-400 text-white py-3 rounded-xl cursor-not-allowed"
                                >
                                    Edit Profile (Coming Soon)
                                </button>

                            </div>

                    }

                </div>

            </div>

        </div>

    );

}

export default Profile;