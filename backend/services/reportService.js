import prisma from "../config/prisma.js";

export const getReportSummary = async (userId, month, year) => {
    const incomeWhere = {
        userId,
    };

    const expenseWhere = {
        userId,
    };

    if (month && year) {
        const start = new Date(year, month - 1, 1);
        const end = new Date(year, month, 1);

        incomeWhere.date = {
            gte: start,
            lt: end,
        };

        expenseWhere.date = {
            gte: start,
            lt: end,
        };
    }


    const incomes = await prisma.income.findMany({
        where: incomeWhere,
    });

    const expenses = await prisma.expense.findMany({
        where: expenseWhere,
    });

    const budgets = await prisma.budget.findMany({
        where: { 
            userId,
            ...(month && {month: Number(month)}),
            ...(year && {year: Number(year)}),
        },
    });

    const totalIncome = incomes.reduce(
        (sum, item) => sum + item.amount,
        0
    );

    const totalExpense = expenses.reduce(
        (sum, item) => + item.amount,
        0
    );

    const budgetAnalysis = budgets.map((budget) => {
        const spent = expenses
            .filter(expense => expense.category === budget.category)
            .reduce((sum, expense) => sum + expense.amount, 0);

            const remaining = budget.limit - spent;

            let status = "Within Budget";
            if (remaining < 0) {
                status = "Over Budget";
            } else if (remaining === 0) {
                status = "Limit Reached";
            }

            return {
                category: budget.category,
                budget: budget.limit,
                spent,
                remaining, status,
            };
    });

    return {
        totalIncome,
        totalExpense,
        balance: totalIncome - totalExpense,
        budgets,
        budgetAnalysis
    };
};