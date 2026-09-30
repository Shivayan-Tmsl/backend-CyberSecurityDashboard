import { createAttack } from '../services/attackService.js';

const failedAttempts = {};
const attackDetected = {};

export async function sprayDetector(event) {

    if (event.endpoint !== '/api/login' || event.statusCode !== 401) {
        return;
    }

    const password = event.body?.password;
    const email = event.body?.email;

    if (!password || !email) {
        return;
    }

    const now = Date.now();

    if (!failedAttempts[password]) {
        failedAttempts[password] = [];
    }

    failedAttempts[password].push({
        email,
        timestamp: now
    });

    failedAttempts[password] = failedAttempts[password].filter(
        attempt => now - attempt.timestamp <= 5 * 60 * 1000
    );

    const uniqueEmails = new Set();

    failedAttempts[password].forEach(attempt => {
        uniqueEmails.add(attempt.email);
    });

    console.log(
        `Password "${password}" used against ${uniqueEmails.size} accounts`
    );

    if (uniqueEmails.size >= 5 && !attackDetected[password]) {

        attackDetected[password] = true;

        console.log(
            `Password spray attack detected for password: ${password}`
        );

        await createAttack({
            websiteId: event.websiteId,
            ip: event.ip,
            type: 'Password Spray',
            severity: 'high',
        });
    }
}