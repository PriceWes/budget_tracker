import DashboardLayout from "../components/DashboardLayout";
import DashboardCard from "../components/DashboardCard";

export default function Dashboard() {
    return (
        <DashboardLayout>
            <h1> Dashboard</h1>
            <div className="cards">
                <DashboardCard
                    title="Total Income"
                    value="KES 0"
                />

                <DashboardCard
                    title="Total Expenses"
                    value="KES 0"
                />

                <DashboardCard
                    title="Balance"
                    value="KES 0"
                />
            </div>
        </DashboardLayout>
    );
}