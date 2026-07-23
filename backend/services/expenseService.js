import prisma from "../config/prisma.js";

export const createExpense = async (userId, data) => {
    return await prisma.expense.create({
        data: {
            category: data.category,
            amount: Number(data.amount),
            description: data.description,
            userId,
        },
    });
};

export const getAllExpenses = async (
    userId,
    search,
    category,
    startDate,
    endDate,
    sort
) => {
    const where = {
        userId,
    };

    if (search) {
        where.OR = [
            {category: {
                contains: search,
                mode: "insensitive",
            },
        },{
            description: {
                contains: search,
                mode: "insensitive",
            },
        },
        ];
    }

    if (category) {
        where.category = category;
    }
    if (startDate && endDate) {
        where.date = {
            gte: new Date(startDate),
            lte: new Date(endDate),
        };
    }

    let orderBy = {
        date: "desc",
    };

    if (sort === "oldest") {
        orderBy = {
            date: "asc",
        };
    }

    if (sort === "highest") {
        orderBy = {
            amount: "desc",
        };
    }

    if (sort === "lowest") {
        orderBy = {
            amount: "asc",
        };
    }

    return prisma.expense.findMany({
        where,
        orderBy,
    });
};

export const updateExpense = async (id, userId, data) => {
    const expense = await prisma.expense.findFirst({
        where: {
            id,
            userId,
        },
    });
    if (!expense) {
        throw new Error("Expense not Not Found.");
    }

    return await prisma.expense.update({
        where: {
            id,
        },
        data: {
            category: data.category,
            amount: Number(data.amount),
            description: data.description,
        },
    });
};

export const deleteExpense = async (id, userId) => {
    const expense = await prisma.expense.findFirst({
        where: {
            id,
            userId,
        },
    });
    if (!expense) {
        throw new Error("Expense not found.");
    }

    return await prisma.expense.delete({
        where: {
            id,
        },
    });
};

export const totalExpense = async (userId) => {
    const expenses = await prisma.expense.findMany({
        where: {
            userId,
        },
    });

    return expenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
    );
};

export const expenseByCategory = async (userId) => {
    const expenses = await prisma.expense.findMany({
        where: {
            userId,
        },
    });
    const grouped = {};

    expenses.forEach((expense) => {
        grouped[expense.category] =
            (grouped[expense.category] || 0) + expense.amount;
    });

    return Object.entries(grouped).map(([category, amount]) => ({
        category,
        amount,
    }));
};