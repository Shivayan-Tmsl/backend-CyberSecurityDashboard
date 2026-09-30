import Attack from '../models/Attack.js';
import User from '../models/User.js';
import Alert from '../models/Alert.js';
import Website from '../models/Website.js';


export const totalAttacks = async (req, res) => {

    try {

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        // Get websites owned by this user
        const websites = await Website.find({
            userId: req.user.id
        });

        const websiteIds = websites.map(website => website._id);

        // Count only attacks belonging to user's websites
        const totalAttacks = await Attack.countDocuments({
            websiteId: { $in: websiteIds }
        });

        res.json(totalAttacks);

    } catch (error) {

        console.error('Error fetching total attacks:', error);

        res.status(500).json({
            message: 'Internal server error'
        });
    }
};


export const highSeverityAttacks = async (req, res) => {

    try {

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        const websites = await Website.find({
            userId: req.user.id
        });

        const websiteIds = websites.map(website => website._id);

        const highSeverityCount = await Attack.countDocuments({
            websiteId: { $in: websiteIds },
            severity: 'high'
        });

        res.json(highSeverityCount);

    } catch (error) {

        console.error('Error fetching high severity attacks:', error);

        res.status(500).json({
            message: 'Internal server error'
        });
    }
};


export const mediumSeverityAttacks = async (req, res) => {

    try {

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        const websites = await Website.find({
            userId: req.user.id
        });

        const websiteIds = websites.map(website => website._id);

        const mediumSeverityCount = await Attack.countDocuments({
            websiteId: { $in: websiteIds },
            severity: 'medium'
        });

        res.json(mediumSeverityCount);

    } catch (error) {

        console.error('Error fetching medium severity attacks:', error);

        res.status(500).json({
            message: 'Internal server error'
        });
    }
};


export const lowSeverityAttacks = async (req, res) => {

    try {

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        const websites = await Website.find({
            userId: req.user.id
        });

        const websiteIds = websites.map(website => website._id);

        const lowSeverityCount = await Attack.countDocuments({
            websiteId: { $in: websiteIds },
            severity: 'low'
        });

        res.json(lowSeverityCount);

    } catch (error) {

        console.error('Error fetching low severity attacks:', error);

        res.status(500).json({
            message: 'Internal server error'
        });
    }
};


export const last5Attacks = async (req, res) => {

    try {

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        const websites = await Website.find({
            userId: req.user.id
        });

        const websiteIds = websites.map(website => website._id);

        const attacks = await Attack.find({
            websiteId: { $in: websiteIds }
        })
        .sort({ timestamp: -1 })
        .limit(5);

        res.json(attacks);

    } catch (error) {

        console.error('Error fetching last 5 attacks:', error);

        res.status(500).json({
            message: 'Internal server error'
        });
    }
};


export const last5Alerts = async (req, res) => {

    try {

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        // Alert already contains userId
        const alerts = await Alert.find({
            userId: req.user.id
        })
        .sort({ createdAt: -1 })
        .limit(5);

        res.json(alerts);

    } catch (error) {

        console.error('Error fetching last 5 alerts:', error);

        res.status(500).json({
            message: 'Internal server error'
        });
    }
};