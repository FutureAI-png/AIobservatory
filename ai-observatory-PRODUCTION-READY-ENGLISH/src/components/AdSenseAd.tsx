import { useEffect } from "react";

interface AdSenseAdProps {
  adSlot: string;
  adFormat?: string;
  fullWidthResponsive?: boolean;
  style?: React.CSSProperties;
}

export default function AdSenseAd({ 
  adSlot, 
  adFormat = "auto",
  fullWidthResponsive = true,
  style = {}
}: AdSenseAdProps) {
  
  useEffect(() => {
    try {
      // Push ad to AdSense
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{
        display: 'block',
        ...style
      }}
      data-ad-client="ca-pub-XXXXXXXXXXXXXXXXX" // REPLACE WITH YOUR ADSENSE ID
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive={fullWidthResponsive.toString()}
    />
  );
}

// Placeholder component for development
export function AdSensePlaceholder({ width = "300px", height = "250px" }: { width?: string; height?: string }) {
  return (
    <div 
      className="bg-dark-900 border-2 border-green-500/50 rounded-lg flex items-center justify-center"
      style={{ width, height }}
    >
      <div className="text-center p-4">
        <div className="text-4xl mb-2">💰</div>
        <p className="text-sm font-bold text-green-400 mb-1">Google AdSense</p>
        <p className="text-xs text-slate-400">Ad will appear here</p>
        <p className="text-xs text-green-300 mt-2">$0.50-$2 per click</p>
      </div>
    </div>
  );
}
