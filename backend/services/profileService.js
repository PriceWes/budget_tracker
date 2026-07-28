import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";

export const getProfile = async(userId) => {
    return await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
            currency: true,
            profileImage: true,
        },
    });
};

export const updateProfile = async (userId, data) => {
    return await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            fullName: data.fullName,
            phone: data.phone,
            currency: data.currency,
        },
    });
};

export const changePassword = async(
    userId,
    currentPassword,
    newPassword
) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });

    const valid = await bcrypt.compare(
        currentPassword,
        user.password
    );
    if(!valid){
        throw new Error("Current password is incorrect");
    }

    const hashed = await bcrypt.hash(
        newPassword,
        10
    );

    await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            password: hashed,
        },
    });
};

export const getStatistics = async (userId) => {
    const income = await prisma.income.count({
        where: { userId },
    });

    const expense = await prisma.expense.count({
        where: { userId },
    });

    const budgets = await prisma.budget.count({
        where: { userId },
    });

    return {
        income,
        expense,
        budgets,
    };
};