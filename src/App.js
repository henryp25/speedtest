// src/App.js
import React, { useState, useEffect } from 'react';
import LCPPage from './LCPPage';
import CLSPage from './CLSPage';
import INPPage from './INPPage';

// Main App component now implements simple hash-based client-side routing.
// It renders one of the Core Web Vitals demo pages based on the URL hash.
// All styling uses inline CSS, as requested (no Tailwind CSS).
const App = () => {
  // State to hold the current path, derived from window.location.hash
  const [currentPath, setCurrentPath] = useState(window.location.hash);

  // Effect to listen for hash changes and update the state
  useEffect(() => {
    // Function to update path state when hash changes
    const handleHashChange = () => {
      setCurrentPath(window.location.hash);
    };

    // Add event listener for hash changes
    window.addEventListener('hashchange', handleHashChange);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  // Helper function to navigate by updating the URL hash
  const navigate = (path) => {
    window.location.hash = path;
  };

  // Render the appropriate component based on the current path
  const renderPage = () => {
    switch (currentPath) {
      case '#/lcp':
        return <LCPPage />;
      case '#/cls':
        return <CLSPage />;
      case '#/inp':
        return <INPPage />;
      case '': // Default path when no hash is present
      case '#/':
      default:
        // Home page with navigation buttons
        return (
          <div style={{ minHeight: 'calc(100vh - 60px)', backgroundColor: '#f3f4f6', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <div style={{ backgroundColor: '#ffffff', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '600px', textAlign: 'center' }}>
              <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#333333', marginBottom: '24px' }}>
                Core Web Vitals Demo
              </h1>
              <p style={{ fontSize: '18px', color: '#555555', marginBottom: '32px' }}>
                Select a Core Web Vital to see a simulated performance issue on its own page.
                Use your browser's Developer Tools (Performance tab) to observe the effects.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <button
                  onClick={() => navigate('/lcp')}
                  style={{
                    padding: '12px 24px', backgroundColor: '#ef4444', color: 'white',
                    fontWeight: '600', borderRadius: '8px', border: 'none', cursor: 'pointer',
                    transition: 'background-color 0.3s ease, transform 0.3s ease',
                    fontSize: '18px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ef4444'}
                  onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
                  onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  Go to LCP Issue Page
                </button>
                <button
                  onClick={() => navigate('/cls')}
                  style={{
                    padding: '12px 24px', backgroundColor: '#f97316', color: 'white',
                    fontWeight: '600', borderRadius: '8px', border: 'none', cursor: 'pointer',
                    transition: 'background-color 0.3s ease, transform 0.3s ease',
                    fontSize: '18px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ea580c'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f97316'}
                  onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
                  onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  Go to CLS Issue Page
                </button>
                <button
                  onClick={() => navigate('/inp')}
                  style={{
                    padding: '12px 24px', backgroundColor: '#6366f1', color: 'white',
                    fontWeight: '600', borderRadius: '8px', border: 'none', cursor: 'pointer',
                    transition: 'background-color 0.3s ease, transform 0.3s ease',
                    fontSize: '18px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4f46e5'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#6366f1'}
                  onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
                  onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  Go to INP Issue Page
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="App">
      {/* Navigation bar at the top */}
      <nav style={{ backgroundColor: '#1f2937', padding: '16px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <ul style={{ display: 'flex', justifyContent: 'center', gap: '24px', listStyle: 'none', margin: '0', padding: '0' }}>
          <li>
            <button
              onClick={() => navigate('/')}
              style={{
                color: '#d1d5db', fontSize: '14px', fontWeight: '500',
                padding: '8px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer',
                backgroundColor: 'transparent', transition: 'color 0.2s ease, background-color 0.2s ease'
              }}
              onMouseOver={(e) => { e.currentTarget.style.color = 'white'; e.currentTarget.style.backgroundColor = '#374151'; }}
              onMouseOut={(e) => { e.currentTarget.style.color = '#d1d5db'; e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate('/lcp')}
              style={{
                color: '#fca5a5', fontSize: '14px', fontWeight: '500',
                padding: '8px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer',
                backgroundColor: 'transparent', transition: 'color 0.2s ease, background-color 0.2s ease'
              }}
              onMouseOver={(e) => { e.currentTarget.style.color = 'white'; e.currentTarget.style.backgroundColor = '#374151'; }}
              onMouseOut={(e) => { e.currentTarget.style.color = '#fca5a5'; e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              LCP
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate('/cls')}
              style={{
                color: '#fed7aa', fontSize: '14px', fontWeight: '500',
                padding: '8px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer',
                backgroundColor: 'transparent', transition: 'color 0.2s ease, background-color 0.2s ease'
              }}
              onMouseOver={(e) => { e.currentTarget.style.color = 'white'; e.currentTarget.style.backgroundColor = '#374151'; }}
              onMouseOut={(e) => { e.currentTarget.style.color = '#fed7aa'; e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              CLS
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate('/inp')}
              style={{
                color: '#c7d2fe', fontSize: '14px', fontWeight: '500',
                padding: '8px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer',
                backgroundColor: 'transparent', transition: 'color 0.2s ease, background-color 0.2s ease'
              }}
              onMouseOver={(e) => { e.currentTarget.style.color = 'white'; e.currentTarget.style.backgroundColor = '#374151'; }}
              onMouseOut={(e) => { e.currentTarget.style.color = '#c7d2fe'; e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              INP
            </button>
          </li>
        </ul>
      </nav>

      {/* Render the selected page */}
      {renderPage()}
    </div>
  );
};

export default App;
