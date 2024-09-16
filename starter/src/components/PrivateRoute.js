import React from "react";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // null indicates loading state

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Check if the token exists in localStorage or other authentication logic
                const token = localStorage.getItem("authToken");
                if (token) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error("Authentication check failed", error);
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    // If authentication status is still loading, you might want to show a loading spinner or similar
    if (isAuthenticated === null) {
        return <div>Loading...</div>; // Or use a spinner
    }

    // Redirect based on authentication status
    return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
