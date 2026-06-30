function GroupInfo({
    group,
    isCreator,
    onDeleteGroup
}) {

    return (

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">

            <h1 className="text-4xl font-bold text-gray-800">

                {group.name}

            </h1>

            <p className="mt-4 text-gray-600">

                Created By :
                <span className="font-semibold">
                    {" "}
                    {group.createdBy.name}
                </span>

            </p>

            <p className="text-gray-600">

                Email :
                <span className="font-semibold">
                    {" "}
                    {group.createdBy.email}
                </span>

            </p>

            <p className="text-gray-500 mt-2">

                Created At :
                {" "}
                {new Date(group.createdAt).toLocaleString()}

            </p>

            {
    isCreator && (

        <button
            onClick={onDeleteGroup}
            className="mt-6 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
        >
            Delete Group
        </button>

    )
}

        </div>

    );

}

export default GroupInfo;