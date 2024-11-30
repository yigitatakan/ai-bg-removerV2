import { useEffect } from 'react';

interface AdProps {
  adSlot: string;
  adFormat?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
  style?: React.CSSProperties;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const publisherId = "ca-pub-6207135692337515";

export const Advertisement = ({ adSlot, adFormat = 'auto', style }: AdProps) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error('Error loading advertisement:', error);
    }
  }, []);

  if (!publisherId) {
    console.warn('AdSense Publisher ID is not configured');
    return null;
  }

  return (
    <div className="ad-container" style={style}>
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          textAlign: 'center',
          ...style,
        }}
        data-ad-client={publisherId}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
};
