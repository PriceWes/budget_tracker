import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
    getProfile,
    updateProfile,
    changePassword,
} from "../controllers/profileController.js";

const router = express.Router();

router.use(protect);

router.get("/", getProfile);
router.put("/", updateProfile);
router.put("/password", changePassword);

export default router;