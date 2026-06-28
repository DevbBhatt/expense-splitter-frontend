import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

function CreateGroupModal({ onClose, onGroupCreated }) {

    const [name, setName] = useState("");

    const handleCreateGroup = async () => {

        if (!name.trim()) {
            toast.warning("Please enter group name");
            return;
        }

        try {

            await api.post("/groups", {
                name: name
            });

            toast.success("Group Created Successfully");

            onGroupCreated();

            onClose();

        } catch (error) {

            console.log(error);

           toast.error(
                error.response?.data?.message ||
                "Failed to create group"
        );
        }

    };

    return (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">

            <div className="bg-white rounded-xl shadow-xl p-8 w-96">

                <h2 className="text-2xl font-bold mb-6">

                    Create Group

                </h2>

                <input
                    type="text"
                    placeholder="Enter Group Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border w-full p-3 rounded"
                />

                <div className="flex justify-end gap-3 mt-6">

                    <button
                        onClick={onClose}
                        className="bg-gray-400 text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleCreateGroup}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Create
                    </button>

                </div>

            </div>

        </div>

    );

}

export default CreateGroupModal;