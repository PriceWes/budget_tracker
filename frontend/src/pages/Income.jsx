import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import api from "../services/api";

export default function Income() {
    const [incomes, setIncomes] = useState([]);
    const [form, setForm] = useState({
        source: "",
        amount: "",
        description: "",
    });

    const [editingId, setEditingId] = useState(null);

    const loadIncome = async () => {
        try {
            const res = await api.get("/income");
            setIncomes(res.data);
        } catch (error) {
            console.error(error);
        }
    };

      useEffect(() => {
        loadIncome();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const resetForm = () => {
        setForm({
            source: "",
            amount: "",
            description: "",
        });
        setEditingId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if(editingId) {
                await api.put(`/income/${editingId}`, form);
            } else {
                await api.post("/income", form);
            }

            resetForm();
            loadIncome();
        } catch (error) {
            alert(error.response?.data?.message || "OPeration failed");
        }
    };

    const handleEdit = (income) => {
        setEditingId(income.id);

        setForm({
            source: income.source,
            amount: income.amount,
            description: income.description || "",
        });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this income?")) return;
        await api.delete(`/income/${id}`);
        loadIncome();
    };

    const totalIncome = incomes.reduce(
        (sum, item) => sum + item.amount,
        0
    );

    return (
        <DashboardLayout>
            <h1>Income Management</h1>
            <h2>Total Income: KES {totalIncome}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="source"
                    placeholder="Income Source"
                    value={form.source}
                    onChange={handleChange}
                    required
                />

                <input 
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={form.amount}
                    onChange={handleChange}
                    required
                />

                <input
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                />

                <button type="submit">
                    {editingId ? "Update Income" : "Add Income"}
                </button>
            </form>
            <table border="1" cellPadding={10}>
                <thead>
                    <tr>
                        <th>Source</th>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {incomes.map((income) => (
                        <tr key={income.id}>
                            <td>{income.source}</td>
                            <td>KES {income.amount}</td>
                            <td>{income.description}</td>
                            <td>
                                {new Date(income.date).toLocaleDateString()}
                            </td>
                            <td>
                                <button
                                    onClick={() => handleEdit(income)}
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => handleDelete(income.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </DashboardLayout>
    );
}