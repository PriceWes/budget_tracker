import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

import {
    registerUser,
    loginUser,
} from "../services/authService.js";

import { validatePassword } from "../utils/passwordValidator.js";
import sendEmail from "../utils/sendEmail.js";

export const register = async (req, res) => {

    if (!validatePassword(req.body.password)) {
        return res.status(400).json({
            message:
                "Password must be at least 8 characters long and include uppercase, lowercase, number and special character.",
        });
    }

    try {

        // Create user
        const user = await registerUser(req.body);

        // Generate verification token
        const verificationToken = jwt.sign(
            { email: user.email },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        // Save token
        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                verificationToken,
            },
        });

        // Verification link
        const verificationLink =
            `${process.env.CLIENT_URL}/verify/${verificationToken}`;

        // Send email
        await sendEmail(
            user.email,
            "Verify your Budget Tracker Account",
            `
            <h2>Welcome to Budget Tracker</h2>

            <p>
                Thank you for registering.
            </p>

            <p>
                Click the button below to verify your email.
            </p>

            <a
                href="${verificationLink}"
                style="
                    display:inline-block;
                    padding:12px 20px;
                    background:#2563eb;
                    color:white;
                    text-decoration:none;
                    border-radius:5px;
                "
            >
                Verify Email
            </a>

            <p>This link expires in 24 hours.</p>
            `
        );

        res.status(201).json({
            message:
                "Registration successful. Please check your email to verify your account.",
        });

    } catch (error) {
        res.status(400).json({
            message: error.message,
        });

    }
};

export const login = async (req, res) => {

    try {

        const result = await loginUser(
            req.body.email,
            req.body.password
        );

        res.json(result);

    } catch (error) {

        res.status(401).json({
            message: error.message,
        });

    }
};

export const verifyEmail = async (req, res) => {

    try {

        const decoded = jwt.verify(
            req.params.token,
            process.env.JWT_SECRET
        );

        const user = await prisma.user.findUnique({
            where: {
                email: decoded.email,
            },
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                isVerified: true,
                verificationToken: null,
            },
        });

        res.redirect(`${process.env.CLIENT_URL}/login`);

    } catch (error) {

        res.status(400).json({
            message: "Invalid or expired verification link.",
        });

    }

};