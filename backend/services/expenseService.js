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

export const getAllExpenses = async (userId) => {
    return await prisma.expense.findMany({
        where: {
            userId,
        },
        orderBy: {
            date: "desc",
        },
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