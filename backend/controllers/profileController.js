import * as profileService from "../services/profileService.js";

export const getProfile = async (req, res) => {
    try {
        const profile =
            await profileService.getProfile(req.user.id);

        res.json(profile);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const profile =
            await profileService.updateProfile(
                req.user.id,
                req.body
            );

            res.json(profile);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const changePassword = async (req, res) => {
    try {
        await profileService.changePassword(
            req.user.id,
            req.body.currentPassword,
            req.body.newPassword
        );
        res.json({
            message: "Password updated successfully",
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

export const getStatistics = async (req, res) => {
    try {
        const stats = await profileService.getStatistics(req.user.id);
        res.json(stats);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};