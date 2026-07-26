import { Link } from "react-router-dom";
import {
    FaHome, FaMoneyBillWave, FaWallet, FaChartPie, FaFileInvoice, FaUser
} from "react-icons/fa";

export default function Sidebar({closeSidebar}) {
    return (
        <>
            <h2>Budget Tracker</h2>
            <Link to="/dashboard" onClick={closeSidebar}>
                <FaHome/> Dashboard
            </Link>

            <Link to="/income" onClick={closeSidebar}>
                <FaMoneyBillWave /> Income
            </Link>

            <Link to="/expenses" onClick={closeSidebar}>
                <FaWallet /> Expenses
            </Link>

            <Link to="/budgets" onClick={closeSidebar}>
                <FaChartPie /> Budgets
            </Link>

            <Link to="/reports" onClick={closeSidebar}>
                <FaFileInvoice /> Reports
            </Link>

            <Link to="/profile" onClick={closeSidebar}>
                <FaUser /> Profile
            </Link>

        </>
    );
}