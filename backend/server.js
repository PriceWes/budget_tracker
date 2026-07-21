import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import incomeRoutes from "./routes/incomeRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Budget Tracker API is Running."
    });
});
app.use("/api/income", incomeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});