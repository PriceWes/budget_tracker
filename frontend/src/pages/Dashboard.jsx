import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import DashboardCard from "../components/DashboardCard";
import api from "../services/api";
import IncomeExpenseChart from "../components/charts/IncomeExpenseChart";
import ExpenseCategoryChart from "../components/charts/ExpenseCategoryChart";

export default function Dashboard() {
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    const [balance, setBalance] = useState(0);
    const [categoryData, setCategoryData] = useState([]);

    const loadSummary = async () => {
        try {
            const incomeRes = await api.get("/income/total");
            const expenseRes = await api.get("/expenses/total");
            const categoryRes = await api.get("/expenses/categories");

            const income = incomeRes.data.total;
            const expenses = expenseRes.data.total;

            setIncome(income);
            setExpense(expenses);

            setTotalIncome(income);
            setTotalExpenses(expenses);
            setBalance(income - expenses);

            setCategoryData(categoryRes.data);
        } catch (error) {
            console.error("Dashboard Error:", error);
        }
    };

    useEffect(() => {
        loadSummary();
    }, []);

    return (
        <DashboardLayout>
            <h1>Dashboard</h1>

            <div className="cards">
                <DashboardCard
                    title="Total Income"
                    value={`KES ${totalIncome}`}
                />

                <DashboardCard
                    title="Total Expenses"
                    value={`KES ${totalExpenses}`}
                />

                <DashboardCard
                    title="Balance"
                    value={`KES ${balance}`}
                />
            </div>

            <div
                style={{
                    marginTop: "30px",
                    padding: "20px",
                    background: "#fff",
                    borderRadius: "10px",
                }}
            >
                <h2>Income vs Expenses</h2>

                <IncomeExpenseChart
                    income={income}
                    expense={expense}
                />
            </div>

            <div
                style={{
                    marginTop: "30px",
                    padding: "20px",
                    background: "#fff",
                    borderRadius: "10px",
                }}
            >
                <h2>Expenses by Category</h2>

                {categoryData.length > 0 ? (
                    <ExpenseCategoryChart data={categoryData} />
                ) : (
                    <p>No expense data available.</p>
                )}
            </div>
        </DashboardLayout>
    );
}