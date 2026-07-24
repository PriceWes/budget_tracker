import {
    registerUser,
    loginUser
} from "../services/authService.js";
import { validatePassword } from "../utils/passwordValidator.js";

export const register = async (req, res) => {
    if (!validatePassword(req.body.password)){
        return res.status(400).json({
            message: 
                "Password must be at least 8 character and include uppercase, lowercase, number and special character "
        });
    }
    try {
        const result = await registerUser(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({
            message: error.message
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
            message: error.message
        });
    }
};