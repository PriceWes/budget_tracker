import { useEffect, useState } from "react";
import api from "../../services/api";

export default function StatisticsCard() {
    const [stats, setStats] = useState({
        income: 0,
        expense: 0,
        budgets: 0,
    });

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const res = await api.get("/users/statistics");
            setStats(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="statistics-card">
            <h2>Account Statistics</h2>
            <p>
                Income Records:
                <strong>{stats.income}</strong>
            </p>

            <p>
                Expense Records:
                <strong>{stats.expense}</strong>
            </p>

            <p>
                Budgets:
                <strong>{stats.budgets}</strong>
            </p>
        </div>
    );
}