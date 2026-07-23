import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import DashboardCard from "../components/DashboardCard";
import api from "../services/api";

export default function Reports() {
    const [summary, setSummary] = useState(null);
    const [month, setMonth] = useState("");
    const currentYear = new globalThis.Date().getFullYear();
    const [year, setYear] = useState(currentYear);
    const loadReport = async () => {
        try {
            const res = await api.get("/reports/summary",{
                params: {
                    month,
                    year,
                },
            });
            setSummary(res.data);
        } catch (error) {
            console.error(error);
        }
    };

      useEffect(() => {
        loadReport();
    }, [month, year]);

    if (!summary) {
        return(
            <DashboardLayout>
                <p>Loading...</p>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <h1>Financial Report</h1>
            <div className="cards">
                <div
                    style={{
                        display: "flex",
                        gap: "15px",
                        marginBottom: "20px",
                    }}
                >
                    <select
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                    >
                        <option value="">All Months</option>
                        {Array.from({ length:12 }, (_, i) => (
                            <option
                                key={i + 1}
                                value={i + 1}
                            >
                                {new Date(2025, i).toLocaleString("default", {
                                    month: "long",
                                })}
                            </option>
                        ))}
                    </select>
                    <input
                        type="number"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    />
                </div>
                <DashboardCard
                    title="Total Income"
                    value={`KES ${summary.totalIncome.toLocaleString()}`}
                />

                <DashboardCard
                    title="Total Expense"
                    value={`KES ${summary.totalExpense.toLocaleString()}`}
                />

                <DashboardCard
                    title="Balance"
                    value={`KES ${summary.balance.toLocaleString()}`}
                />
            </div>

            <h2 style={{ marginTop: "30px"}}>
                Budgets
            </h2>

            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Limit</th>
                        <th>Month</th>
                        <th>Year</th>
                    </tr>
                </thead>

                <tbody>
                    {summary.budgets.map((budget) => (
                        <tr key={budget.id}>
                            <td>{budget.category}</td>
                            <td>KES {budget.limit}</td>
                            <td>{budget.month}</td>
                            <td>{budget.year}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2 style={{ marginTop: "40px"}}>
                Budget Performance
            </h2>
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
                    {(summary.budgetAnalysis || []).map((item) => (
                        <tr key={item.category}>
                            <td>{item.category}</td>
                            <td>KES {item.budget.toLocaleString()}</td>
                            <td>KES {item.spent.toLocaleString()}</td>
                            <td>KES {item.remaining.toLocaleString()}</td>
                            <td>
                                {item.status === "Within Budget" && "✅ Within Budget" }
                                {item.status === "Limit Reached" && "⚠️ Limit Reached"}
                                {item.status === "Over Budget" && "❌ Over Budget"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </DashboardLayout>
    );
  
}