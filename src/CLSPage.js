// src/CLSPage.js
import React, { useEffect, useState } from 'react';

// CLSPage component designed to demonstrate Cumulative Layout Shift (CLS).
// This version is longer and introduces more shifts, particularly on scroll,
// to make the issue more apparent. All styling is inline and mobile-friendly.
const CLSPage = () => {
  const [showAdTop, setShowAdTop] = useState(false);
  const [showDelayedImage1, setShowDelayedImage1] = useState(false);
  const [showAdMiddle, setShowAdMiddle] = useState(false);
  const [showDelayedImage2, setShowDelayedImage2] = useState(false);
  const [showAdBottom, setShowAdBottom] = useState(false);

  useEffect(() => {
    // Simulate initial ad/image loading shifts
    setTimeout(() => setShowAdTop(true), 1500);
    setTimeout(() => setShowDelayedImage1(true), 2500);

    // Simulate shifts that happen later or on scroll (though this is time-based for simplicity)
    // In a real scenario, these might be triggered by scroll-based lazy loading
    // or external script injections that happen well after initial load.
    setTimeout(() => setShowAdMiddle(true), 4000);
    setTimeout(() => setShowDelayedImage2(true), 5500);
    setTimeout(() => setShowAdBottom(true), 7000);

    // No scroll listener explicitly added here for 'on scroll' CLS,
    // as browser performance tools measure shifts regardless of scroll interaction.
    // The staggered timers simulate content loading at different points down the page.
  }, []);

  const paragraphStyle = {
    fontSize: '1rem', lineHeight: '1.5rem', color: '#4b5563', marginBottom: '16px'
  };

  const sectionHeadingStyle = {
    fontSize: '1.5rem', lineHeight: '2rem', fontWeight: 'semibold', color: '#1d4ed8', marginBottom: '12px'
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', boxSizing: 'border-box' }}>
      <div style={{
        backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '100%', maxWidth: '768px', textAlign: 'center', marginBottom: '40px', display: 'flex', flexDirection: 'column', gap: '24px'
      }}>
        <h1 style={{ fontSize: '2.25rem', lineHeight: '2.5rem', fontWeight: 'bold', color: '#ea580c', marginBottom: '16px' }}>
          Cumulative Layout Shift (CLS) Issue
        </h1>
        <p style={{ fontSize: '1.125rem', lineHeight: '1.75rem', color: '#4b5563', marginBottom: '24px' }}>
          This page intentionally causes CLS. Scroll down and observe how content shifts around as new elements load or adjust their size, leading to an unstable layout.
        </p>

        {/* Top Ad that causes shift */}
        {showAdTop && (
          <div style={{
            backgroundColor: '#d1fae5', padding: '16px', borderRadius: '8px', border: '2px solid #34d399',
            animation: 'fadeInDown 0.5s ease-out'
          }}>
            <h3 style={{ fontSize: '1.25rem', lineHeight: '1.75rem', fontWeight: 'bold', color: '#065f46', marginBottom: '8px' }}>
              Top Ad Appears!
            </h3>
            <p style={{ fontSize: '0.875rem', lineHeight: '1.25rem', color: '#065f46' }}>
              This unexpected banner suddenly pushes down content.
            </p>
          </div>
        )}

        <div style={{ backgroundColor: '#e0f2f7', padding: '16px', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)' }}>
          <h2 style={sectionHeadingStyle}>
            Section 1: Initial Content
          </h2>
          <p style={paragraphStyle}>
            This is the first block of content. It loads quickly but subsequent elements will cause shifts around it.
          </p>
          <p style={paragraphStyle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>

        {/* Delayed image 1 without dimensions */}
        {!showDelayedImage1 ? (
          <div style={{
            width: '100%', height: '120px', backgroundColor: '#e5e7eb', borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280', fontSize: '1rem'
          }}>
            Loading image (will cause shift)
          </div>
        ) : (
          <img
            src="https://placehold.co/600x200/FFA500/FFFFFF?text=Delayed+Image+1"
            alt="Delayed Image 1"
            style={{ width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', border: '4px solid #fdba74' }}
          />
        )}

        <div style={{ backgroundColor: '#e0f7e9', padding: '16px', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)' }}>
          <h2 style={sectionHeadingStyle}>
            Section 2: More Content
          </h2>
          <p style={paragraphStyle}>
            Another paragraph to ensure the page is long enough. As you scroll, more elements will appear, causing further layout instability.
          </p>
          <p style={paragraphStyle}>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p style={paragraphStyle}>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>
        </div>

        {/* Middle Ad that causes shift */}
        {showAdMiddle && (
          <div style={{
            backgroundColor: '#dbeafe', padding: '16px', borderRadius: '8px', border: '2px solid #60a5fa',
            animation: 'fadeInDown 0.5s ease-out'
          }}>
            <h3 style={{ fontSize: '1.25rem', lineHeight: '1.75rem', fontWeight: 'bold', color: '#1e40af', marginBottom: '8px' }}>
              Mid-Page Ad!
            </h3>
            <p style={{ fontSize: '0.875rem', lineHeight: '1.25rem', color: '#1e40af' }}>
              Another ad has loaded, pushing down content unexpectedly.
            </p>
          </div>
        )}

        <div style={{ backgroundColor: '#fce7f3', padding: '16px', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)' }}>
          <h2 style={sectionHeadingStyle}>
            Section 3: Content Below Ad
          </h2>
          <p style={paragraphStyle}>
            This section now appears below the mid-page ad. Its position will have shifted.
          </p>
          <p style={paragraphStyle}>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.
          </p>
        </div>

        {/* Delayed image 2 without dimensions */}
        {!showDelayedImage2 ? (
          <div style={{
            width: '100%', height: '180px', backgroundColor: '#e5e7eb', borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280', fontSize: '1rem'
          }}>
            Loading another image (larger shift expected)
          </div>
        ) : (
          <img
            src="https://placehold.co/600x300/F08080/FFFFFF?text=Delayed+Image+2"
            alt="Delayed Image 2"
            style={{ width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', border: '4px solid #f87171' }}
          />
        )}

        <div style={{ backgroundColor: '#f0f9ff', padding: '16px', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)' }}>
          <h2 style={sectionHeadingStyle}>
            Section 4: Final Content
          </h2>
          <p style={paragraphStyle}>
            The final section of content. Scroll to the very bottom to ensure all shifts have occurred.
          </p>
          <p style={paragraphStyle}>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
          </p>
          <p style={paragraphStyle}>
            Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
          </p>
        </div>

        {/* Bottom Ad that causes shift */}
        {showAdBottom && (
          <div style={{
            backgroundColor: '#eef2ff', padding: '16px', borderRadius: '8px', border: '2px solid #818cf8',
            animation: 'fadeInDown 0.5s ease-out'
          }}>
            <h3 style={{ fontSize: '1.25rem', lineHeight: '1.75rem', fontWeight: 'bold', color: '#4338ca', marginBottom: '8px' }}>
              Bottom Ad Loads!
            </h3>
            <p style={{ fontSize: '0.875rem', lineHeight: '1.25rem', color: '#4338ca' }}>
              Another dynamic element causing a final layout shift.
            </p>
          </div>
        )}

        <p style={{ fontSize: '0.875rem', lineHeight: '1.25rem', color: '#6b7280', marginTop: '24px' }}>
          To observe CLS, open Developer Tools, go to "Performance", and record a page load. Scroll down the page during the recording. Look for layout shift regions. You can also use the "Rendering" tab to highlight layout shifts.
        </p>
      </div>
      {/* Define fadeInDown animation inline for demonstration */}
      <style>
        {`
        @keyframes fadeInDown {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        `}
      </style>
    </div>
  );
};

export default CLSPage;
