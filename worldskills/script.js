// Set the target date (WorldSkills Competition 2024)
const targetDate = new Date('2024-09-10T00:00:00').getTime();

// Update the countdown every second
const countdown = setInterval(() => {
    // Get current date and time
    const now = new Date().getTime();
    
    // Calculate the time remaining
    const timeRemaining = targetDate - now;
    
    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    
    // Update the DOM elements
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    
    // If the countdown is finished
    if (timeRemaining < 0) {
        clearInterval(countdown);
        document.querySelector('.countdown-wrapper').innerHTML = '<h2>Competition has started!</h2>';
    }
}, 1000);

// 7-segment display patterns for digits 0-9
// [a, b, c, d, e, f, g]
const SEGMENT_PATTERNS = {
    '0': [1,1,1,1,1,1,0],
    '1': [0,1,1,0,0,0,0],
    '2': [1,1,0,1,1,0,1],
    '3': [1,1,1,1,0,0,1],
    '4': [0,1,1,0,0,1,1],
    '5': [1,0,1,1,0,1,1],
    '6': [1,0,1,1,1,1,1],
    '7': [1,1,1,0,0,0,0],
    '8': [1,1,1,1,1,1,1],
    '9': [1,1,1,1,0,1,1]
};

let countdownInterval = null;
let remainingTime = 0;

// Function to update the 7-segment display
function updateDisplay(time) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    const hoursStr = hours.toString().padStart(2, '0');
    const minutesStr = minutes.toString().padStart(2, '0');
    const secondsStr = seconds.toString().padStart(2, '0');
    updateDigit('hours-tens', hoursStr[0]);
    updateDigit('hours-ones', hoursStr[1]);
    updateDigit('minutes-tens', minutesStr[0]);
    updateDigit('minutes-ones', minutesStr[1]);
    updateDigit('seconds-tens', secondsStr[0]);
    updateDigit('seconds-ones', secondsStr[1]);
}

// Function to update a single digit
function updateDigit(elementId, digit) {
    const element = document.getElementById(elementId);
    const pattern = SEGMENT_PATTERNS[digit] || [0,0,0,0,0,0,0];
    const segNames = ['a','b','c','d','e','f','g'];
    element.innerHTML = '';
    for (let i = 0; i < 7; i++) {
        const seg = document.createElement('div');
        seg.className = `segment-segment seg-${segNames[i]}${pattern[i] ? ' active' : ''}`;
        element.appendChild(seg);
    }
}

// Function to start the countdown
function startCountdown(totalSeconds) {
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    remainingTime = totalSeconds;
    updateDisplay(remainingTime);
    countdownInterval = setInterval(() => {
        remainingTime--;
        if (remainingTime < 0) {
            clearInterval(countdownInterval);
            // Flash effect
            const display = document.querySelector('.segment-display');
            display.classList.add('flash');
            setTimeout(() => {
                display.classList.remove('flash');
            }, 24000); // 0.4s * 60 = 24s
            return;
        }
        updateDisplay(remainingTime);
    }, 1000);
}

// Event listener for the Set button
document.getElementById('setButton').addEventListener('click', () => {
    const timeInput = document.getElementById('timeInput').value;
    const [hours, minutes] = timeInput.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
        alert('Please enter a valid time in HH:MM format');
        return;
    }
    const totalSeconds = hours * 3600 + minutes * 60;
    startCountdown(totalSeconds);
});

// Input validation for time format
document.getElementById('timeInput').addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length > 2) {
        value = value.slice(0, 2) + ':' + value.slice(2);
    }
    e.target.value = value;
});

// Show 00:00:00 by default on page load
updateDisplay(0); 