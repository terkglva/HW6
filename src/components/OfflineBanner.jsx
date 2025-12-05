// src/components/OfflineBanner.jsx
import React, { useState, useEffect } from 'react';

const OfflineBanner = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  const bannerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#a30000',
    color: 'white',
    padding: '10px',
    textAlign: 'center',
    zIndex: 9999,
    fontWeight: 'bold',
    boxShadow: '0 2px 10px rgba(0,0,0,0.5)'
  };

  return (
    <div style={bannerStyle}>
      ⚠️ You are offline. Some features may not be available.
    </div>
  );
};

export default OfflineBanner;