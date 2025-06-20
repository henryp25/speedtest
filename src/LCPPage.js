
import React, { useEffect, useState } from 'react';

// LCPPage component designed to demonstrate common causes of poor Largest Contentful Paint (LCP) scores.
// This version focuses on real-world scenarios without artificial setTimeout delays for assets.
// It highlights:
// 1. Lazy-loaded LCP image (incorrect implementation for critical content).
// 2. Misused fetchpriority="low" for a critical image (should be "high" for LCP), or correctly used for non-critical.
// 3. Render-blocking CSS/JavaScript (simulated by delaying the component's initial render).
const LCPPage = () => {
  // We'll use state to simulate content appearing after initial render due to JS processing
  // or a very quick, non-blocking data fetch if we wanted to visually show a "pop-in".
  // For true LCP effects without artificial delays, the presence of the elements
  // in the DOM and their loading attributes are key.
  const [showContentAndLazyImage, setShowContentAndLazyImage] = useState(false);

  // Simulate a render-blocking CSS/JavaScript resource.
  // In a real app, this effect would happen before React even renders,
  // but here we simulate its impact by delaying the entire component's initial render.
  const [renderBlocked, setRenderBlocked] = useState(true);

  useEffect(() => {
    // Simulate 0.5 seconds of render blocking due to heavy external resources (CSS/JS).
    // This delays the initial mount and paint of the entire LCPPage component's content.
    const blockingTimer = setTimeout(() => {
      setRenderBlocked(false);
      // Once render is unblocked, we can show other content if it's dependent on JS
      setShowContentAndLazyImage(true);
    }, 500);
    return () => clearTimeout(blockingTimer);
  }, []);

  if (renderBlocked) {
    return (
      <div style={{
        minHeight: '100vh', backgroundColor: '#f0f0f0', display: 'flex',
        alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: '#333'
      }}>
        Loading resources... (Simulating render-blocking CSS/JS)
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
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', boxSizing: 'border-box' }}>
      <div style={{
        backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '100%', maxWidth: '768px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '20px'
      }}>
        <h1 style={{ fontSize: '2.25rem', lineHeight: '2.5rem', fontWeight: 'bold', color: '#dc2626', marginBottom: '16px' }}>
          Understanding Slow Site Speed & LCP
        </h1>
        <p style={{ fontSize: '1.125rem', lineHeight: '1.75rem', color: '#4b5563', marginBottom: '24px' }}>
          This page intentionally demonstrates common performance bottlenecks that lead to a poor Largest Contentful Paint (LCP) and overall slow site speed.
        </p>

        {/* Use Case 1: LCP Image is Lazy Loaded (BAD PRACTICE) */}
        <div style={{ backgroundColor: '#fee2e2', padding: '16px', borderRadius: '8px', marginBottom: '24px', borderLeft: '5px solid #ef4444' }}>
          <h2 style={{ fontSize: '1.5rem', lineHeight: '2rem', fontWeight: 'semibold', color: '#dc2626', marginBottom: '8px' }}>
            🔴 Use Case 1: Critical LCP Image
          </h2>
          {/* This image will be the LCP candidate and is intentionally lazy-loaded incorrectly */}
          <img
            src="https://placehold.co/800x400/FF0000/FFFFFF?text=LCP+Image+Wrongly+Lazy-Loaded"
            alt="LCP Image wrongly lazy-loaded example"
            loading="lazy" // Simulating the incorrect lazy load for an LCP image
            style={{ width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', border: '4px solid #fca5a5', transition: 'transform 0.5s ease', objectFit: 'cover' }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
        </div>

        {/* Use Case 2: Heavy JavaScript Execution / Delayed Critical Content (due to processing/blocking) */}
        {showContentAndLazyImage && ( // This content now appears once render blocking is cleared
          <div style={{ backgroundColor: '#fffbe6', padding: '16px', borderRadius: '8px', marginBottom: '24px', borderLeft: '5px solid #f59e0b' }}>
            <h2 style={{ fontSize: '1.5rem', lineHeight: '2rem', fontWeight: 'semibold', color: '#b45309', marginBottom: '8px' }}>
              🟠 Use Case 2`
            </h2>
          </div>
        )}

        {/* Use Case 3: Non-critical Image with Correct fetchpriority="low" (GOOD PRACTICE) */}
        {showContentAndLazyImage && ( // This image also appears once render blocking is cleared
          <div style={{ backgroundColor: '#d1fae5', padding: '16px', borderRadius: '8px', marginBottom: '24px', borderLeft: '5px solid #10b981' }}>
            <h2 style={{ fontSize: '1.5rem', lineHeight: '2rem', fontWeight: 'semibold', color: '#067451', marginBottom: '8px' }}>
              🟢 Use Case 3:`
            </h2>
            <img
              src="https://placehold.co/600x300/007BFF/FFFFFF?text=Non-Critical+Image+Low+Priority"
              alt="Non-critical image with low fetch priority"
              loading="lazy" // Use lazy loading as it's non-critical
              fetchpriority="low" // Correctly applies low priority to a non-critical image
              style={{ width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', border: '4px solid #93c5fd', transition: 'transform 0.5s ease', objectFit: 'cover' }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
          </div>
        )}

        <p style={{ fontSize: '0.875rem', lineHeight: '1.25rem', color: '#6b7280', marginTop: '24px' }}>
          **How to Observe:** Open your browser's Developer Tools (F12), go to the "Performance" tab, and record a page load. Look for the LCP marker on the timeline. Also, check the "Network" tab to see when resources are fetched and their priorities. Notice how the incorrectly lazy-loaded LCP image is delayed, and how the non-critical image loads with low priority.
        </p>
      </div>
    </div>
  );
};

export default LCPPage;