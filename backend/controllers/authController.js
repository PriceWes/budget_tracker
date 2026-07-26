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
            message: "Password must be at least 8 characters long and include uppercase, lowercase, number and special character.",
        });
    }

    req.body.email = req.body.email.toLowerCase().trim();

    try {

        const user = await registerUser(req.body);

        const verificationToken = jwt.sign(
            {
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                verificationToken,
            },
        });

        const verificationLink =
            `${process.env.CLIENT_URL}/verify/${verificationToken}`;

        console.log(`Sending verification email to ${user.email}`);

        await sendEmail(
            user.email,
            "Verify your Budget Tracker Account",
            `
            <h2>Welcome to Budget Tracker</h2>

            <p>Thank you for registering.</p>

            <p>Please click the button below to verify your account.</p>

            <a
                href="${verificationLink}"
                style="
                    display:inline-block;
                    padding:12px 20px;
                    background:#2563eb;
                    color:#ffffff;
                    text-decoration:none;
                    border-radius:6px;
                    font-weight:bold;
                "
            >
                Verify Email
            </a>

            <p>This link expires in 24 hours.</p>
            `
        );

        console.log("Verification email sent successfully.");

        res.status(201).json({
            message: "Registration successful. Please check your email to verify your account.",
        });

    } catch (error) {

        console.error("Registration Error:", error);

        res.status(500).json({
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

        res.status(200).json(result);

    } catch (error) {

        console.error("Login Error:", error);

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
                message: "User not found.",
            });
        }

        if (user.isVerified) {
            return res.redirect(`${process.env.CLIENT_URL}/login`);
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

        console.log(`${user.email} has verified their account.`);

        res.redirect(`${process.env.CLIENT_URL}/login`);

    } catch (error) {

        console.error("Verification Error:", error);

        res.status(400).json({
            message: "Invalid or expired verification link.",
        });

    }

};