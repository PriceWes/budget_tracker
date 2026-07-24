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

    const validatePassword = (password) => {
    const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#^()_\-+=]).{8,}$/;

    return regex.test(password);
};

const [passwordValid, setPasswordValid] = useState(false);
    

    const handleChange = (e) => {

    const updated = {
        ...form,
        [e.target.name]: e.target.value,
    };

    setForm(updated);

    if (e.target.name === "password") {
        setPasswordValid(validatePassword(e.target.value));
    }
    {form.password && (
    <p style={{ color: passwordValid ? "green" : "red" }}>
        {passwordValid
            ? "✓ Strong password"
            : "Password does not meet the requirements"}
    </p>
)}
};

    

    const register = async (e) => {
        e.preventDefault();
        if (!validatePassword(form.password)) {
    return alert(
        "Password must contain:\n\n" +
        "• At least 8 characters\n" +
        "• One uppercase letter\n" +
        "• One lowercase letter\n" +
        "• One number\n" +
        "• One special character"
    );
}
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

                <small style={{ color: "#666" }}>
    Password must contain:
    <br />
    • Minimum 8 characters
    <br />
    • One uppercase letter
    <br />
    • One lowercase letter
    <br />
    • One number
    <br />
    • One special character
</small>

                <button type="submit" disabled={!passwordValid}>
                    Register
                </button>
            </form>

            <Link to="/login">
                Already have an account?
            </Link>
        </div>
    );
}