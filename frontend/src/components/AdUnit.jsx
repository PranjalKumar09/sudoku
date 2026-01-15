import { useEffect, useRef } from 'react';

export default function AdUnit({
    adSlot,
    adFormat = "auto",
    fullWidthResponsive = "true",
    style = { display: "block" }
}) {
    const adRef = useRef(null);

    useEffect(() => {
        try {
            // Safety check: ensure the ad script is loaded and we haven't already populated this slot
            // The 'adsbygoogle' global variable is the array that queues ads.
            if (window.adsbygoogle) {
                // Push a new ad request
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch (e) {
            console.error("AdSense error:", e);
        }
    }, []); // Run once on mount

    return (
        <div style={{ overflow: 'hidden' }}>
            <ins
                className="adsbygoogle"
                style={style}
                data-ad-client="ca-pub-8581322519667262"
                data-ad-slot={adSlot}
                data-ad-format={adFormat}
                data-full-width-responsive={fullWidthResponsive}
            />
        </div>
    );
}
