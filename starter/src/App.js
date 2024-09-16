import "./App.css";
import SearchBooks from "./components/SearchBooks";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./components/LoginPage";
import Logout from "./components/Logout";

function App() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/" element={<PrivateRoute element={<Home />} />} />
            <Route path="/search" element={<PrivateRoute element={<SearchBooks />} />} />
        </Routes>
    );
}

export default App;
