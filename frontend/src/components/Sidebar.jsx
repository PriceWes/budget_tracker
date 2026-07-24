import { Link } from "react-router-dom";
import {
    FaHome, FaMoneyBillWave, FaWallet, FaChartPie, FaFileInvoice, FaUser
} from "react-icons/fa";

export default function Sidebar() {
    return (
        <div className="sidebar">
            <h2>Budget Tracker</h2>
            <Link to="/income">
                <FaMoneyBillWave /> Income
            </Link>

            <Link to="/expenses">
                <FaWallet /> Expenses
            </Link>

            <Link to="/budgets">
                <FaChartPie /> Budgets
            </Link>

            <Link to="/reports">   
                <FaFileInvoice /> Reports
            </Link>

            <Link to="/profile">
                <FaUser /> Profile
            </Link>

            <Link to="/dashboard">
                 Dashboard
            </Link>
        </div>

    );
}