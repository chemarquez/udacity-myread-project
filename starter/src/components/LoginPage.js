import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fakeAuthProvider from "./fakeAuthProvider";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Use a ref to keep track of whether the component is mounted
    const isMounted = React.useRef(true);

    useEffect(() => {
        // Set the ref to false when the component unmounts
        return () => {
            isMounted.current = false;
        };
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");

        try {
            await fakeAuthProvider.authenticate(username, password);
            // Only navigate if the component is still mounted
            if (isMounted.current) {
                navigate("/");
            }
        } catch (error) {
            if (isMounted.current) {
                setError(error.message);
            }
        } finally {
            if (isMounted.current) {
                setLoading(false);
            }
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
            <h2>Login Page</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "10px" }}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
