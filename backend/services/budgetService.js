import prisma from "../config/prisma.js";

export const createBudget = async (userId, data) => {
    return await prisma.budget.create({
        data: {
            category: data.category,
            limit: Number(data.limit),
            month: Number(data.month),
            year: Number(data.year),
            userId,
        },
    });
};

export const getBudgets = async (userId) => {
    return await prisma.budget.findMany({
        where: {
            userId,
        },
        orderBy: [
            {year: "desc",},
            {
                month: "desc",
            },
        ],
    });
};

export const updateBudget = async (id, userId, data) => {
    const budget = await prisma.budget.findFirst({
        where: {
            id,
            userId,
        },
    });
    if (!budget) {
        throw new Error("Budget not found");
    }
    return await prisma.budget.update({
        where: {
            id,
        },
        data: {
            category: data.category,
            limit: Number(data.limit),
            month: Number(data.month),
            year: Number(data.year),
        },
    });
};

export const deleteBudget = async (id, userId) => {
    const budget = await prisma.budget.findFirst({
        where: {
            id,
            userId,
        },
    });

    if(!budget) {
        throw new Error("Budget not found");
    }
    return await prisma.budget.delete({
        where: {
            id,
        },
    });
};

export const getBudgetAnalysis = async (userId) => {
    const budgets = await prisma.budget.findMany({
        where: {
            userId,
        },
    });

    const analysis = [];
    for (const budget of budgets) {
        const expenses = await prisma.expense.findMany({
            where: {
                userId,
                category: budget.category,
            },
        });

        const spent = expenses.reduce(
            (sum, expense) => sum + expense.amount,
            0
        );
        analysis.push({
            id: budget.id,
            category: budget.category,
            month: budget.month,
            year: budget.year,
            limit: budget.limit,
            spent,
            remaining: budget.limit - spent,
        });
    }

    return analysis;
}