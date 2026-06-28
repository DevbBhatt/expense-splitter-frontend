import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {

        // Basic Validation
        if (!email || !password) {
            toast.warning("Please enter email and password");
            return;
        }
        try {

            const response = await api.post("/auth/login", {
                email,
                password
            });

            // Save JWT Token
            localStorage.setItem("token", response.data.data);

            console.log("Saved Token:", localStorage.getItem("token"));

            toast.success("Login Successful");

            navigate("/dashboard");

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message || "Login Failed"
            );
        }

    };

    return (

        <div>

            <h1>Expense Splitter</h1>

            <h2>Login</h2>

            <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <br /><br />

            <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <br /><br />

            <button onClick={handleLogin}>
                Login
            </button>

        </div>

    );

}

export default Login;