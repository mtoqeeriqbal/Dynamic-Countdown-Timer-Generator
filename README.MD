# Dynamic Countdown Timer Generator


This is a simple web application that allows users to generate custom countdown timer scripts based on their specified duration.

## Features

- Input field to specify the countdown length in hours.
- Generate script button to create the countdown timer script.
- Copy button to easily copy the generated script to the clipboard.
- Instructions on how to embed the generated script in HTML.

## Usage

1. Enter the desired countdown length in hours into the input field.
2. Click on the "Generate Script" button to generate the countdown timer script.
3. Use the "Copy" button to copy the generated script to the clipboard.
4. Paste the generated script into your HTML file where you want the countdown timer to appear.

## HTML Structure

Below is the recommended HTML structure to embed the generated countdown timer script:

```html
<div class="timer-wrapper">
    <h4 class="text-weight-bold">This replay will not be up forever!</h4>
    <div id="js-clock" class="countdown-container">
        <div class="countdown-item">
            <div class="countdown-value" id="js-clock-days">01</div>
            <div class="countdown-label">Days</div>
        </div>
        <div class="countdown-item">
            <div class="countdown-value" id="js-clock-hours">22</div>
            <div class="countdown-label">Hrs</div>
        </div>
        <div class="countdown-item">
            <div class="countdown-value" id="js-clock-minutes">58</div>
            <div class="countdown-label">Min</div>
        </div>
        <div class="countdown-item">
            <div class="countdown-value" id="js-clock-seconds">23</div>
            <div class="countdown-label">Sec</div>
        </div>
    </div>
</div>
```
## Explanation:

- js-clock: This is the main container for the countdown timer, which dynamically updates the countdown values.
- js-clock-days, js-clock-hours, js-clock-minutes, js-clock-seconds: These IDs represent the individual elements within the countdown timer. They are updated dynamically to display the remaining time in days, hours, minutes, and seconds.

Users should ensure to include the generated script within the .countdown-container element to display the countdown timer correctly on their webpage.

## Technologies Used
- HTML: Markup language for creating the structure of web pages.
- CSS: Stylesheet language used for styling HTML elements.
- JavaScript: Programming language used for adding interactivity and functionality to web pages.