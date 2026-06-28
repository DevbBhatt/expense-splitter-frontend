import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MemberTable from "../components/MemberTable";
import ExpenseTable from "../components/ExpenseTable";
import BalanceTable from "../components/BalanceTable";
import SettlementTable from "../components/SettlementTable";
import AddExpenseModal from "../components/AddExpenseModal";
import { toast } from "react-toastify";

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

    const [members, setMembers] = useState([]);

    const [expenses, setExpenses] = useState([]);

    const [balances, setBalances] = useState([]);

    const [settlements, setSettlements] = useState([]);

    const [showExpenseModal, setShowExpenseModal] = useState(false);

    const loadMembers = async () => {

    try {

        const response = await api.get(
            `/groups/members/${id}?page=0&size=20`
        );

        setMembers(response.data.content);

    } catch (error) {

        console.log(error);

    }

};

    const loadGroup = async () => {

    try {

        const response = await api.get(`/groups/${id}`);

        console.log("Group Response:", response.data);

        setGroup(response.data);

    } catch (error) {

        console.log("Group Error:", error.response?.data);

        toast.error(
            error.response?.data?.message || "Failed to load group"
        );

        navigate("/dashboard");

    } finally {

        setLoading(false);

    }

};

    const loadExpenses = async () => {

    try {

        const response = await api.get(
            `/expenses/groups/${id}/expenses?page=0&size=20`
        );

        setExpenses(response.data.content);

    } catch (error) {

        console.log(error);

    }

};

const loadBalances = async () => {

    try {

        const response = await api.get(
            `/balances/groups/${id}/balances`
        );

        console.log("Full Response:", response);
        console.log("Response Data:", response.data);
        console.log("Is Array:", Array.isArray(response.data));

        setBalances(response.data);

    } catch (error) {

        console.log(error);

    }

};

const loadSettlements = async () => {

    try {

        const response = await api.get(
            `/balances/groups/${id}/settlements`
        );

        setSettlements(response.data);

    } catch (error) {

        console.log(error);

    }

};




    useEffect(() => {

    loadGroup();
    loadExpenses();
    loadMembers();
    loadBalances();
    loadSettlements();

}, []);

const refreshData = () => {

    loadExpenses();

    loadBalances();

    loadSettlements();

};



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
                    <button

    onClick={() => setShowExpenseModal(true)}

    className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 mb-6 ml-3"

>

    + Add Expense

</button>
                    {

                        loading ?

                        <Loading />

                    :

                            <>

                        <GroupInfo group={group} />

                        <MemberTable members={members} />

                        <ExpenseTable
                            expenses={expenses}
                            onExpenseDeleted={refreshData}
                        />
                        <BalanceTable balances={balances} />

                        <SettlementTable settlements={settlements} />

    </>

                    }

                </div>

            </div>

            {

showExpenseModal && (

<AddExpenseModal
    groupId={id}
    members={members}
    onClose={() => setShowExpenseModal(false)}
    onExpenseCreated={refreshData}
/>

)

}

        </div>

    );

}

export default GroupDetails;