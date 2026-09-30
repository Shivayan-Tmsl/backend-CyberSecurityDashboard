import {createAttack} from '../services/attackService.js';  

const sqlPatterns = [
    /(\bor\b|\band\b)\s+['"]?\w+['"]?\s*=\s*['"]?\w+['"]?/i,

    /union\s+(all\s+)?select/i,

    /select\s+.+\s+from/i,

    /insert\s+into/i,

    /delete\s+from/i,

    /drop\s+(table|database)/i,

    /update\s+\w+\s+set/i,

    /information_schema/i,

    /xp_cmdshell/i,

    /sleep\s*\(/i,

    /benchmark\s*\(/i,

    /waitfor\s+delay/i,

    /--/i,

    /\/\*[\s\S]*?\*\//i
];
export async function sqlDetector(event){
     console.log("🔥 SQL DETECTOR CALLED");
    const data = JSON.stringify({
        body: event.body,
        query: event.query,
        params: event.params

    }).toLowerCase();
    console.log("SQL DATA:", data);
    for(const pattern of sqlPatterns){
        if(pattern.test(data)){
            console.log(`SQL injection attack detected from IP: ${event.ip}`);
            await createAttack({
                websiteId: event.websiteId,
                ip: event.ip,
                type: 'SQL Injection',
                severity: 'high',
            });
            break;
        }

    }
}