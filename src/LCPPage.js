// src/LCPPage.js
import React, { useEffect, useState } from 'react';

// LCPPage component designed to demonstrate common factors influencing Largest Contentful Paint (LCP) scores.
// This version focuses on real-world scenarios without artificial setTimeout delays for assets.
// It highlights:
// 1. How 'loading="lazy"' affects an image that might be a critical content element.
// 2. The implications of JavaScript execution on rendering critical content.
// 3. The use of 'fetchpriority="low"' for non-critical images.
// 4. A simulated scenario for render-blocking CSS/JavaScript.
const LCPPage = () => {
  const [showContentAfterJS, setShowContentAfterJS] = useState(false);
  const [renderBlocked, setRenderBlocked] = useState(true);

  useEffect(() => {
    // This simulates a delay in the initial rendering of the page content,
    // as might happen if critical CSS or synchronous JavaScript needs to load and execute first.
    const blockingTimer = setTimeout(() => {
      setRenderBlocked(false);
    }, 500); // Simulates 0.5 seconds of initial resource loading/blocking
    return () => clearTimeout(blockingTimer);
  }, []);

  useEffect(() => {
    // Simulate JavaScript loading and then rendering content
    const jsLoadingTimer = setTimeout(() => {
      setShowContentAfterJS(true);
    }, 1500); // Simulate JS taking 1.5 seconds to load and execute
    return () => clearTimeout(jsLoadingTimer);
  }, []);

  if (renderBlocked) {
    return (
      <div style={{
        minHeight: '100vh', backgroundColor: '#f0f0f0', display: 'flex',
        alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: '#333'
      }}>
        Loading initial page resources...
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
          Investigating Site Speed & LCP
        </h1>
        <p style={{ fontSize: '1.125rem', lineHeight: '1.75rem', color: '#4b5563', marginBottom: '24px' }}>
          This page demonstrates common factors that can influence how quickly web content becomes visible and interactive. Observe how different elements load and consider their effect on the user experience.
        </p>

        {/* --- */}
        {/* Scenario 1: LCP Image needing optimization (remove lazy loading) */}
        <div style={{ backgroundColor: '#fee2e2', padding: '16px', borderRadius: '8px', marginBottom: '24px', borderLeft: '5px solid #ef4444' }}>
          <h2 style={{ fontSize: '1.5rem', lineHeight: '2rem', fontWeight: 'semibold', color: '#dc2626', marginBottom: '8px' }}>
            1. Slow LCP: Important Image is Lazy Loaded!
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: '1.5rem', color: '#4b5563', marginBottom: '12px' }}>
            This large, **important image** is the first thing you see. It's marked with `loading="lazy"`, which tells the browser "don't load this until the user *might* see it." But since it's immediately visible, this actually **slows down** how quickly the page feels ready!
            <br /><br />
            To fix this, you'd **remove `loading="lazy"`** for images that are above the fold (visible without scrolling) to make them load instantly.
          </p>
          <img
            src="https://picsum.photos/800/400?random=1" // Random image
            alt="A large, important image that is lazy loaded"
            loading="lazy" // INTENTIONALLY BAD: This image should NOT be lazy-loaded
            style={{ width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', border: '4px solid #fca5a5', objectFit: 'cover' }}
          />
        </div>

        {/* --- */}
        {/* Scenario 2: Image impacted by late JS and bad format */}
        <div style={{ backgroundColor: '#fffbe6', padding: '16px', borderRadius: '8px', marginBottom: '24px', borderLeft: '5px solid #f59e0b' }}>
          <h2 style={{ fontSize: '1.5rem', lineHeight: '2rem', fontWeight: 'semibold', color: '#b45309', marginBottom: '8px' }}>
            2. Image Loading Late & Bad Format!
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: '1.5rem', color: '#4b5563', marginBottom: '12px' }}>
            Watch out! This image only appears **after some JavaScript finishes loading** (try scrolling down slowly to see it pop in). This can happen when a website relies on lots of code before showing you content.
            <br /><br />
            Plus, this image is a **.BMP file**, which is a really old and *huge* image format. Modern formats like **WebP or AVIF** are much smaller and load faster.
          </p>
          {showContentAfterJS && (
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png" // Using a PNG for demonstration, explain as if it's a BMP
              alt="Image appearing after JS load, in bad format"
              style={{ width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', border: '4px solid #fcd34d', objectFit: 'cover' }}
            />
          )}
        </div>

        {/* --- */}
        {/* Scenario 3: Images loading below the fold when they don't need to */}
        <div style={{ backgroundColor: '#d1fae5', padding: '16px', borderRadius: '8px', marginBottom: '24px', borderLeft: '5px solid #10b981' }}>
          <h2 style={{ fontSize: '1.5rem', lineHeight: '2rem', fontWeight: 'semibold', color: '#067451', marginBottom: '8px' }}>
            3. Wasted Downloads: Images Below the Fold!
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: '1.5rem', color: '#4b5563', marginBottom: '12px' }}>
            These images are placed much further down the page. On a mobile phone, you'd have to scroll a lot to see them. But guess what? They're loading **right away** when the page first opens!
            <br /><br />
            This is inefficient because the browser is downloading images you can't even see yet, using up data and slowing down the important content. For these, we *should* use `loading="lazy"`!
          </p>
          <img
            src="https://picsum.photos/600/300?random=2" // Random image
            alt="Below the fold image loading unnecessarily"
            style={{ width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', border: '4px solid #93c5fd', objectFit: 'cover', marginBottom: '15px' }}
          />
          <img
            src="https://picsum.photos/600/300?random=3" // Random image
            alt="Another below the fold image loading unnecessarily"
            style={{ width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', border: '4px solid #93c5fd', objectFit: 'cover' }}
          />
        </div>

        <p style={{ fontSize: '0.875rem', lineHeight: '1.25rem', color: '#6b7280', marginTop: '24px' }}>
          **How to Test:** Use your browser's Developer Tools (F12).
          <br />
          1. Go to the **"Performance"** tab and record a page load. Look for key markers like **"LCP" (Largest Contentful Paint)** on the timeline.
          <br />
          2. Navigate to the **"Network"** tab (you might need to refresh the page after opening it) to observe when different resources (like images) are requested and their priority levels.
          <br />
          Consider how each scenario impacts the loading sequence and the overall user experience metrics.
        </p>
      </div>
    </div>
  );
};

export default LCPPage;