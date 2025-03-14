
import React, { useRef, useEffect, useState } from 'react';
import { isMobileApp } from '../utils/admobUtils';
import * as mobileAds from 'react-native-google-mobile-ads';

interface TestBannerAdComponentProps {
  isVisible: boolean;
}

const TestBannerAdComponent: React.FC<TestBannerAdComponentProps> = ({ isVisible }) => {
  // Create a ref for the ad component
  const bannerRef = useRef(null);

  useEffect(() => {
    if (!isMobileApp()) {
      console.log('Not showing test banner ad in non-mobile environment');
      return;
    }

    // This would be implemented in a real mobile environment
    console.log('Test banner ad component mounted');

    return () => {
      console.log('Test banner ad component unmounted');
    };
  }, []);

  // Don't render anything if not visible or not in mobile app
  if (!isVisible || !isMobileApp()) {
    return null;
  }

  // For web preview, show a placeholder
  return (
    <div 
      className="test-banner-ad-container"
      style={{ 
        width: '100%',
        height: '50px',
        backgroundColor: '#f8f9fa',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '10px 0',
        border: '1px dashed #ccc',
        borderRadius: '4px'
      }}
    >
      <span>Test Advertisement Banner</span>
    </div>
  );
};

export default TestBannerAdComponent;
