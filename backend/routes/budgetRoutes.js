import express from "express";
import protect from "../middleware/authMiddleware.js";
import { addBudget, getBudgets, editBudget, removeBudget, budgetAnalysis } from "../controllers/budgetController.js";

const router = express.Router();

router.use(protect);

router.post("/", addBudget);
router.get("/", getBudgets);
router.put("/:id", editBudget );
router.delete("/:id", removeBudget);
router.get("/analysis", budgetAnalysis);

export default router;