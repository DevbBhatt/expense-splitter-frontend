import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import api from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Loading from "../components/Loading";
import GroupCard from "../components/GroupCard";

function Groups() {

    const [groups, setGroups] = useState([]);
    const [filteredGroups, setFilteredGroups] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const loadGroups = async () => {

        try {

            const response = await api.get("/groups?page=0&size=20");

            setGroups(response.data.content);
            setFilteredGroups(response.data.content);

        } catch (error) {

            console.log(error);

            toast.error("Failed to load groups");

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadGroups();

    }, []);

    useEffect(() => {

        const filtered = groups.filter(group =>
            group.name.toLowerCase().includes(search.toLowerCase())
        );

        setFilteredGroups(filtered);

    }, [search, groups]);

    return (

        <div>

            <Navbar />

            <div className="flex">

                <Sidebar />

                <div className="flex-1 bg-gray-100 min-h-screen p-10">

                    <div className="flex justify-between items-center">

                        <div>

                            <h1 className="text-4xl font-bold">
                                📁 Groups
                            </h1>

                            <p className="text-gray-500 mt-2">
                                Browse all your groups
                            </p>

                        </div>

                        <div className="bg-white shadow rounded-xl px-6 py-4">

                            <p className="text-gray-500">
                                Total Groups
                            </p>

                            <p className="text-3xl font-bold text-blue-600">
                                {groups.length}
                            </p>

                        </div>

                    </div>

                    <input
                        type="text"
                        placeholder="🔍 Search Group..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="mt-8 w-full border rounded-xl px-4 py-3"
                    />

                    <div className="mt-8">

                        {

                            loading ?

                                <Loading />

                                :

                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

                                    {

                                        filteredGroups.length === 0 ?

                                            <div className="col-span-full bg-white rounded-xl shadow-lg p-10 text-center">

                                                <h2 className="text-2xl font-bold">
                                                    No Groups Found 📂
                                                </h2>

                                            </div>

                                            :

                                            filteredGroups.map(group => (

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

        </div>

    );

}

export default Groups;