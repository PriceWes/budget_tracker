import prisma from "../config/prisma.js";

export const createIncome = async (userId, data) => {
    return await prisma.income.create({
        data: {
            source: data.source,
            amount: Number(data.amount), 
            description: data.description,
            userId,
        },
    });
};

export const getAllIncome = async (userId) => {
    return await prisma.income.findMany({
        where: {
            userId,
        },
        orderBy: {
            date: "desc",
        },
    });
};

export const updateIncome = async (id, userId, data) => {
    return await prisma.income.update({
        where: {
            id,
            userId,
        },
        data: {
            source: data.source,
            amount: Number(data.amount),
            description: data.description,
        },
    });
};

export const deleteIncome = async (id, userId) => {
    return await prisma.income.delete({
        where: {
            id,
            userId,
        },
    });
};

export const totalIncome = async(userId) => {
    const incomes = await prisma.income.findMany({
        where: {
            userId,
        },
    });

    return incomes.reduce((sum, income) => sum + income.amount, 0);
};