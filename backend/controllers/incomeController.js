import * as incomeService from "../services/incomeService.js";

export const addIncome = async (req, res) => {
    try {
        const income = await incomeService.createIncome(
            req.user.id,
            req.body
        );
        res.status(201).json(income);
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

export const getIncome = async (req, res) => {
    const income = await incomeService.getAllIncome(req.user.id);
    res.json(income);
};

export const getIncomeTotal = async (req, res) => {
    const total = await incomeService.totalIncome(req.user.id);
    res.json({
        total,
    });
};

export const editIncome = async (req, res) => {
    try {
        const income = await incomeService.updateIncome(
            Number(req.params.id),
            req.user.id,
            req.body
        );

        res.json(income);
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

export const removeIncome = async (req, res) => {
    try {
        await incomeService.deleteIncome(
            Number(req.params.id),
            req.user.id
        );

        res.json({
            message: "Income deleted",
        });

    } catch (error) {

        res.status(400).json({
            message: error.message,
        });
    }
};