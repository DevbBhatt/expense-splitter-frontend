function MemberTable({ members }) {

    return (

        <div className="bg-white rounded-xl shadow-lg p-6 mt-8">

            <h2 className="text-2xl font-bold mb-5">

                Members

            </h2>

            <table className="w-full">

                <thead>

                    <tr className="border-b">

                        <th className="text-left py-3">
                            Name
                        </th>

                        <th className="text-left py-3">
                            Email
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {
                        members.map((member) => (

                            <tr
                                key={member.id}
                                className="border-b"
                            >

                                <td className="py-3">

                                    {member.userName}

                                </td>

                                <td className="py-3">

                                    {member.userEmail}

                                </td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </div>

    );

}

export default MemberTable;