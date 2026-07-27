import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

import {
    registerUser,
    loginUser,
} from "../services/authService.js";

import { validatePassword } from "../utils/passwordValidator.js";


export const register = async (req, res) => {
    if (!validatePassword(req.body.password)) {
        return res.status(400).json({
            message:
                "Password must be at least 8 characters long and include uppercase, lowercase, number and special character.",
        });
    }

    try {
        const user = await registerUser(req.body);

        res.status(201).json({
            token: jwt.sign(
                { id: user.id},
                process.env.JWT_SECRET,
                { expiresIn: "7d"}
            ),
            user,
        });
    } catch (error) {
        res.status(400).json({
            mesage: error.message,
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

