import { useEffect, useRef } from "react";

/**
 * Custom hook for handling touch gestures on Sudoku grid
 * Supports: swipe navigation, long-press for pencil mode
 */
export function useTouchGestures({
    gridRef, // ref to the grid element
    onSwipe, // callback (direction: 'up'|'down'|'left'|'right')
    onLongPress, // callback ()
    enabled = true
}) {
    const touchStart = useRef(null);
    const touchEnd = useRef(null);
    const longPressTimer = useRef(null);

    const SWIPE_THRESHOLD = 50; // minimum distance for swipe
    const LONG_PRESS_DURATION = 500; // ms

    useEffect(() => {
        if (!enabled || !gridRef?.current) return;

        const grid = gridRef.current;

        function handleTouchStart(e) {
            touchStart.current = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY,
                time: Date.now(),
            };

            // Start long-press timer
            longPressTimer.current = setTimeout(() => {
                if (onLongPress) {
                    onLongPress();
                    // Haptic feedback if available
                    if (navigator.vibrate) {
                        navigator.vibrate(50);
                    }
                }
            }, LONG_PRESS_DURATION);
        }

        function handleTouchMove(e) {
            // Cancel long-press if finger moves
            if (longPressTimer.current) {
                clearTimeout(longPressTimer.current);
                longPressTimer.current = null;
            }

            touchEnd.current = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY,
            };
        }

        function handleTouchEnd() {
            // Clear long-press timer
            if (longPressTimer.current) {
                clearTimeout(longPressTimer.current);
                longPressTimer.current = null;
            }

            if (!touchStart.current || !touchEnd.current) return;

            const deltaX = touchEnd.current.x - touchStart.current.x;
            const deltaY = touchEnd.current.y - touchStart.current.y;
            const absDeltaX = Math.abs(deltaX);
            const absDeltaY = Math.abs(deltaY);

            // Determine if it's a swipe
            if (absDeltaX > SWIPE_THRESHOLD || absDeltaY > SWIPE_THRESHOLD) {
                if (absDeltaX > absDeltaY) {
                    // Horizontal swipe
                    onSwipe?.(deltaX > 0 ? "right" : "left");
                } else {
                    // Vertical swipe
                    onSwipe?.(deltaY > 0 ? "down" : "up");
                }
            }

            touchStart.current = null;
            touchEnd.current = null;
        }

        grid.addEventListener("touchstart", handleTouchStart, { passive: true });
        grid.addEventListener("touchmove", handleTouchMove, { passive: true });
        grid.addEventListener("touchend", handleTouchEnd);

        return () => {
            grid.removeEventListener("touchstart", handleTouchStart);
            grid.removeEventListener("touchmove", handleTouchMove);
            grid.removeEventListener("touchend", handleTouchEnd);
            if (longPressTimer.current) {
                clearTimeout(longPressTimer.current);
            }
        };
    }, [gridRef, onSwipe, onLongPress, enabled]);
}
