import Attack from '../models/Attack.js';
import User from '../models/User.js';
import Website from '../models/Website.js';

const getUserWebsiteIds = async (userId) => {
    const websites = await Website.find({ userId }).select('_id');

    return websites.map(website => website._id);
};


export const getAttacks = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const websiteIds = await getUserWebsiteIds(req.user.id);

        const attacks = await Attack.find({
            websiteId: { $in: websiteIds }
        }).sort({ timestamp: -1 });

        res.json(attacks);

    } catch (error) {
        console.error('Error fetching attacks:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const getAttackTrend = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const websiteIds = await getUserWebsiteIds(req.user.id);

        const trend = await Attack.aggregate([
            {
                $match: {
                    websiteId: { $in: websiteIds },
                    timestamp: {
                        $gte: new Date(Date.now() - 24 * 60 * 60 * 1000)
                    }
                }
            },
            {
                $group: {
                    _id: {
                        year: {
                            $year: {
                                date: "$timestamp",
                                timezone: "Asia/Kolkata"
                            }
                        },
                        month: {
                            $month: {
                                date: "$timestamp",
                                timezone: "Asia/Kolkata"
                            }
                        },
                        day: {
                            $dayOfMonth: {
                                date: "$timestamp",
                                timezone: "Asia/Kolkata"
                            }
                        },
                        hour: {
                            $hour: {
                                date: "$timestamp",
                                timezone: "Asia/Kolkata"
                            }
                        }
                    },
                    attacks: {
                        $sum: 1
                    }
                }
            }
        ]);

        const formattedTrend = trend.map(item => ({
            time: `${String(item._id.hour).padStart(2, "0")}:00`,
            attacks: item.attacks
        }));

        res.status(200).json(formattedTrend);

    } catch (error) {
        console.error("Error fetching attack trend:", error);

        res.status(500).json({
            message: "Failed to fetch attack trend"
        });
    }
};


export const getSeverityTrend = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const websiteIds = await getUserWebsiteIds(req.user.id);

        const thirtyMinutesAgo =
            new Date(Date.now() - 30 * 60 * 1000);

        const trend = await Attack.aggregate([
            {
                $match: {
                    websiteId: { $in: websiteIds },
                    timestamp: {
                        $gte: thirtyMinutesAgo
                    }
                }
            },
            {
                $group: {
                    _id: {
                        time: {
                            $dateToString: {
                                format: "%H:%M",
                                date: "$timestamp",
                                timezone: "Asia/Kolkata"
                            }
                        }
                    },

                    high: {
                        $sum: {
                            $cond: [
                                { $eq: ["$severity", "high"] },
                                1,
                                0
                            ]
                        }
                    },

                    medium: {
                        $sum: {
                            $cond: [
                                { $eq: ["$severity", "medium"] },
                                1,
                                0
                            ]
                        }
                    },

                    low: {
                        $sum: {
                            $cond: [
                                { $eq: ["$severity", "low"] },
                                1,
                                0
                            ]
                        }
                    }
                }
            },
            {
                $sort: {
                    "_id.time": 1
                }
            }
        ]);

        const formattedTrend = trend.map(item => ({
            time: item._id.time,
            high: item.high,
            medium: item.medium,
            low: item.low
        }));

        console.log("Severity trend:", formattedTrend);

        res.status(200).json(formattedTrend);

    } catch (error) {
        console.error(
            "Error fetching severity trend:",
            error
        );

        res.status(500).json({
            message: "Failed to fetch severity trend"
        });
    }
};


export const getAttackTypeDistribution = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const websiteIds = await getUserWebsiteIds(req.user.id);

        const distribution = await Attack.aggregate([
            {
                $match: {
                    websiteId: { $in: websiteIds },
                    timestamp: {
                        $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                    }
                }
            },
            {
                $group: {
                    _id: "$type",
                    attacks: {
                        $sum: 1
                    }
                }
            },
            {
                $sort: {
                    attacks: -1
                }
            }
        ]);

        const formattedDistribution = distribution.map(item => ({
            attackType: item._id,
            attacks: item.attacks
        }));

        res.status(200).json(formattedDistribution);

    } catch (error) {
        console.error(
            "Error fetching attack type distribution:",
            error
        );

        res.status(500).json({
            message: "Failed to fetch attack type distribution"
        });
    }
};




