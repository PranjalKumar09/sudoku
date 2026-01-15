import { useState, useEffect } from 'react';

export default function AdBlockDetector() {
    const [adBlocked, setAdBlocked] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Check if the AdSense script object exists
        // We give it a short delay to allow the script to load from network
        const checkAdBlock = setTimeout(() => {
            // If the script tag in index.html didn't create the global object, it was likely blocked
            // Or we can check if a bait element is hidden, but this is a simpler heuristic for now.

            // Another robust check: try to fetch a known ad URL or check if window.adsbygoogle is undefined
            // BUT, usually window.adsbygoogle is defined even if blocked (as an empty array by our own code).
            // So we rely on a "bait" element check or script error listener.

            // Let's us a simple "bait" approach: 
            // AdBlockers often hide elements with class 'text-ads', 'ads-banner' etc.
            // But here we'll rely on the user report that the SCRIPT failed to load.

            // For a robust check without external requests, we can check if the script is blocked:
            // Note: This relies on the fact that if the script was blocked, we might not see its side effects.
            // However, detecting "blocking" is an arms race. A simple request is polite.

            // Simple verify:
            const adScript = document.querySelector('script[src*="adsbygoogle"]');
            if (!adScript) {
                // If the script tag is literally gone (rare), it's blocked.
            }
        }, 2000);

        // Another method: fetch a bait file
        fetch('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', { mode: 'no-cors' })
            .then(() => {
                // Success (opague response), likely not blocked
                setAdBlocked(false);
            })
            .catch(() => {
                // Network error -> likely blocked
                setAdBlocked(true);
            });

        return () => clearTimeout(checkAdBlock);
    }, []);

    if (!adBlocked || !isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-red-600 text-white p-4 z-50 flex flex-col md:flex-row items-center justify-between shadow-lg">
            <div className="mb-2 md:mb-0 text-center md:text-left">
                <p className="font-bold text-lg">⚠️ Ad Blocker Detected</p>
                <p className="text-sm">We rely on ads to keep Sudoku free. Please consider disabling your ad blocker for this site.</p>
            </div>
            <button
                onClick={() => setIsVisible(false)}
                className="px-4 py-2 bg-white text-red-600 font-bold rounded hover:bg-gray-100 transition-colors"
            >
                I Understand
            </button>
        </div>
    );
}
