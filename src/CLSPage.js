// src/CLSPage.js
import React, { useEffect, useState } from 'react';

// CLSPage component designed to demonstrate Cumulative Layout Shift (CLS).
// This version introduces common real-world scenarios causing layout shifts,
// encouraging the user to observe and identify the causes.
// All styling is inline and mobile-friendly.
const CLSPage = () => {
  const [showAdTop, setShowAdTop] = useState(false);
  const [showDelayedImage1, setShowDelayedImage1] = useState(false);
  const [showAdMiddle, setShowAdMiddle] = useState(false);
  const [showDelayedImage2, setShowDelayedImage2] = useState(false);
  const [showAdBottom, setShowAdBottom] = useState(false);
  const [showDynamicContent, setShowDynamicContent] = useState(false); // For another CLS scenario

  useEffect(() => {
    // Scenario 1: Top banner/ad loads late
    // Imagine an ad script that runs after initial content is painted.
    setTimeout(() => setShowAdTop(true), 1500);

    // Scenario 2: Image without explicit dimensions loads later
    // This often happens with user-generated content or images loaded via JS.
    setTimeout(() => setShowDelayedImage1(true), 2500);

    // Scenario 3: Mid-page ad or widget loads
    setTimeout(() => setShowAdMiddle(true), 4000);

    // Scenario 4: Another image loads, potentially larger
    setTimeout(() => setShowDelayedImage2(true), 5500);

    // Scenario 5: Dynamically injected content (e.g., cookie banner, chat widget)
    setTimeout(() => setShowDynamicContent(true), 7000);

    // Scenario 6: Bottom ad/element loads
    setTimeout(() => setShowAdBottom(true), 8000); // Ensures it's one of the last

    return () => {
      clearTimeout(); // Clear all timers on unmount (basic cleanup)
    };
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
          Observing Cumulative Layout Shift (CLS)
        </h1>
        <p style={{ fontSize: '1.125rem', lineHeight: '1.75rem', color: '#4b5563', marginBottom: '24px' }}>
          This page is designed to help you identify Cumulative Layout Shift. As you interact with the page (especially by scrolling) and content loads, observe how elements might unexpectedly move or jump around.
        </p>

        {/* Scenario 1: Top dynamic banner/ad */}
        {showAdTop && (
          <div style={{
            backgroundColor: '#d1fae5', padding: '16px', borderRadius: '8px', border: '2px solid #34d399',
            animation: 'fadeInDown 0.5s ease-out'
          }}>
            <h3 style={{ fontSize: '1.25rem', lineHeight: '1.75rem', fontWeight: 'bold', color: '#065f46', marginBottom: '8px' }}>
              Dynamic Content Area Appears
            </h3>
            <p style={{ fontSize: '0.875rem', lineHeight: '1.25rem', color: '#065f46' }}>
              This section dynamically loads into the top of the content flow. Consider how newly inserted elements might affect the position of existing content.
            </p>
          </div>
        )}

        <div style={{ backgroundColor: '#e0f2f7', padding: '16px', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)' }}>
          <h2 style={sectionHeadingStyle}>
            Initial Page Content
          </h2>
          <p style={paragraphStyle}>
            This is the first block of content. Pay attention to how its position and the position of elements below it change as other content loads onto the page.
          </p>
          <p style={paragraphStyle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>

        {/* Scenario 2: Image without explicit dimensions */}
        {!showDelayedImage1 ? (
          <div style={{
            width: '100%', height: '120px', backgroundColor: '#e5e7eb', borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280', fontSize: '1rem'
          }}>
            Placeholder for a loading image...
          </div>
        ) : (
          <img
            src="https://placehold.co/600x200/FFA500/FFFFFF?text=Dynamically+Loaded+Image+1"
            alt="Dynamically loaded image without dimensions"
            style={{ width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', border: '4px solid #fdba74' }}
          />
        )}
        <p style={paragraphStyle}>
          Above this text, an image has just loaded. Notice if the content surrounding it shifted. This often occurs when images don't have explicit `width` and `height` attributes (or CSS aspect ratios) and load after the initial layout.
        </p>


        <div style={{ backgroundColor: '#e0f7e9', padding: '16px', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)' }}>
          <h2 style={sectionHeadingStyle}>
            Further Content Sections
          </h2>
          <p style={paragraphStyle}>
            Continue observing the page as you scroll. New elements might load into view, or existing elements might adjust.
          </p>
          <p style={paragraphStyle}>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>

        {/* Scenario 3: Mid-page advertisement or widget */}
        {showAdMiddle && (
          <div style={{
            backgroundColor: '#dbeafe', padding: '16px', borderRadius: '8px', border: '2px solid #60a5fa',
            animation: 'fadeInDown 0.5s ease-out'
          }}>
            <h3 style={{ fontSize: '1.25rem', lineHeight: '1.75rem', fontWeight: 'bold', color: '#1e40af', marginBottom: '8px' }}>
              Mid-Page Interactive Element
            </h3>
            <p style={{ fontSize: '0.875rem', lineHeight: '1.25rem', color: '#1e40af' }}>
              An interactive component or advertisement has appeared in the middle of the page. Consider the impact when third-party scripts inject content without reserving space.
            </p>
          </div>
        )}

        <div style={{ backgroundColor: '#fce7f3', padding: '16px', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)' }}>
          <h2 style={sectionHeadingStyle}>
            Content Adjusting to New Elements
          </h2>
          <p style={paragraphStyle}>
            This section now sits below dynamically added elements. Notice how its initial position might have been different from its final resting place.
          </p>
          <p style={paragraphStyle}>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.
          </p>
        </div>

        {/* Scenario 4: Another image loads without dimensions */}
        {!showDelayedImage2 ? (
          <div style={{
            width: '100%', height: '180px', backgroundColor: '#e5e7eb', borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280', fontSize: '1rem'
          }}>
            Another image placeholder...
          </div>
        ) : (
          <img
            src="https://placehold.co/600x300/F08080/FFFFFF?text=Dynamically+Loaded+Image+2"
            alt="Dynamically loaded image 2 without dimensions"
            style={{ width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', border: '4px solid #f87171' }}
          />
        )}
        <p style={paragraphStyle}>
          Another image has just rendered. This one is larger. How do these larger additions impact the stability of the page layout, especially if their final size is unknown initially?
        </p>

        {/* Scenario 5: Dynamically loaded "sticky" or "pop-up" content */}
        {showDynamicContent && (
          <div style={{
            backgroundColor: '#ffedd5', padding: '16px', borderRadius: '8px', border: '2px solid #fb923c',
            animation: 'fadeInUp 0.5s ease-out', position: 'sticky', bottom: '20px', zIndex: 10,
            width: 'calc(100% - 40px)', maxWidth: '728px', margin: 'auto', marginBottom: '20px'
          }}>
            <h3 style={{ fontSize: '1.25rem', lineHeight: '1.75rem', fontWeight: 'bold', color: '#c2410c', marginBottom: '8px' }}>
              Late-Loading Call to Action
            </h3>
            <p style={{ fontSize: '0.875rem', lineHeight: '1.25rem', color: '#c2410c' }}>
              This content (e.g., a cookie consent banner, a newsletter signup) appeared after the main content loaded. How does content injected from the top or bottom influence the layout, even if its position is "fixed" or "sticky"? (Note: "Sticky" elements can still cause shifts if their container moves or they suddenly take up space.)
            </p>
          </div>
        )}

        <div style={{ backgroundColor: '#f0f9ff', padding: '16px', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)' }}>
          <h2 style={sectionHeadingStyle}>
            Concluding Content
          </h2>
          <p style={paragraphStyle}>
            You've reached the end of the main content. Ensure you've scrolled sufficiently to trigger all dynamic elements.
          </p>
          <p style={paragraphStyle}>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
          </p>
        </div>

        {/* Scenario 6: Bottom dynamic ad/element */}
        {showAdBottom && (
          <div style={{
            backgroundColor: '#eef2ff', padding: '16px', borderRadius: '8px', border: '2px solid #818cf8',
            animation: 'fadeInUp 0.5s ease-out'
          }}>
            <h3 style={{ fontSize: '1.25rem', lineHeight: '1.75rem', fontWeight: 'bold', color: '#4338ca', marginBottom: '8px' }}>
              Final Dynamic Content Area
            </h3>
            <p style={{ fontSize: '0.875rem', lineHeight: '1.25rem', color: '#4338ca' }}>
              Another element has appeared towards the bottom of the page. Consider its effect on the overall layout.
            </p>
          </div>
        )}

        <p style={{ fontSize: '0.875rem', lineHeight: '1.25rem', color: '#6b7280', marginTop: '24px' }}>
          **How to Test:** Use your browser's Developer Tools (F12).
          <br />
          1. Go to the **"Performance"** tab and record a page load. Make sure to **scroll down the page** during the recording to trigger more shifts. Look for layout shift regions highlighted on the timeline.
          <br />
          2. In the **"Rendering"** tab (usually under "More tools" or "3 dots" menu), enable **"Layout Shift Regions"**. This will visually highlight areas on the page that are shifting with a blue box.
          <br />
          Observe the page during and after load, and identify which elements cause the layout to become unstable.
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