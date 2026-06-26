import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {

        // Basic Validation
        if (!email || !password) {
            alert("Please enter email and password");
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

            alert("Login Successful");

            navigate("/dashboard");

        } catch (error) {

            console.error(error);

            alert(
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