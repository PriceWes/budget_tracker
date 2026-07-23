import { useAuth } from "../../context/AuthContext";

export default function ProfileCard() {
    const { user} = useAuth();
    return (
        <div className="profile-card">
            <img
                src="https://ui-avatars.com/api/?name=name"
                alt="Profile"
                className="profile-image"
            />
            <h2>{user?.fullName}</h2>
            <p>{user?.email}</p>
            <button>
                Change Photo
            </button>
        </div>
    );
}