import { useNavigate } from "react-router-dom";

function GroupCard({ group }) {

    const navigate = useNavigate();

    return (

        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100">

            <div className="flex items-center gap-3">

                <div className="bg-blue-100 text-blue-600 p-3 rounded-xl text-2xl">
                    📁
                </div>

                <div>

                    <h2 className="text-2xl font-bold text-gray-800">
                        {group.name}
                    </h2>

                    <p className="text-sm text-gray-500">
                        Expense Group
                    </p>

                </div>

            </div>

            <div className="mt-5 space-y-2">

                <p className="text-gray-700">

                    <span className="font-semibold">
                        Created By:
                    </span>{" "}

                    {group.createdBy.name}

                </p>

                <p className="text-gray-500">

                    <span className="font-semibold">
                        Created:
                    </span>{" "}

                    {new Date(group.createdAt).toLocaleDateString()}

                </p>

            </div>

            <button
                onClick={() => navigate(`/groups/${group.id}`)}
                className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition font-semibold"
            >
                Open Group →
            </button>

        </div>

    );

}

export default GroupCard;