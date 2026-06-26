import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Loading from "../components/Loading";
import GroupInfo from "../components/GroupInfo";

function GroupDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [group, setGroup] = useState(null);

    const [loading, setLoading] = useState(true);

    const loadGroup = async () => {

        try {

            const response = await api.get(`/groups/${id}`);

            setGroup(response.data);

        } catch (error) {

            console.log(error);

            alert("Failed to load group");

            navigate("/dashboard");

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadGroup();

    }, []);

    return (

        <div>

            <Navbar />

            <div className="flex">

                <Sidebar />

                <div className="flex-1 bg-gray-100 min-h-screen p-10">

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="mb-6 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
                    >
                        ← Back
                    </button>

                    {

                        loading ?

                            <Loading />

                            :

                            <GroupInfo group={group} />

                    }

                </div>

            </div>

        </div>

    );

}

export default GroupDetails;