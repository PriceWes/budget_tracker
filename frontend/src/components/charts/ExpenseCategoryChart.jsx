import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

export default function ExpenseCategoryChart ({ data}) {
    return (
        <Pie
            data={{
                labels: data.map(item => item.category),
                datasets: [
                    {
                        data: data.map(item => item.amount),
                    },
                ],
            }}
        />
    );
}