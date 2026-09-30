import Attack from '../models/Attack.js';
import Alert from '../models/Alert.js';
import { getIO } from '../socket/socket.js';
import Website from '../models/Website.js';

export const createAttack = async (attackData) => {

    try {

        const website = await Website.findById(attackData.websiteId);

        if (!website) {
            throw new Error("Website not found");
        }

        const attack = await Attack.create(attackData);

        const io = getIO();

        // Send attack only to the owner of the website
        io.to(`user_${website.userId}`).emit("newAttack", attack);

        if (attack.severity === 'high') {

            const alertData = await Alert.create({
                attackId: attack._id,
                title: `${attack.severity} severity attack detected: ${attack.type}`,
                message: `A ${attack.severity} severity attack of type ${attack.type} was detected from IP: ${attack.ip}.`,
                severity: attack.severity,
                userId: website.userId // Assuming you have access to the user ID here
            });

            // Send alert only to the website owner
            io.to(`user_${website.userId}`).emit("newAlert", alertData);
        }

    } catch (error) {

        console.error('Error creating attack:', error);

    }

};

