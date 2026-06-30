import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

function AddMemberModal({ groupId, members, onClose, onMemberAdded }) {

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");

    useEffect(() => {

        loadUsers();

    }, []);

    const loadUsers = async () => {

        try {

            const response = await api.get("/users?page=0&size=100");

            const allUsers = response.data.content;

            const memberIds = members.map(member => member.userId);

            const availableUsers = allUsers.filter(
                user => !memberIds.includes(user.id)
            );

            setUsers(availableUsers);

        } catch (error) {

            console.log(error);

            toast.error("Failed to load users");

        }

    };

    const addMember = async () => {

        if (!selectedUser) {

            toast.warning("Select a user");

            return;

        }

        try {

            await api.post(
                `/groups/${groupId}/members/${selectedUser}`
            );

            toast.success("Member Added");

            onMemberAdded();

            onClose();

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message || "Failed to add member"
            );

        }

    };

    return (

        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

            <div className="bg-white rounded-xl p-6 w-96">

                <h2 className="text-2xl font-bold mb-5">

                    Add Member

                </h2>

                <select

                    className="w-full border p-3 rounded"

                    value={selectedUser}

                    onChange={(e) => setSelectedUser(e.target.value)}

                >

                    <option value="">
                        Select User
                    </option>

                    {

                        users.map(user => (

                            <option
                                key={user.id}
                                value={user.id}
                            >

                                {user.name} ({user.email})

                            </option>

                        ))

                    }

                </select>

                <div className="flex justify-end mt-6 gap-3">

                    <button

                        onClick={onClose}

                        className="px-4 py-2 rounded bg-gray-300"

                    >

                        Cancel

                    </button>

                    <button

                        onClick={addMember}

                        className="px-4 py-2 rounded bg-blue-600 text-white"

                    >

                        Add Member

                    </button>

                </div>

            </div>

        </div>

    );

}

export default AddMemberModal;