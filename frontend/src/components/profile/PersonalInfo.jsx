import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import {
    notifySuccess,
    notifyError,
} from "../utils/toast";

export default function PersonalInfo() {
    const { user, updateUser } = useAuth();

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        currency: "KES",
    });

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const res = await api.get("/profile");

            setForm({
                fullName: res.data.fullName || "",
                email: res.data.email || "",
                phone: res.data.phone || "",
                currency: res.data.currency || "KES",
            });

            if (updateUser) {
                updateUser(res.data);
            }

        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const save = async (e) => {
        e.preventDefault();

        try {
            const res = await api.put("/profile", {
                fullName: form.fullName,
                phone: form.phone,
                currency: form.currency,
            });

            if (updateUser) {
                updateUser(res.data);
            }

            notifySuccess("Profile updated successfully");

        } catch (error) {
            notifyError(
                error.response?.data?.message ||
                "Failed to update profile"
            );
        }
    };

    return (
        <form
            className="profile-form"
            onSubmit={save}
        >
            <h2>Personal Information</h2>

            <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Full Name"
            />

            <input
                type="email"
                name="email"
                value={form.email}
                disabled
            />

            <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone Number"
            />

            <select
                name="currency"
                value={form.currency}
                onChange={handleChange}
            >
                <option value="KES">KES</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
            </select>

            <button type="submit">
                Save Changes
            </button>
        </form>
    );
}