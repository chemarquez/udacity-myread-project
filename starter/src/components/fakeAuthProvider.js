const fakeAuthProvider = {
    authenticate: (username, password) => {
        // For the purpose of this dummy provider, we'll accept any username and password.
        // For production this should replace this with real authentication logic in a real app.

        if (username && password) {
            const token = `dummy-token-${new Date().getTime()}`; // Generate a dummy token.
            localStorage.setItem("username", username);
            localStorage.setItem("authToken", token);
            return Promise.resolve({ username, token });
        } else {
            return Promise.reject(new Error("Invalid username or password"));
        }
    },
    logout: () => {
        // Remove username and token from localStorage
        localStorage.removeItem("username");
        localStorage.removeItem("authToken");
        return Promise.resolve();
    },
};

export default fakeAuthProvider;
