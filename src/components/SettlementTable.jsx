function SettlementTable({ settlements }) {

    return (

        <div className="bg-white rounded-xl shadow-lg p-6 mt-8">

            <h2 className="text-2xl font-bold mb-5">

                Suggested Settlements

            </h2>

            {
                settlements.length === 0 ?

                    <p className="text-gray-500">

                        No Settlements Required

                    </p>

                    :

                    <table className="w-full">

                        <thead>

                            <tr className="border-b">

                                <th className="text-left py-3">

                                    From

                                </th>

                                <th className="text-left py-3">

                                    To

                                </th>

                                <th className="text-left py-3">

                                    Amount

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                settlements.map((settlement, index) => (

                                    <tr
                                        key={index}
                                        className="border-b"
                                    >

                                        <td className="py-3">

                                            {settlement.fromUserName}

                                        </td>

                                        <td className="py-3">

                                            {settlement.toUserName}

                                        </td>

                                        <td className="py-3 font-semibold text-blue-600">

                                            ₹ {settlement.amount}

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

export default SettlementTable;