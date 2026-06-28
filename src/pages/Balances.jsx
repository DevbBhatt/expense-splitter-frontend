import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import api from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Loading from "../components/Loading";

function Balances() {

    const [balances, setBalances] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadBalances = async () => {

        try {

            const response = await api.get("/balances/me");

            setBalances(response.data);

        } catch (error) {

            console.log(error);

            toast.error("Failed to load balances");

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadBalances();

    }, []);

    const totalBalance = balances.reduce(
        (sum, item) => sum + item.balance,
        0
    );

    return (

        <div>

            <Navbar />

            <div className="flex">

                <Sidebar />

                <div className="flex-1 bg-gray-100 min-h-screen p-10">

                    <h1 className="text-4xl font-bold">
                        💰 My Balances
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Balance summary across all your groups.
                    </p>

                    {
                        loading ?

                            <Loading />

                            :

                            <>

                                <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 w-72">

                                    <p className="text-gray-500">
                                        Net Balance
                                    </p>

                                    <p
                                        className={`text-4xl font-bold mt-2 ${
                                            totalBalance >= 0
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }`}
                                    >
                                        ₹ {totalBalance}
                                    </p>

                                </div>

                                <div className="mt-8 bg-white rounded-2xl shadow-lg overflow-hidden">

                                    <table className="w-full">

                                        <thead className="bg-gray-100">

                                            <tr>

                                                <th className="text-left p-4">
                                                    Group
                                                </th>

                                                <th className="text-left p-4">
                                                    Balance
                                                </th>

                                            </tr>

                                        </thead>

                                        <tbody>

                                            {

                                                balances.length === 0 ?

                                                    <tr>

                                                        <td
                                                            colSpan="2"
                                                            className="text-center py-8 text-gray-500"
                                                        >

                                                            No Balance Found

                                                        </td>

                                                    </tr>

                                                    :

                                                    balances.map((item, index) => (

                                                        <tr
                                                            key={index}
                                                            className="border-t"
                                                        >

                                                            <td className="p-4">

                                                                📁 {item.groupName}

                                                            </td>

                                                            <td
                                                                className={`p-4 font-bold ${
                                                                    item.balance >= 0
                                                                        ? "text-green-600"
                                                                        : "text-red-600"
                                                                }`}
                                                            >

                                                                ₹ {item.balance}

                                                            </td>

                                                        </tr>

                                                    ))

                                            }

                                        </tbody>

                                    </table>

                                </div>

                            </>

                    }

                </div>

            </div>

        </div>

    );

}

export default Balances;