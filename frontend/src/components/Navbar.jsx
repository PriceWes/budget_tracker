import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <div className="navbar">
            <h3>Welcome, {user?.fullName}</h3>
            <button onClick={logout}>
                Logout
            </button>
        </div>
    );
}