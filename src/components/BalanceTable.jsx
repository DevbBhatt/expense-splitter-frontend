function BalanceTable({ balances = [] }) {

    const balanceList = Array.isArray(balances) ? balances : [];

    return (

        <div className="bg-white rounded-xl shadow-lg p-6 mt-8">

            <h2 className="text-2xl font-bold mb-5">
                Balances
            </h2>

            {
                balanceList.length === 0 ?

                    <p className="text-gray-500">
                        No Balances Found
                    </p>

                    :

                    <table className="w-full">

                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-3">User</th>
                                <th className="text-left py-3">Balance</th>
                            </tr>
                        </thead>

                        <tbody>

                            {
                                balanceList.map((balance) => (

                                    <tr
                                        key={balance.userId}
                                        className="border-b"
                                    >

                                        <td className="py-3">
                                            {balance.userName}
                                        </td>

                                        <td
                                            className={`py-3 font-semibold ${
                                                balance.balance >= 0
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                            }`}
                                        >
                                            ₹ {balance.balance}
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

export default BalanceTable;