import { useState } from "react";
import { useNavigate, Link} from "react-router-dom";
import api from "../services/api";

export default function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const register = async (e) => {
        e.preventDefault();
        try {
            await api.post("/auth/register", form);
            alert("Registration successful");
            navigate("/login");
        } catch (error) {
            alert(error.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={register}>
                <input
                    name="fullName"
                    placeholder="Full Name"
                    onChange={handleChange}
                />

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

                <button type="submit">
                    Register
                </button>
            </form>

            <Link to="/login">
                Already have an account?
            </Link>
        </div>
    );
}