import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportReportPDF = (summary) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Budget Tracker Report", 14, 20);

    doc.setFontSize(14);
    doc.text("Financial Summary", 14, 35);

    doc.setFontSize(12);

    doc.text(
        `Total Income: KES ${summary.totalIncome.toLocaleString()}`,
        14,
        45
    );

    doc.text(
        `Total Expense: KES ${summary.totalExpense.toLocaleString()}`,
        14,
        55
    );

    doc.text(
        `Balance: KES ${summary.balance.toLocaleString()}`,
        14,
        65
    );

    autoTable(doc, {
        startY: 80,
        head: [[
            "Category",
            "Budget",
            "Spent",
            "Remaining",
            "Status",
        ]],
        body: (summary.budgetAnalysis || []).map(item => [
            item.category,
            item.budget.toLocaleString(),
            item.spent.toLocaleString(),
            item.remaining.toLocaleString(),
            item.status,
        ]),
    });

    doc.save("Budget_Report.pdf");
};