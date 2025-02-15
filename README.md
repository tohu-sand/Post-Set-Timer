# Post-Set-Timer
A simple web-based timer application that starts immediately, allows setting a duration after starting.

## Features

- **Immediate Start:** The timer begins as soon as you click **Start Timer**.
- **Set Duration After Start:** Enter a desired duration (in seconds) after the timer has started.
- **Alarm Trigger:** The alarm sounds exactly when the elapsed time reaches the user-defined duration.
- **Reset Option:** Restart the timer at any moment with a single click of the **Reset Timer** button.

## Getting Started

### Live Demo

You can access the live version of this application here:  
👉 [Post-Set Timer on GitHub Pages](https://tohu-sand.github.io/Post-Set-Timer/)

### Prerequisites

- A modern web browser (e.g., Chrome, Firefox, Safari).

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/tohu-sand/Post-Set-Timer.git
   cd Post-Set-Timer
   ```

2. **Alarm Sound Implementation:**

   - This application uses Tone.js to generate an alarm sound via an oscillator.
   - To modify the alarm sound, update the oscillator configuration in `script.js`.

3. **Run the Application:**

   Open the `index.html` file directly in your browser.

4. **PWA Usage (Optional):**

   - This application includes a `manifest.json` file. On compatible browsers and devices, you can install the app as a PWA (Progressive Web App).
   - Simply use your browser’s **Add to Home Screen** or **Install** option when prompted.

## Usage

1. **Start the Timer:**  
   Click the **Start Timer** button to begin time measurement immediately.

2. **Set the Duration:**  
   Enter the desired duration (in seconds) in the provided input field and click **Set Duration**.  
   The display will update to show either the elapsed time (if no duration is set) or the remaining time until the alarm.

3. **Alarm Notification:**  
   When the set duration has elapsed, an alarm sound will play and a "Time's Up!" message will appear.

4. **Reset the Timer:**  
   Click the **Reset Timer** button to clear the current session and reset the application to its initial state.

## Project Structure

- `index.html`: Main HTML file that contains the application structure and links to the JavaScript and CSS files.
- `manifest.json`: Contains metadata for Progressive Web App features, enabling the app to be installable on supported devices.
- `script.js`: Contains the timer functionality and alarm sound generation using Tone.js.
- `style.css`: Provides the styling for the application.
- `README.md`: This documentation file.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
