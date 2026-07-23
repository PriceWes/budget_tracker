import * as reportService from "../services/reportService.js";

export const getReportSummary = async (req, res) => {
    try {
        const { month, year} = req.query;

        const summary = await reportService.getReportSummary(
            req.user.id,
            month,
            year
        );
        res.json(summary);
    } catch (error) {
        
        res.status(500).json({
            message: error.message,
        });
    }
    
};