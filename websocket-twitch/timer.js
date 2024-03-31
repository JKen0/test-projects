// Map to store timers and their associated data
let timerId = 1;
const timers = new Map();

// Function to start a timer for a specific user
function startTimer(userId, minutes, callback) {
    const milliseconds = minutes * 60 * 1000; // Convert minutes to milliseconds

    const timer = setTimeout(() => {
        callback();
        timers.delete(timerId); // Remove the timer from the map when it expires
    }, milliseconds);

    // Store the timer and user ID in the map
    timers.set(timerId, { userId, timer });
    timerId += 1
}

module.exports = { startTimer };