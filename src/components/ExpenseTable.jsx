import api from "../services/api";

function ExpenseTable({ expenses, onExpenseDeleted }) {

    const handleDelete = async (expenseId) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this expense?"
    );

    if (!confirmDelete) {
        return;
    }

    try {

        await api.delete(`/expenses/${expenseId}`);

        alert("Expense Deleted Successfully");

        onExpenseDeleted();

    } catch (error) {

        console.log(error);

        alert("Failed to delete expense");

    }

};

    return (

        <div className="bg-white rounded-xl shadow-lg p-6 mt-8">

            <h2 className="text-2xl font-bold mb-5">

                Expenses

            </h2>

            {
                expenses.length === 0 ?

                    <p className="text-gray-500">

                        No Expenses Found

                    </p>

                    :

                    <table className="w-full">

                        <thead>

                            <tr className="border-b">

                                <th className="text-left py-3">

                                    Description

                                </th>

                                <th className="text-left py-3">

                                    Amount

                                </th>

                                <th className="text-left py-3">

                                    Paid By

                                </th>

                                <th className="text-left py-3">

                                    Split Type

                                </th>

                                <th className="text-left py-3">

                                        Action

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                expenses.map((expense) => (

                                    <tr
                                        key={expense.id}
                                        className="border-b"
                                    >

                                        <td className="py-3">

                                            {expense.description}

                                        </td>

                                        <td className="py-3">

                                            ₹ {expense.amount}

                                        </td>

                                        <td className="py-3">

                                            {expense.paidBy.name}

                                        </td>

                                        <td className="py-3">

                                            {expense.splitType}

                                        </td>

                                        <td className="py-3">

                                     < button

                                        onClick={() => handleDelete(expense.id)}

                                         className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"

                                     >

        Delete

    </button>

</td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

            }

        </div>

    );

}

export default ExpenseTable;