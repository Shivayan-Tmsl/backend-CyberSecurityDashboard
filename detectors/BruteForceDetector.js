import { createAttack } from '../services/attackService.js';

const failedAttempts = {};
const attackDetected = {};

export async function bruteForceDetector(event) {

    if (event.endpoint !== '/api/login' || event.statusCode !== 401) {
        return;
    }

    const ip = event.ip;
    const now = Date.now();

    if (!failedAttempts[ip]) {
        failedAttempts[ip] = [];
    }

    failedAttempts[ip].push(now);

    failedAttempts[ip] = failedAttempts[ip].filter(
        time => now - time <= 5 * 60 * 1000
    );

    console.log(
        `Failed login attempts from ${ip}: ${failedAttempts[ip].length}`
    );
    if (failedAttempts[ip].length < 5) {
    attackDetected[ip] = false;
}

    if (failedAttempts[ip].length >= 5 && !attackDetected[ip]) {

        attackDetected[ip] = true;

        console.log(
            `Brute force attack detected from IP: ${ip}`
        );

        await createAttack({
            
            websiteId: event.websiteId,
            ip: ip,
            type: 'Brute Force',
            severity: 'medium',
        });
    }
}