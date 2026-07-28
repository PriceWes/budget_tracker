import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
    getProfile,
    updateProfile,
    changePassword,
    getStatistics,
} from "../controllers/profileController.js";
import { getStatistics } from "../services/profileService.js";

const router = express.Router();

router.use(protect);

router.get("/", getProfile);
router.put("/", updateProfile);
router.put("/password", changePassword);
router.get("/statistics", protect, getStatistics );

export default router;