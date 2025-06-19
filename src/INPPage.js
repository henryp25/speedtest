
import React, { useState } from 'react';

// INPPage component designed to demonstrate a poor Interaction to Next Paint (INP) score.
// This is achieved by performing a long-running synchronous task on a button click.
const INPPage = () => {
  const [clickCount, setClickCount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultMessage, setResultMessage] = useState('');

  // Function to simulate a blocking JavaScript task
  const simulateBlockingTask = (durationMs) => {
    const start = performance.now();
    while (performance.now() - start < durationMs) {
      // Busy-wait to simulate a long task
    }
  };

  const handleClick = () => {
    setIsProcessing(true);
    setResultMessage('Processing... Please wait.');

    // Simulate a long, blocking task on the main thread.
    // This will block the browser's main thread, preventing it from
    // updating the UI (like showing the 'Processing...' message or button state)
    // until the loop finishes.
    simulateBlockingTask(1000); // Simulate a 1-second blocking task

    // After the blocking task, update the UI.
    // The delay between the click and this visual update contributes to INP.
    setClickCount((prevCount) => prevCount + 1);
    setResultMessage(`Operation complete! Clicked ${clickCount + 1} times.`);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8 font-inter">
      <div className="bg-white p-6 md:p-10 rounded-xl shadow-lg w-full max-w-2xl text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-indigo-600 mb-6">
          Interaction to Next Paint (INP) Issue
        </h1>
        <p className="text-gray-700 mb-6 text-lg">
          This page intentionally demonstrates a poor INP. Clicking the button will trigger a long-running JavaScript task, causing a noticeable delay before the UI responds to your interaction.
        </p>

        <button
          onClick={handleClick}
          disabled={isProcessing}
          className={`
            px-8 py-4 text-xl font-bold rounded-xl shadow-md transition-all duration-300
            ${isProcessing
              ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white transform hover:scale-105 active:scale-95'
            }
            focus:outline-none focus:ring-4 focus:ring-indigo-300
          `}
        >
          {isProcessing ? 'Processing...' : 'Click Me to Cause INP!'}
        </button>

        <p className="mt-6 text-lg text-gray-800">
          Clicks: <span className="font-semibold text-indigo-700">{clickCount}</span>
        </p>

        {resultMessage && (
          <p className="mt-4 p-3 bg-indigo-100 text-indigo-800 rounded-lg font-medium">
            {resultMessage}
          </p>
        )}

        <p className="text-gray-600 mt-6 text-sm">
          To observe INP, open Developer Tools (F12), go to the "Performance" tab, record a session, and interact with the button. Look for long tasks (red triangles) or long input delays in the "Interactions" track.
        </p>
      </div>
    </div>
  );
};

export default INPPage;
