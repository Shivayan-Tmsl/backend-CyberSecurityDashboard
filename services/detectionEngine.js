import {bruteForceDetector} from '../detectors/BruteForceDetector.js';
import {honeypotDetector} from '../detectors/HoneypotDetector.js';
import {sprayDetector} from '../detectors/SprayDetector.js';
import {xssDetector} from '../detectors/XSSDetector.js';
import {sqlDetector} from '../detectors/SQLDetector.js';


export async function detectEvent(event) {

    
    await bruteForceDetector(event);

    
    await honeypotDetector(event);

    
    await sprayDetector(event);

    
    await xssDetector(event);

    
    await sqlDetector(event);

    
}