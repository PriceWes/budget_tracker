import { useState } from "react";
import api from "../../services/api";
import {
    notifySuccess,
    notifyError,
    notifyWarning,
} from "../../utils/toast";

export default function PasswordSection() {
    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const handleChange = (e) => {
        setPasswords({
            ...passwords,
            [e.target.name]: e.target.value,
        });
    };

    const changePassword = async (e) => {
        e.preventDefault();
        if (
            passwords.newPassword !==
            passwords.confirmPassword
        ) {
            return notifyWarning("Passwords do not match");
        }

        try {
            await api.put(
                "/profile/password",{
                    currentPassword: passwords.currentPassword,
                    newPassword: passwords.newPassword,
                }
            );
            notifySuccess("Password changed successfully");

            setPasswords({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            })
        } catch (error) {
            notifyError(error.response?.data?.message);
        }
    };

    return (
        <form
            className="profile-form"
            onSubmit={changePassword}
        >
            <h2>Security</h2>
            <input
                type="password"
                name="currentPassword"
                value={passwords.currentPassword}
                placeholder="Current Password"
                onChange={handleChange}
            />

            <input
                type="password"
                name="newPassword"
                value={passwords.newPassword}
                placeholder="New Password"
                onChange={handleChange}
            />

            <input
                type="password"
                name="confirmPassword"
                value={passwords.confirmPassword}
                placeholder="Confirm Password"
                onChange={handleChange}
            />

            <button>
                Change Password
            </button>
        </form>
    );
}