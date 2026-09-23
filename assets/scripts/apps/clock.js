const clockIcon = document.getElementById('clock');
const clockApp = document.getElementById('clock_app');
const clockDragzone = document.getElementById('clock_dragzone');
const closeClock = document.getElementById('close_clock');

clockIcon.onclick = () => {
    clockApp.style.display = 'block';

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    clockDragzone.addEventListener('mousedown', (e) => {
        isDragging = true;

        offsetX = e.clientX - clockApp.offsetLeft;
        offsetY = e.clientY - clockApp.offsetTop;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        clockApp.style.left = `${e.clientX - offsetX}px`;
        clockApp.style.top = `${e.clientY - offsetY}px`;
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    closeClock.onclick = () => {
        clockApp.style.display = "none";
    };

    // Timer
    const timerTab = document.getElementById("timer_tab");
    const countdTab = document.getElementById("countdown_tab");

    const timerBox = document.getElementById("timer_box");
    const timer = document.getElementById('timer');
    const startBtn = document.getElementById('start_timer');
    let milliseconds = parseInt(timer.innerText.split(':')[2]);
    let seconds = parseInt(timer.innerText.split(':')[1]);
    let minutes = parseInt(timer.innerText.split(':')[0]);
    let isCounting = false;
    let intervalId = null;

    timerTab.addEventListener('click', () => {
        countdownBox.style.display = "none";
        timerBox.style.display = "flex";
        timerTab.classList.add('active_tab');
        countdTab.classList.remove('active_tab');
    });

    startBtn.onclick = () => {
        if (!isCounting) {
            startBtn.innerText = "[ pause ]";
            isCounting = true;

            intervalId = setInterval(() => {
                milliseconds++;
                if (milliseconds > 99) {
                    seconds += 1;
                    milliseconds = 0;
                    if (seconds > 59) {
                        minutes += 1;
                        seconds = 0;
                    }
                }

                const mStr = String(minutes).padStart(2, '0');
                const sStr = String(seconds).padStart(2, '0');
                const msStr = String(milliseconds).padStart(2, '0');
                timer.innerText = `${mStr}:${sStr}:${msStr}`;
                
            }, 10);
        }
        else {
            startBtn.innerText = "[ start ]";
            isCounting = false;
            clearInterval(intervalId);
        }
    }
    document.getElementById("reset_timer").onclick = () => {
        startBtn.innerText = "[ start ]";
        isCounting = false;
        clearInterval(intervalId);
        seconds = 0;
        minutes = 0;
        milliseconds = 0;
        timer.innerText = "00:00:00";
    }

    // Countdown

    const startCountdBtn = document.getElementById("start_countdown");
    const countdownBox = document.getElementById("countdown_box");
    const showCountdown = document.getElementById("countd_display");
    let isGoing = false;
    let countIntervalId = null;

    countdTab.addEventListener('click', () => {
        timerBox.style.display = "none"
        countdownBox.style.display = "flex";
        countdTab.classList.toggle('active_tab');
        timerTab.classList.remove('active_tab');
    });

    
    startCountdBtn.onclick = () => {
        if (!isGoing) {
            let hours = parseInt(document.getElementById('hour').value) || 0;
            let minutesCountd = parseInt(document.getElementById('min').value) || 0;
            let secondsCountd = parseInt(document.getElementById('sec').value) || 0;
            startCountdBtn.innerText = "[ pause ]";
            isGoing = true;
            const inputs = document.getElementsByClassName('countdown_input');
            Array.from(inputs).forEach(el => el.style.display = "none");
            showCountdown.style.display = "block";
            if (hours <= 0 && minutesCountd <= 0 && secondsCountd <= 0) {
                return;
            }
            countIntervalId = setInterval(() => {
                secondsCountd -= 1;
                if (secondsCountd < 0) {
                    minutesCountd--;
                    secondsCountd = 59;
                    if (minutesCountd < 0) {
                        hours--;
                        minutesCountd = 59;
                        if (hours <= 0) {
                            hours = 0;
                            minutesCountd = 0;
                            secondsCountd = 0;
                            clearInterval(countIntervalId);
                            isGoing = false;
                            startCountdBtn.innerText = "[ start ]";
                        }
                    }
                }
    
                const hStr = String(hours).padStart(2, '0');
                const mStr = String(minutesCountd).padStart(2, '0');
                const sStr = String(secondsCountd).padStart(2, '0');
    
                showCountdown.innerText = `${hStr}:${mStr}:${sStr}`;
            }, 1000);
        } else {
            startCountdBtn.innerText = "[ start ]";
            isGoing = false;
            clearInterval(countIntervalId);
        }
    }

    document.getElementById("restart_countdown").onclick = () => {
        clearInterval(countIntervalId);
        isGoing = false;
        startCountdBtn.innerText = "[ start ]";
        const inputs = document.getElementsByClassName('countdown_input');
        Array.from(inputs).forEach(el => el.style.display = "flex");
        showCountdown.style.display = "none";
        document.getElementById('hour').value = 0;
        document.getElementById('min').value = 0;
        document.getElementById('sec').value = 0;
    }
}