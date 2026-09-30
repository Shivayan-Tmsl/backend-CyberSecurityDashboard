import Alert from '../models/Alert.js';
import User from '../models/User.js';



export const getAlerts = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const alerts = await Alert.find({
            userId: req.user.id
        }).sort({ createdAt: -1 });

        res.json(alerts);

    } catch (error) {
        console.error('Error fetching alerts:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
