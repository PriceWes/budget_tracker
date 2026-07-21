import express from "express";
import protect from "../middleware/authMiddleware.js";
import { addIncome, getIncome, editIncome, removeIncome, getIncomeTotal } from "../controllers/incomeController.js";

const router = express.Router();
router.use(protect);
router.post("/", addIncome);
router.get("/", getIncome);
router.get("/total", getIncomeTotal);
router.put("/:id", editIncome);
router.delete("/:id", removeIncome);

export default router;