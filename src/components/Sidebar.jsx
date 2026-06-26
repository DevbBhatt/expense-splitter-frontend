import { Link } from "react-router-dom";

function Sidebar() {

    return (

        <div className="w-60 bg-gray-900 text-white min-h-screen p-6">

            <h2 className="text-2xl font-bold mb-8">

                Dashboard

            </h2>

            <ul className="space-y-5">

                <li>

                    <Link to="/dashboard">
                        Dashboard
                    </Link>

                </li>

                <li>

                    <Link to="/groups">
                        Groups
                    </Link>

                </li>

                <li>

                    <Link to="/balances">
                        Balances
                    </Link>

                </li>

                <li>

                    <Link to="/profile">
                        Profile
                    </Link>

                </li>

            </ul>

        </div>

    );

}

export default Sidebar;