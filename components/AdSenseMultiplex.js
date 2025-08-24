'use client';

import { useEffect } from 'react';

const AdSenseMultiplex = ({ 
  className = '',
  style = { display: 'block' }
}) => {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (error) {
      console.log('AdSense Multiplex error:', error);
    }
  }, []);

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={style}
      data-ad-format="autorelaxed"
      data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
      data-ad-slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_MULTIPLEX}
    />
  );
};

export default AdSenseMultiplex;
