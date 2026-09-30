import {createAttack} from '../services/attackService.js';  

const honeypotRoutes = [
    "/admin-secret",
    "/phpmyadmin",
    "/wp-admin",
    "/.env",
    "/config",
    "/api/config",
    "/debug",
    "/admin",
    "/api/admin",
    "/backup",
    "/database",
    "/secret"
];

export async function honeypotDetector(event){
    if(!honeypotRoutes.includes(event.endpoint)){
        return;
    }
    console.log(`Honeypot attack detected from IP: ${event.ip} on endpoint: ${event.endpoint}`);
    await createAttack({
        websiteId: event.websiteId,
        ip: event.ip,
        type: 'Honeypot',
        severity: 'low',
    });
}