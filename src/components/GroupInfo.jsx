function GroupInfo({ group }) {

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

        </div>

    );

}

export default GroupInfo;