import { useEffect, useState} from "react";
import DashboardLayout from "../components/DashboardLayout";
import api from "../services/api";

export default function Budget() {
    const [budgets, setBudgets] = useState([]);
    const [form, setForm] = useState({
        category: "",
        limit:"",
        month: "",
        year: "",
    });

    const [editingId, setEditingId] = useState(null);
    const loadBudgets = async () => {
        try {
            const res = await api.get("/budgets");
            setBudgets(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadBudgets();
        loadAnalysis();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };
    const resetForm = () => {
        setForm({
            category: "",
            limit: "",
            month: "",
            year: "",
        });
        setEditingId(null);
    };

    const handleSubmit =async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/budgets/${editingId}`, form);
            } else {
                await api.post("/budgets", form);
            }
            resetForm();
            loadBudgets();
            loadAnalysis();
        } catch (error) {
            alert(error.response?.data?.message || "Operation failed");
        }
    };

    const handleEdit = (budget) => {
        setEditingId(budget.id);
        setForm({
            category: budget.category,
            limit: budget.limit,
            month: budget.month,
            year: budget.year,
        });
    };

    const handleDelete = async (id) => {
        try {
            if (!window.confirm("Delete this budget?")) return;
            await api.delete(`/budgets/${id}`);
            loadBudgets();
            loadAnalysis();
        } catch (error) {
            alert(error.response?.data?.message || "Delete failed");
        }
    };

    const [analysis, setAnalysis] = useState([]);
    const loadAnalysis = async () => {
        try{
            const res =await api.get("/budgets/analysis");
            setAnalysis(res.data);
        } catch (error){
            console.error(error);
        }
    };

    return (
        <DashboardLayout>
            <h1>Budget Manangement</h1>
            <form onSubmit={handleSubmit}>
                <select
    name="category"
    value={form.category}
    onChange={handleChange}
    required
>
    <option value="">Select Category</option>
    <option value="Food">Food</option>
    <option value="Transport">Transport</option>
    <option value="Rent">Rent</option>
    <option value="Utilities">Utilities</option>
    <option value="Entertainment">Entertainment</option>
    <option value="Healthcare">Healthcare</option>
    <option value="Education">Education</option>
    <option value="Shopping">Shopping</option>
    <option value="Savings">Savings</option>
    <option value="Other">Other</option>
</select>

                <input
                    type="number"
                    name="limit"
                    placeholder="Budget Limit"
                    value={form.limit}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="month"
                    placeholder="Month"
                    min="1"
                    max="12"
                    value={form.month}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="year"
                    placeholder="Year"
                    value={form.year}
                    onChange={handleChange}
                    required
                />

                <button type="submit">
                    {editingId ? "Update Budget" : "Create Budget"}
                </button>
            </form>
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Limit</th>
                        <th>Month</th>
                        <th>Year</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {budgets.map((budget) => (
                        <tr key={budget.id}>
                            <td>{budget.category}</td>
                            <td>KES {budget.limit}</td>
                            <td>{budget.month}</td>
                            <td>{budget.year}</td>

                            <td>
                                <button
                                    onClick={() => handleEdit(budget)}
                                >
                                    Edit
                                </button>

                                <button 
                                    onClick={() => handleDelete(budget.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Budget Analysis</h2>
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Budget</th>
                        <th>Spent</th>
                        <th>Remaining</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {analysis.map((item) => (
                        <tr key={item.id}>
                            <td>{item.category}</td>
                            <td>KES {item.limit}</td>
                            <td>KES {item.spent}</td>
                            <td>KES {item.remaining}</td>
                            <td>
                                {item.remaining > item.limit * 0.2
                                    ? "🟢 Good"
                                    : item.remaining > 0
                                    ? "🟡 Almost Full"
                                    : "🔴 Over Budget"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </DashboardLayout>
    );
}

