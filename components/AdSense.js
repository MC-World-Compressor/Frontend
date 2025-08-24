'use client';

import { useEffect } from 'react';

const AdSense = ({ 
  slot, 
  style = { display: 'block' }, 
  format = 'auto',
  layout = '',
  layoutKey = '',
  className = '',
  responsive = true 
}) => {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (error) {
      console.log('AdSense error:', error);
    }
  }, []);

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={style}
      data-ad-client={process.env._CLIENT_ID}
      data-ad-slot={slot}
      data-ad-format={format}
      data-ad-layout={layout}
      data-ad-layout-key={layoutKey}
      data-full-width-responsive={responsive}
    />
  );
};

export default AdSense;
