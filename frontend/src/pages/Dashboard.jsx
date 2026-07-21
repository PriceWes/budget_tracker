import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import DashboardCard from "../components/DashboardCard";
import api from "../services/api";

export default function Dashboard() {
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [balance, setBalance] = useState(0);

    const loadSummary = async () => {
        try {
            const incomeRes =await api.get("/income/total");
            const expensesRes = await api.get("/expenses/total");

            const income = incomeRes.data.total;
            const expenses = expensesRes.data.total;

            setTotalIncome(income);
            setTotalExpenses(expenses);
            setBalance(income - expenses);
        } catch (error) {
            console.error(error);
        }
    };

     useEffect(() => {
        loadSummary();
    }, []);

    return (
        <DashboardLayout>
            <h1> Dashboard</h1>
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
        </DashboardLayout>
    );
}