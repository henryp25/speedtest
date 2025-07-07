// src/LCPPage.js
import React, { useEffect, useState } from 'react';

// LCPPage component designed to demonstrate common factors influencing Largest Contentful Paint (LCP) scores.
// This version sets up scenarios with neutral on-page text, encouraging the audience to
// discover the performance issues through auditing the code and network behavior.
const LCPPage = () => {
  const [showImageAfterJS, setShowImageAfterJS] = useState(false);
  const [initialContentReady, setInitialContentReady] = useState(false);

  useEffect(() => {
    // Simulate initial page content becoming ready
    const initialTimer = setTimeout(() => {
      setInitialContentReady(true);
    }, 500); // Main content appears after 0.5 seconds

    // This simulates a JavaScript-dependent image loading later.
    const jsLoadingTimer = setTimeout(() => {
      setShowImageAfterJS(true);
    }, 2000); // Image appears after 2 seconds (after initial content)

    return () => {
        clearTimeout(initialTimer);
        clearTimeout(jsLoadingTimer);
    };
  }, []);

  // Only show the main content once initialContentReady is true
  if (!initialContentReady) {
    return (
      <div style={{
        minHeight: '100vh', backgroundColor: '#f0f0f0', display: 'flex',
        alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: '#333'
      }}>
        Loading page...
        <style>
          {`
          @keyframes flash {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
          `}
        </style>
        <div style={{
          marginLeft: '20px', width: '20px', height: '20px', borderRadius: '50%',
          backgroundColor: '#dc2626', animation: 'flash 1s infinite'
        }}></div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '200vh', backgroundColor: '#f9fafb', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', boxSizing: 'border-box' }}>
      <div style={{
        backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '100%', maxWidth: '768px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '20px'
      }}>
        <h1 style={{ fontSize: '2.25rem', lineHeight: '2.5rem', fontWeight: 'bold', color: '#dc2626', marginBottom: '16px' }}>
          Page Load Investigation
        </h1>
        <p style={{ fontSize: '1.125rem', lineHeight: '1.75rem', color: '#4b5563', marginBottom: '24px' }}>
          Welcome to our page! See if you can find out why some things might be happening unexpectedly.
        </p>

        {/* --- */}
        {/* Issue 1: LCP Image that needs optimizing (remove lazy loading) */}
        <div style={{ backgroundColor: '#fee2e2', padding: '16px', borderRadius: '8px', marginBottom: '24px', borderLeft: '5px solid #ef4444' }}>
          <h2 style={{ fontSize: '1.5rem', lineHeight: '2rem', fontWeight: 'semibold', color: '#dc2626', marginBottom: '8px' }}>
            Issue 1: Main Visual
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: '1.5rem', color: '#4b5563', marginBottom: '12px' }}>
            This large image is a key part of our page's visual design.
          </p>
          <img
            src="https://picsum.photos/800/400?random=1" // Random image
            alt="A prominent page image"
            loading="lazy" // Intentional: Audience to find this
            style={{ width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', border: '4px solid #fca5a5', objectFit: 'cover' }}
          />
        </div>

        {/* --- */}
        {/* Issue 2: Image impacted by JS loading too late + bad image format */}
        <div style={{ backgroundColor: '#fffbe6', padding: '16px', borderRadius: '8px', marginBottom: '24px', borderLeft: '5px solid #f59e0b' }}>
          <h2 style={{ fontSize: '1.5rem', lineHeight: '2rem', fontWeight: 'semibold', color: '#b45309', marginBottom: '8px' }}>
            Issue 2: Feature Highlight
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: '1.5rem', color: '#4b5563', marginBottom: '12px' }}>
            This image highlights a key feature. Keep an eye on when it appears as you scroll.
          </p>
          {showImageAfterJS && (
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png" // Using a PNG, but for demo, audience should check format
              alt="Product feature image"
              style={{ width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', border: '4px solid #fcd34d', objectFit: 'cover' }}
            />
          )}
        </div>

        {/* --- */}
        {/* Issue 3: Images loading below the fold when they don't need to. */}
        <div style={{ backgroundColor: '#d1fae5', padding: '16px', borderRadius: '8px', marginBottom: '24px', borderLeft: '5px solid #10b981' }}>
          <h2 style={{ fontSize: '1.5rem', lineHeight: '2rem', fontWeight: 'semibold', color: '#067451', marginBottom: '8px' }}>
            Issue 3: Image Gallery
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: '1.5rem', color: '#4b5563', marginBottom: '12px' }}>
            Here are some more photos from our collection.
          </p>
          <img
            src="https://picsum.photos/600/300?random=2" // Random image
            alt="Gallery image 1"
            // No lazy loading or fetchpriority here
            style={{ width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', border: '4px solid #93c5fd', objectFit: 'cover', marginBottom: '15px' }}
          />
          <img
            src="https://picsum.photos/600/300?random=3" // Random image
            alt="Gallery image 2"
            // No lazy loading or fetchpriority here
            style={{ width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', border: '4px solid #93c5fd', objectFit: 'cover' }}
          />
        </div>

        <p style={{ fontSize: '0.875rem', lineHeight: '1.25rem', color: '#6b7280', marginTop: '24px' }}>
          **Your Challenge:**
          <br />
          Use your browser's Developer Tools (F12) to figure out what's happening.
          <br />
          1. Go to the **"Performance"** tab and record a page load. What do you notice about when elements appear?
          <br />
          2. Go to the **"Network"** tab (you might need to refresh the page after opening it). Pay attention to when different resources (like images) are requested, their sizes, and their priority levels.
          <br />
          Can you find the "secrets" affecting how fast this page loads?
        </p>
      </div>
    </div>
  );
};

export default LCPPage;