import * as expenseService from "../services/expenseService.js";

export const addExpense = async (req, res) => {
    try {
        const expense = await expenseService.createExpense(
            req.user.id,
            req.body
        );
        res.status(201).json(expense);
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

export const getExpenses = async (req, res) => {
    const expenses = await expenseService.getAllExpenses(req.user.id);
    res.json(expenses);
};

export const getExpenseTotal = async (req, res) => {
    const total = await expenseService.totalExpense(req.user.id);
    res.json({ total });
};

export const editExpense = async (req, res) => {
    try{
        const expense = await expenseService.updateExpense(
            Number(req.params.id),
            req.user.id,
            req.body
        );
        res.json(expense);
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

export const removeExpense = async (req, res) => {
    try {
        await expenseService.deleteExpense(
            Number(req.params.id),
            req.user.id
        );
        res.json({
            message: "Expense deleted",
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};
