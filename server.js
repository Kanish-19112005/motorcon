// Add your Blynk Token here
const BLYNK_TOKEN = "YOUR_AUTH_TOKEN";

async function updatePhysicalMotor(speedValue) {
    // API URL to update Virtual Pin V1
    const url = `https://blynk.cloud/external/api/update?token=${BLYNK_TOKEN}&V1=${speedValue}`;
    try {
        await fetch(url);
    } catch (e) {
        console.error("Blynk Update Failed", e);
    }
}

// Inside your existing executeMove function, add this logic:
function executeMove(tIdx, nextIdx) {
    const t = trains[tIdx];
    t.targetIdx = nextIdx;
    t.status = 'MOVING';

    // IF TRAIN 1 (The real one), tell the motor to spin
    if (tIdx === 0) {
        let direction = (nextIdx > t.curIdx) ? 200 : -200; // 200 is PWM speed
        updatePhysicalMotor(direction);
    }

    // ... (Keep your existing animation code here) ...

    // When animation finishes (inside the pct >= 1 block):
    if (pct >= 1) {
        if (tIdx === 0) updatePhysicalMotor(0); // Stop physical motor
        // ... rest of your code
    }
}