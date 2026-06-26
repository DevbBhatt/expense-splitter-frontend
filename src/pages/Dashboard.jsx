import { useEffect, useState } from "react";

import api from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Loading from "../components/Loading";
import GroupCard from "../components/GroupCard";
import CreateGroupModal from "../components/CreateGroupModal";

function Dashboard() {

    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const loadGroups = async () => {

        try {

            setLoading(true);

            const response = await api.get("/groups?page=0&size=10");

            setGroups(response.data.content);

        } catch (error) {

            console.log(error);

            alert("Failed to load groups");

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadGroups();

    }, []);

    return (

        <div>

            <Navbar />

            <div className="flex">

                <Sidebar />

                <div className="flex-1 bg-gray-100 min-h-screen p-10">

                    <div className="flex justify-between items-center">

                        <div>

                            <h1 className="text-4xl font-bold">
                                Welcome 👋
                            </h1>

                            <p className="text-gray-600 mt-2">
                                Manage your expense groups.
                            </p>

                        </div>

                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
                        >
                            + Create Group
                        </button>

                    </div>

                    <div className="mt-10">

                        {
                            loading
                                ?
                                <Loading />
                                :
                                <div className="grid grid-cols-3 gap-8">

                                    {
                                        groups.map((group) => (

                                            <GroupCard
                                                key={group.id}
                                                group={group}
                                            />

                                        ))
                                    }

                                </div>

                        }

                    </div>

                </div>

            </div>

            {
                showModal && (

                    <CreateGroupModal

                        onClose={() => setShowModal(false)}

                        onGroupCreated={loadGroups}

                    />

                )
            }

        </div>

    );

}

export default Dashboard;