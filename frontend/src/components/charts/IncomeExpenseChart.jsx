import {Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function IncomeExpenseChart({
    income,
    expense,
}) {
    const data = {
        labels :["Income", "Expense"],
        datasets: [
            {
                label: "KES",
                data: [income, expense],
            },
        ],
    };

    return (
        <Bar
            data={data}
            options={{
                responsive: true,
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            }}
        />
    );
}