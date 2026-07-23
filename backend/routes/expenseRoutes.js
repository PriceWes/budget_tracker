import express from "express";
import protect from "../middleware/authMiddleware.js";

import { addExpense, getExpenses, getExpenseTotal,editExpense, removeExpense, expenseCategories } from "../controllers/expenseController.js";

const router = express.Router();

router.use(protect);

router.post("/", addExpense);
router.get("/", getExpenses);
router.get("/total", getExpenseTotal);
router.get("/categories", expenseCategories);
router.put("/:id", editExpense);
router.delete("/:id", removeExpense);


export default router;