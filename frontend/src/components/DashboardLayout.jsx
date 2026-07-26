import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";


export default function DashboardLayout({children}) {
    const [sidebarOPen, setSidebarOPen] = useState(false);
    return (
        <div className="layout">
            <div
                className={`overlay ${sidebarOPen ? "show" : ""}`}
                onClick={() => setSidebarOPen(false)}
            ></div>

            <div className={`sidebar ${sidebarOPen ? "active" : ""}`}>
                <Sidebar closeSidebar={() => setSidebarOPen(false)} />
            </div>

            <div className="content">
                <Navbar
                    toggleSidebar={() => setSidebarOPen(!sidebarOPen)}
                />
                {children}
            </div>
        </div>
    );
}