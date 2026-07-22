import * as budgetService from "../services/budgetService.js";

export const addBudget = async (req, res) => {
    try {
        const budget = await budgetService.createBudget(
            req.user.id,
            req.body
        );
        res.status(201).json(budget);
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: error.message,
        });
    }
};

export const getBudgets = async (req, res) => {
    try {
        const budgets = await budgetService.getBudgets(req.user.id);
        res.json(budgets);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const editBudget = async (req, res) => {
    try {
        const budget = await budgetService.updateBudget(
            Number(req.params.id),
            req.user.id,
            req.body
        );
        res.json(budget);
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

export const removeBudget = async (req, res) => {
    try {
        await budgetService.deleteBudget(
            Number(req.params.id),
            req.user.id
        );
        res.json({
            message: "Budget deleted",
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};