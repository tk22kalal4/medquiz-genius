
import React from 'react';
import { GoogleAdSense } from './GoogleAdSense';

export const InArticleAd: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <GoogleAdSense
      client="ca-pub-5920367457745298"
      slot="4319901842"
      format="fluid"
      responsive={true}
      layout="in-article"
      className={`my-4 ${className || ''}`}
      style={{ display: 'block', textAlign: 'center' }}
    />
  );
};
