// src/INPPage.js
import React, { useState } from 'react';

// INPPage component designed to demonstrate factors influencing Interaction to Next Paint (INP).
// This is achieved by performing a long-running synchronous task on a button click,
// causing a delay in visual feedback after interaction.
const INPPage = () => {
  const [clickCount, setClickCount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultMessage, setResultMessage] = useState('');

  // Function to simulate a blocking JavaScript task
  const simulateBlockingTask = (durationMs) => {
    const start = performance.now();
    while (performance.now() - start < durationMs) {
      // This busy-wait loop consumes CPU time on the main thread,
      // preventing the browser from rendering updates or processing other events.
    }
  };

  const handleClick = () => {
    // We update the state to show "Processing..." *before* the blocking task.
    // However, due to the synchronous blocking, the UI might not visibly update
    // until *after* the blocking task completes, leading to perceived delay.
    setIsProcessing(true);
    setResultMessage('Initiating process...');

    // Scenario: Long-running synchronous JavaScript task
    // This simulates heavy computation, complex DOM manipulations, or large data processing
    // happening directly on the main thread after an interaction.
    simulateBlockingTask(1000); // Simulates a 1-second blocking operation

    // These updates will only become visible after the main thread is unblocked.
    setClickCount((prevCount) => prevCount + 1);
    setResultMessage(`Operation finished! Button clicked ${clickCount + 1} times.`);
    setIsProcessing(false);
  };

  // Inline styles for consistency
  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#f9fafb', // Light gray background
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    fontFamily: 'sans-serif' // Generic sans-serif for 'Inter'
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    padding: '2.5rem', // p-10
    borderRadius: '0.75rem', // rounded-xl
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', // shadow-lg
    width: '100%',
    maxWidth: '42rem', // max-w-2xl
    textAlign: 'center',
  };

  const headingStyle = {
    fontSize: '2.25rem', // text-4xl
    lineHeight: '2.5rem',
    fontWeight: 'bold',
    color: '#4f46e5', // indigo-600
    marginBottom: '1.5rem',
  };

  const paragraphStyle = {
    color: '#4b5563', // gray-700
    marginBottom: '1.5rem',
    fontSize: '1.125rem', // text-lg
  };

  const buttonBaseStyle = {
    paddingLeft: '2rem',
    paddingRight: '2rem',
    paddingTop: '1rem',
    paddingBottom: '1rem',
    fontSize: '1.25rem', // text-xl
    fontWeight: 'bold',
    borderRadius: '0.75rem', // rounded-xl
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // shadow-md
    transition: 'all 0.3s ease', // transition-all duration-300
    border: 'none',
    cursor: 'pointer',
  };

  const buttonActiveStyle = {
    backgroundColor: '#a0a0a0', // gray-400
    color: '#4b5563', // gray-700
    cursor: 'not-allowed',
  };

  const buttonInactiveStyle = {
    backgroundColor: '#4f46e5', // indigo-600
    color: '#ffffff',
  };

  const messageStyle = {
    marginTop: '1rem',
    padding: '0.75rem',
    backgroundColor: '#e0e7ff', // indigo-100
    color: '#3730a3', // indigo-800
    borderRadius: '0.5rem',
    fontWeight: '500',
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={headingStyle}>
          Exploring Interaction to Next Paint (INP)
        </h1>
        <p style={paragraphStyle}>
          This page demonstrates factors that can influence how quickly a web page visually responds to your interactions. Click the button below and observe the delay between your click and the visual feedback on the screen.
        </p>

        <button
          onClick={handleClick}
          disabled={isProcessing}
          style={{
            ...buttonBaseStyle,
            ...(isProcessing ? buttonActiveStyle : buttonInactiveStyle),
            // Hover/active effects (CSS pseudo-classes) are harder with inline styles
            // but can be added with JavaScript event listeners if strictly necessary.
            // For this demo, the disabled state visually highlights the blocking.
          }}
          onMouseOver={(e) => {
            if (!isProcessing) {
              e.currentTarget.style.backgroundColor = '#4338ca'; // indigo-700
              e.currentTarget.style.transform = 'scale(1.05)';
            }
          }}
          onMouseOut={(e) => {
            if (!isProcessing) {
              e.currentTarget.style.backgroundColor = '#4f46e5'; // indigo-600
              e.currentTarget.style.transform = 'scale(1)';
            }
          }}
          onMouseDown={(e) => {
            if (!isProcessing) {
              e.currentTarget.style.transform = 'scale(0.95)';
            }
          }}
          onMouseUp={(e) => {
            if (!isProcessing) {
              e.currentTarget.style.transform = 'scale(1.05)'; // goes back to hover state
            }
          }}
        >
          {isProcessing ? 'Processing...' : 'Click Me to Test Responsiveness!'}
        </button>

        <p style={{ marginTop: '1.5rem', fontSize: '1.125rem', color: '#1f2937' }}>
          Total Clicks: <span style={{ fontWeight: '600', color: '#3730a3' }}>{clickCount}</span>
        </p>

        {resultMessage && (
          <p style={messageStyle}>
            {resultMessage}
          </p>
        )}

        <p style={{ color: '#4b5563', marginTop: '1.5rem', fontSize: '0.875rem' }}>
          **How to Test:** Use your browser's Developer Tools (F12).
          <br />
          1. Go to the **"Performance"** tab and **record a session**.
          <br />
          2. While recording, **click the button multiple times**.
          <br />
          3. After stopping the recording, examine the timeline. Look specifically at the **"Main" thread** for long tasks (often marked with **red triangles** or long blocks of activity). Also, check the **"Interactions"** track (if available) to see the delay between your input and the visual update.
          <br />
          Consider how long the main thread is blocked and how this impacts the responsiveness you feel after clicking.
        </p>
      </div>
    </div>
  );
};

export default INPPage;