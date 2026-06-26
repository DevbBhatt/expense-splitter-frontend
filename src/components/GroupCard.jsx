import { useNavigate } from "react-router-dom";

function GroupCard({ group }) {

    const navigate = useNavigate();

    return (

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">

            <h2 className="text-2xl font-bold">
                {group.name}
            </h2>

            <p className="text-gray-600 mt-2">
                Created By : {group.createdBy.name}
            </p>

            <p className="text-gray-500">
                {new Date(group.createdAt).toLocaleDateString()}
            </p>

            <button
                onClick={() => navigate(`/groups/${group.id}`)}
                className="mt-5 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Open
            </button>

        </div>

    );

}

export default GroupCard;