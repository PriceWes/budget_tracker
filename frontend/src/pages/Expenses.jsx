import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import api from "../services/api";

export default function Expense() {
    const [expenses, setExpenses] = useState([]);
    const [form, setForm] = useState({
        category: "",
        amount: "",
        description: "",
    });
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [sort, setSort] = useState("newest");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");


    const [editingId, setEditingId] = useState(null);

    const loadExpense = async () => {
        try {
            const res = await api.get("/expenses",{
                params: {
                    search,
                    category,
                    sort,
                    startDate,
                    endDate,
                },
            });
            console.log(res.data);
            setExpenses(res.data);
        } catch (error) {
            console.error(error);
        }
    };

      useEffect(() => {
        loadExpense();
    }, [
        search,
        category,
        sort,
        startDate,
        endDate,
    ]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const resetForm = () => {
        setForm({
            category: "",
            amount: "",
            description: "",
        });
        setEditingId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if(editingId) {
                await api.put(`/expenses/${editingId}`, form);
            } else {
                await api.post("/expenses", form);
            }

            resetForm();
            loadExpense();
        } catch (error) {
            alert(error.response?.data?.message || "OPeration failed");
        }
    };

    const handleEdit = (expense) => {
        setEditingId(expense.id);

        setForm({
            category: expense.category,
            amount: expense.amount,
            description: expense.description || "",
        });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this expense?")) return;
        await api.delete(`/expenses/${id}`);
        loadExpense();
    };

    const totalExpense = expenses.reduce(
        (sum, item) => sum + item.amount,
        0
    );

    return (
        <DashboardLayout>
            <h1>Expense Management</h1>
            <h2>Total Expense: KES {totalExpense}</h2>
            <form onSubmit={handleSubmit}>
                 <select
    name="category"
    value={form.category}
    onChange={handleChange}
    required
>
    <option value="">Expense Category</option>
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
                    {editingId ? "Update Expense" : "Add Expense"}
                </button>
            </form>
            <div className="filters">
                <input
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
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
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />

                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />

                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <otpion value="newest">Newest</otpion>
                    <option value="oldest">Oldest</option>
                    <option value="highest">Highest Amount</option>
                    <option value="lowest">Lowest Amount</option>

                </select>
            </div>


            <table border="1" cellPadding={10}>
                <thead>
                    <tr>
                        <th>category</th>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense) => (
                        <tr key={expense.id}>
                            <td>{expense.category}</td>
                            <td>KES {expense.amount}</td>
                            <td>{expense.description}</td>
                            <td>
                                {new Date(expense.date).toLocaleDateString()}
                            </td>
                            <td>
                                <button
                                    onClick={() => handleEdit(expense)}
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => handleDelete(expense.id)}
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