import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import DashboardCard from "../components/DashboardCard";
import api from "../services/api";

export default function Dashboard() {
    const [totalIncome, setTotalIncome] = useState(0);

    const loadSummary = async () => {
        try {
            const res =await api.get("/income/total");
            setTotalIncome(res.data.total);
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
                    value="KES 0"
                />

                <DashboardCard
                    title="Balance"
                    value={`KES ${totalIncome}`}
                />
            </div>
        </DashboardLayout>
    );
}