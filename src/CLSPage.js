// src/CLSPage.js
import React, { useEffect, useState } from 'react';

// CLSPage component designed to demonstrate Cumulative Layout Shift (CLS).
// This version sets up scenarios with neutral on-page text, encouraging the audience to
// discover the performance issues through auditing the code and visual observation.
const CLSPage = () => {
  const [showTopElement, setShowTopElement] = useState(false);
  const [showMiddleImage, setShowMiddleImage] = useState(false);
  const [showBottomBanner, setShowBottomBanner] = useState(false);

  useEffect(() => {
    // Issue 1: A top element appears late
    setTimeout(() => setShowTopElement(true), 1500); // Appears after 1.5 seconds

    // Issue 2: A middle image loads without explicit dimensions
    setTimeout(() => setShowMiddleImage(true), 3000); // Appears after 3 seconds

    // Issue 3: A bottom banner/pop-up appears late
    setTimeout(() => setShowBottomBanner(true), 4500); // Appears after 4.5 seconds

  }, []);

  const paragraphStyle = {
    fontSize: '1rem', lineHeight: '1.5rem', color: '#4b5563', marginBottom: '16px'
  };

  const sectionHeadingStyle = {
    fontSize: '1.5rem', lineHeight: '2rem', fontWeight: 'semibold', color: '#1d4ed8', marginBottom: '12px'
  };

  return (
    <div style={{ minHeight: '180vh', backgroundColor: '#f9fafb', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', boxSizing: 'border-box' }}>
      <div style={{
        backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '100%', maxWidth: '768px', textAlign: 'center', marginBottom: '40px', display: 'flex', flexDirection: 'column', gap: '24px'
      }}>
        <h1 style={{ fontSize: '2.25rem', lineHeight: '2.5rem', fontWeight: 'bold', color: '#ea580c', marginBottom: '16px' }}>
          Uncovering Page Movements
        </h1>
        <p style={{ fontSize: '1.125rem', lineHeight: '1.75rem', color: '#4b5563', marginBottom: '24px' }}>
          Something on this page might make content shift around unexpectedly. Your mission is to find out why these movements are happening!
        </p>

        {/* --- */}
        {/* Issue 1: Top element that appears late */}
        {showTopElement && (
          <div style={{
            backgroundColor: '#ffe4e6', padding: '16px', borderRadius: '8px', border: '2px solid #ef4444',
            animation: 'fadeInDown 0.5s ease-out'
          }}>
            <h2 style={{ fontSize: '1.5rem', lineHeight: '2rem', fontWeight: 'bold', color: '#dc2626', marginBottom: '8px' }}>
              Issue 1: Top Section
            </h2>
            <p style={{ fontSize: '1rem', lineHeight: '1.5rem', color: '#4b5563', marginBottom: '12px' }}>
              This section is designed to appear and provide important information.
            </p>
            <img
              src="https://picsum.photos/700/100?random=1" // Random ad-like image
              alt="Dynamic top element"
              style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
            />
          </div>
        )}

        <div style={{ backgroundColor: '#e0f2f7', padding: '16px', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)' }}>
          <h2 style={sectionHeadingStyle}>
            Main Text Area
          </h2>
          <p style={paragraphStyle}>
            This is the main body of our content. Keep an eye on how everything behaves around it.
          </p>
          <p style={paragraphStyle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>

        {/* --- */}
        {/* Issue 2: Image without explicit dimensions */}
        <div style={{ backgroundColor: '#fffbe6', padding: '16px', borderRadius: '8px', borderLeft: '5px solid #f59e0b' }}>
          <h2 style={{ fontSize: '1.5rem', lineHeight: '2rem', fontWeight: 'bold', color: '#b45309', marginBottom: '8px' }}>
            Issue 2: Visual Element
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: '1.5rem', color: '#4b5563', marginBottom: '12px' }}>
            There's an image that will appear below. Observe its behavior and what happens to the surrounding text.
          </p>
          {!showMiddleImage ? (
            <div style={{
              width: '100%', height: '180px', backgroundColor: '#e5e7eb', borderRadius: '8px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280', fontSize: '1rem'
            }}>
              <p>Preparing image...</p>
            </div>
          ) : (
            <img
              src="https://picsum.photos/600/300?random=2" // Random image
              alt="A dynamic image"
              style={{ width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', border: '4px solid #fdba74' }}
            />
          )}
        </div>

        <p style={paragraphStyle}>
          This text is positioned below the visual element.
        </p>
        <div style={{ backgroundColor: '#fce7f3', padding: '16px', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)' }}>
          <h2 style={sectionHeadingStyle}>
            Additional Content
          </h2>
          <p style={paragraphStyle}>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>

        {/* --- */}
        {/* Issue 3: Bottom banner/pop-up appears late */}
        <div style={{ backgroundColor: '#d1fae5', padding: '16px', borderRadius: '8px', borderLeft: '5px solid #10b981' }}>
          <h2 style={{ fontSize: '1.5rem', lineHeight: '2rem', fontWeight: 'bold', color: '#067451', marginBottom: '8px' }}>
            Issue 3: Bottom Information
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: '1.5rem', color: '#4b5563', marginBottom: '12px' }}>
            This section provides some important information at the bottom of the page. Scroll all the way down to see it.
          </p>
        </div>

        <div style={{ backgroundColor: '#f0f9ff', padding: '16px', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)' }}>
          <h2 style={sectionHeadingStyle}>
            Concluding Remarks
          </h2>
          <p style={paragraphStyle}>
            You've reached the very end of the content.
          </p>
          <p style={paragraphStyle}>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
          </p>
        </div>

        {/* The dynamic bottom banner, positioned at the very bottom */}
        {showBottomBanner && (
          <div style={{
            backgroundColor: '#dbeafe', padding: '16px', borderRadius: '8px', border: '2px solid #60a5fa',
            position: 'sticky', bottom: '0px', width: 'calc(100% - 40px)', maxWidth: '728px', margin: 'auto',
            animation: 'fadeInUp 0.5s ease-out', zIndex: 10
          }}>
            <h3 style={{ fontSize: '1.25rem', lineHeight: '1.75rem', fontWeight: 'bold', color: '#1e40af', marginBottom: '8px' }}>
              Important Notice
            </h3>
            <p style={{ fontSize: '0.875rem', lineHeight: '1.25rem', color: '#1e40af' }}>
              Thank you for visiting! We value your experience.
            </p>
            <button style={{
              marginTop: '10px', padding: '8px 16px', backgroundColor: '#3b82f6', color: 'white', border: 'none',
              borderRadius: '4px', cursor: 'pointer', fontSize: '0.9rem'
            }}>
              Dismiss
            </button>
          </div>
        )}

        <p style={{ fontSize: '0.875rem', lineHeight: '1.25rem', color: '#6b7280', marginTop: '24px' }}>
          **Your Challenge:**
          <br />
          Use your browser's Developer Tools (F12) to investigate.
          <br />
          1. Go to the **"Performance"** tab. Click the record button and then **refresh the page**. Make sure to **scroll down** during recording. Look for visual cues on the timeline.
          <br />
          2. Go to the **"Rendering"** tab (you might find it under "More tools" or the "3 dots" menu). Check the box for **"Layout Shift Regions"**. Now, refresh the page again. What do you see highlighted?
          <br />
          Can you identify what causes parts of the page to move around?
        </p>
      </div>
      {/* Define animations inline for demonstration */}
      <style>
        {`
        @keyframes fadeInDown {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        `}
      </style>
    </div>
  );
};

export default CLSPage;