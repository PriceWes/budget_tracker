import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import api from "../../services/api";

export default function PersonalInfo() {
    const { user} = useAuth();

    const [form, setForm] = useState({
        fullName: user?.fullName || "",
        email: user?.email || "",
        phone: user?.phone || "",
        currency: user?.currency || "KES",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const save = async (e) => {
        e.preventDefault();
        try {
            await api.put("/users/profile", form);
            alert("Profile updated");
        } catch (error) {
            alert(error.response?.data?.message);
        }
    };

    return (
        <form
            className="profile-form"
            onSubmit={save}
        >
            <h2>
                Personal Information
            </h2>

            <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Full Name"
            />

            <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
            />

            <input
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

            <button>
                Save Changes
            </button>
        </form>
    );
}