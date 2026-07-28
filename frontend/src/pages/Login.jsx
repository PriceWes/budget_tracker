import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import {
    notifySuccess,
    notifyError,
} from "../utils/toast";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/auth/login", form);
            login(res.data);
            notifySuccess(
                `Welcome back, ${res.data.user.fullName}!`
            );
            navigate("/dashboard");
        } catch (error) {
            notifyError(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                />

                <button>Login</button>
            </form>
            <Link to="/register">
            Create Account</Link>
        </div>
    );
}

