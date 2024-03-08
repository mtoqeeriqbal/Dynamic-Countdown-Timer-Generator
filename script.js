function copyScript() {
    var generatedScript = document.getElementById('generatedScript');
    generatedScript.select();
    document.execCommand('copy');
    alert('Script copied to clipboard!');
}


function generateCountdownCode(hours) {
    return `
    <script>

    (function () {
        // Unique storage key for each page
        function getDeadlineKey() {
            return 'deadline_${hours}';
        }
    
        // Attempt to retrieve the deadline from localStorage
        var deadline = localStorage.getItem(getDeadlineKey());
        if (!deadline) {
            // If not found, set a new deadline 48 hours from now
            var currentTime = new Date();
            var deadlineTime = new Date(currentTime.getTime() + ${hours} * 60 * 60 * 1000);
            deadline = deadlineTime.toISOString();
            localStorage.setItem(getDeadlineKey(), deadline);
        }
    
        function pad(num, size) {
            var s = "0" + num;
            return s.substr(s.length - size);
        }
    
        function parseDate(isoStr) {
            var b = isoStr.split(/\\D+/);
            return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
        }
    
        function getTimeRemaining(endtime) {
            var total = parseDate(endtime) - new Date();
            var seconds = Math.floor((total / 1000) % 60);
            var minutes = Math.floor((total / 1000 / 60) % 60);
            var hours = Math.floor((total / (1000 * 60 * 60)) % 24);
            var days = Math.floor(total / (1000 * 60 * 60 * 24));
            return { total, days, hours, minutes, seconds };
        }
    
        function clock(id, endtime) {
            var daysSpan = document.getElementById(id + '-days');
            var hoursSpan = document.getElementById(id + '-hours');
            var minutesSpan = document.getElementById(id + '-minutes');
            var secondsSpan = document.getElementById(id + '-seconds');
    
            function updateClock() {
                var t = getTimeRemaining(endtime);
    
                if (t.total <= 0) {
                    clearInterval(timeinterval);
                    // Optionally handle the countdown completion here
                } else {
                    daysSpan.innerHTML = pad(t.days, 2);
                    hoursSpan.innerHTML = pad(t.hours, 2);
                    minutesSpan.innerHTML = pad(t.minutes, 2);
                    secondsSpan.innerHTML = pad(t.seconds, 2);
                }
            }
    
            updateClock(); // Run once at first to avoid delay
            var timeinterval = setInterval(updateClock, 1000);
        }
    
        clock('js-clock', deadline);
    })();
    </script>`;
}

document.getElementById('timerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const hours = document.getElementById('countdownLength').value;
    const generatedScript = generateCountdownCode(hours);
    document.getElementById('generatedScript').value = generatedScript;
});
