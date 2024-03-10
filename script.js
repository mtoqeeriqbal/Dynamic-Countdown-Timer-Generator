// Function to copy script to the clipboard
function copyScript() {
    const generatedScriptElement = document.getElementById('generatedScript');
    navigator.clipboard.writeText(generatedScriptElement.textContent)
        .then(() => alert('Script copied to clipboard!'))
        .catch(err => console.error('Failed to copy: ', err));
}

// Function to generate countdown timer script
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
        // If not found, set a new deadline ${hours} hours from now
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
        var b = isoStr.split(new RegExp('\\\\D+'));
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

// Function to display the generated script and apply syntax highlighting
function displayScriptAndHighlight(hours) {
    const script = generateCountdownCode(hours);
    const scriptElement = document.getElementById('generatedScript');
    scriptElement.textContent = script; // Update the script text

    // Check if the script element has been previously highlighted
    if (scriptElement.dataset.highlighted) {
        // Remove the attribute to allow re-highlighting
        delete scriptElement.dataset.highlighted;
    }

    // Apply syntax highlighting
    hljs.highlightElement(scriptElement);
}

// Event listener for the form submission
document.getElementById('timerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const hours = document.getElementById('countdownLength').value;
    displayScriptAndHighlight(hours);
    const codeSnippet = document.getElementById('script-container');
    codeSnippet.style.display = 'block';
});

// Initialize syntax highlighting on page load
document.addEventListener('DOMContentLoaded', function() {
    hljs.highlightAll();
});
