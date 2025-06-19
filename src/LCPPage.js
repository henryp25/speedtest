// src/LCPPage.js
import React, { useEffect, useState } from 'react';

// LCPPage component designed to demonstrate a poor Largest Contentful Paint (LCP) score.
// This is achieved by delaying the loading of a large, critical image element.
// All styling is now inline for mobile friendliness and no Tailwind.
const LCPPage = () => {
  const [showImage, setShowImage] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Simulate a delayed load for a critical image.
    const imageTimer = setTimeout(() => {
      setShowImage(true);
    }, 2000); // Delay image by 2 seconds

    // Simulate a delayed load for critical text content.
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 1000); // Delay content by 1 second

    // Clean up timers on component unmount
    return () => {
      clearTimeout(imageTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', boxSizing: 'border-box' }}>
      <div style={{
        backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '100%', maxWidth: '768px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '20px'
      }}>
        <h1 style={{ fontSize: '2.25rem', lineHeight: '2.5rem', fontWeight: 'bold', color: '#dc2626', marginBottom: '16px' }}>
          Largest Contentful Paint (LCP) Issue
        </h1>
        <p style={{ fontSize: '1.125rem', lineHeight: '1.75rem', color: '#4b5563', marginBottom: '24px' }}>
          This page intentionally demonstrates a poor LCP. The main content (a large image and text) is delayed, causing a slower render of the largest element in the viewport.
        </p>

        {showContent && (
          <div style={{ backgroundColor: '#fffbe6', padding: '16px', borderRadius: '8px', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.5rem', lineHeight: '2rem', fontWeight: 'semibold', color: '#b45309', marginBottom: '8px' }}>
              Delayed Critical Content
            </h2>
            <p style={{ fontSize: '1rem', lineHeight: '1.5rem', color: '#4b5563' }}>
              This significant block of text appears late, potentially impacting LCP if it's the largest element visible when it renders.
            </p>
          </div>
        )}

        {showImage ? (
          <img
            src="https://placehold.co/800x400/FF0000/FFFFFF?text=Large+Image+Delayed+LCP"
            alt="Delayed Large Contentful Paint Example"
            style={{ width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', border: '4px solid #fca5a5', transition: 'transform 0.5s ease', objectFit: 'cover' }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
        ) : (
          <div style={{
            width: '100%', height: '200px', backgroundColor: '#e5e7eb', borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280', fontSize: '1.25rem',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
          }}>
            Loading large image...
            {/* Define pulse animation inline for demonstration */}
            <style>
              {`
              @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: .5; }
              }
              `}
            </style>
          </div>
        )}

        <p style={{ fontSize: '0.875rem', lineHeight: '1.25rem', color: '#6b7280', marginTop: '24px' }}>
          To observe the LCP issue, open your browser's Developer Tools (F12), go to the "Performance" tab, and record a page load. Look for the LCP marker on the timeline.
        </p>
      </div>
    </div>
  );
};

export default LCPPage;
