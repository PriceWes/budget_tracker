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
        throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
        data: {
            fullName: data.fullName,
            email: data.email,
            password: hashedPassword,

            isVerified: false,
        },
    });

    return user;
};

export const loginUser = async (email, password) => {

    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (!user) {
        throw new Error("Invalid credentials");
    }

    const match = await bcrypt.compare(
        password,
        user.password
    );

    if (!match) {
        throw new Error("Invalid credentials");
    }

    if (!user.isVerified) {
        throw new Error(
            "Please verify your email before logging in."
        );
    }

    return {
        token: generateToken(user.id),
        user,
    };
};