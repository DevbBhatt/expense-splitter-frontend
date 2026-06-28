import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

function AddExpenseModal({

    groupId,
    members,
    onClose,
    onExpenseCreated

}) {

    const [description, setDescription] = useState("");

    const [amount, setAmount] = useState("");

    const [splitType, setSplitType] = useState("EQUAL");

    const [loading, setLoading] = useState(false);

    const [splits, setSplits] = useState([]);

    const handleSplitChange = (userId, value) => {

        setSplits((prev) => {

            const filtered = prev.filter(
                split => split.userId !== userId
            );

            return [

                ...filtered,

                {

                    userId,

                    amount: Number(value)

                }

            ];

        });

    };

    const handleCreateExpense = async () => {

        if (!description.trim()) {

            toast.warning("Please enter description");

            return;

        }

        if (!amount || Number(amount) <= 0) {

            toast.warning("Please enter valid amount");

            return;

        }

        if (
            splitType === "EXACT" &&
            splits.length !== members.length
        ) {

            toast.warning("Please enter split amount for every member");

            return;

        }

        try {

            setLoading(true);

            await api.post(

                `/expenses/groups/${groupId}/expenses`,

                {

                    description,

                    amount: Number(amount),

                    splitType,

                    splits

                }

            );

            toast.success("Expense Created Successfully");

            onExpenseCreated();

            onClose();

        } catch (error) {

            console.log(error);

           toast.error(
                error.response?.data?.message ||
                "Failed to create expense"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">

            <div className="bg-white rounded-xl shadow-xl p-8 w-[500px]">

                <h2 className="text-2xl font-bold mb-6">

                    Add Expense

                </h2>

                <input

                    type="text"

                    placeholder="Description"

                    value={description}

                    onChange={(e) => setDescription(e.target.value)}

                    className="border rounded w-full p-3 mb-4"

                />

                <input

                    type="number"

                    placeholder="Amount"

                    value={amount}

                    onChange={(e) => setAmount(e.target.value)}

                    className="border rounded w-full p-3 mb-4"

                />

                <select

                    value={splitType}

                    onChange={(e) => setSplitType(e.target.value)}

                    className="border rounded w-full p-3 mb-5"

                >

                    <option value="EQUAL">

                        Equal

                    </option>

                    <option value="EXACT">

                        Exact

                    </option>

                </select>

                {

                    splitType === "EXACT" && (

                        <div className="mb-5">

                            <h3 className="font-semibold mb-3">

                                Split Amounts

                            </h3>

                            {

                                members.map((member) => (

                                    <div

                                        key={member.user.id}

                                        className="flex justify-between items-center mb-3"

                                    >

                                        <span>

                                            {member.user.name}

                                        </span>

                                        <input

                                            type="number"

                                            placeholder="Amount"

                                            className="border rounded p-2 w-40"

                                            onChange={(e) =>

                                                handleSplitChange(

                                                    member.user.id,

                                                    e.target.value

                                                )

                                            }

                                        />

                                    </div>

                                ))

                            }

                        </div>

                    )

                }

                <div className="flex justify-end gap-3">

                    <button

                        onClick={onClose}

                        className="bg-gray-500 text-white px-5 py-2 rounded hover:bg-gray-600"

                    >

                        Cancel

                    </button>

                    <button

                        onClick={handleCreateExpense}

                        disabled={loading}

                        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"

                    >

                        {

                            loading

                                ?

                                "Creating..."

                                :

                                "Create Expense"

                        }

                    </button>

                </div>

            </div>

        </div>

    );

}

export default AddExpenseModal;