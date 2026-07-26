import { FaBars,FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar({ toggleSidebar }) {

    const {user, logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    }
    return (
        <div className="navbar">
            <div className="navbar-left">
            <button
                className="menu-btn"
                onClick={toggleSidebar}
            >
                <FaBars /> 
            </button>
            <h2>Budget Tracker</h2>
            </div>
            <div className="navbar-right">
                <span className="welcome-text">
                    Welcome, {user?.fullName}
                </span>
                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    <FaSignOutAlt />
                    <span>Logout</span>
                </button>
            </div>
            
        </div>
    );
}