import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (data) => {

    const exists = await prisma.user.findUnique({
        where: {
            email: data.email,
        },
    });

    if (exists) {
        throw new Error("An account with this email already exists.");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
        data: {
            fullName: data.fullName,
            email: data.email.toLowerCase().trim(),
            password: hashedPassword,
            isVerified: false,
        },
    });

    return user;
};

export const loginUser = async (email, password) => {

    const user = await prisma.user.findUnique({
        where: {
            email: email.toLowerCase().trim(),
        },
    });

    if (!user) {
        throw new Error("Invalid email or password.");
    }

    const match = await bcrypt.compare(
        password,
        user.password
    );

    if (!match) {
        throw new Error("Invalid email or password.");
    }

    if (!user.isVerified) {
        throw new Error(
            "Please verify your email before logging in."
        );
    }

    return {
        token: generateToken(user.id),
        user: {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            isVerified: user.isVerified,
            createdAt: user.createdAt,
        },
    };
};