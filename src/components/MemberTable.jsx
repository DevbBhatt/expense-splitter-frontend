function MemberTable({
    members,
    onAddMember,
    onRemoveMember,
    isCreator,
    creatorId
}) {

    return (

        <div className="bg-white rounded-xl shadow-lg p-6 mt-8">

            <div className="flex justify-between items-center mb-5">

                <h2 className="text-2xl font-bold">
                    Members
                </h2>

                {
    isCreator && (

        <button
            onClick={onAddMember}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
            + Add Member
        </button>

    )
}

            </div>

            <table className="w-full">

                <thead>

                    <tr className="border-b">

    <th className="text-left py-3">
        Name
    </th>

    <th className="text-left py-3">
        Email
    </th>

    {
        isCreator && (

            <th className="text-left py-3">
                Action
            </th>

        )
    }

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

                                {
    isCreator && (

        <td className="py-3">

            {
                member.userId === creatorId ?

                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
    Creator
</span>

                    :

                    <button
                        onClick={() => onRemoveMember(member.userId)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                        Remove
                    </button>

            }

        </td>

    )
}

                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </div>

    );

}

export default MemberTable;