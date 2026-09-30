import {createAttack} from '../services/attackService.js'; 

const xssPatterns = [
    /<script\b[^>]*>/i,
    /<\/script>/i,
    /javascript\s*:/i,
    /onerror\s*=/i,
    /onload\s*=/i,
    /onclick\s*=/i,
    /onmouseover\s*=/i,
    /<iframe\b/i,
    /<img\b[^>]*onerror\s*=/i,
    /<svg\b[^>]*onload\s*=/i
];

export async function xssDetector(event){
    const data = JSON.stringify({
        body: event.body,
        query: event.query,
        params: event.params
    }).toLowerCase();

    for(const patterns of xssPatterns){
        if(patterns.test(data)){
            console.log(`XSS attack detected: ${patterns}`);
            await createAttack({
                websiteId: event.websiteId,
                ip: event.ip,
                type: 'XSS',
                severity: 'medium',
            });
        }
    }
}