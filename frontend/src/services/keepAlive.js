const BASE_URL = import.meta.env.VITE_API_URL;

// Keep-alive service to prevent Render from sleeping
class KeepAliveService {
    constructor() {
        this.backendUrl = BASE_URL;
        this.intervalId = null;
        this.pingInterval = 10 * 60 * 1000; // 10 minutes
    }

    async pingBackend() {
        try {
            // Use the health endpoint - BASE_URL already includes /api/sudoku
            // So we need to go back to /api/health/ping
            const healthUrl = BASE_URL.replace('/api/sudoku', '/api/health');
            const response = await fetch(`${healthUrl}/ping`);
            if (response.ok) {
                const data = await response.json();
                console.log('✅ Backend ping successful:', data.data?.timestamp || new Date().toISOString());
            }
        } catch (error) {
            console.warn('⚠️ Backend ping failed:', error.message);
        }
    }

    async pingFrontend() {
        // Self-ping to keep frontend alive on Render
        try {
            // This pings the current frontend URL
            const currentUrl = window.location.origin;
            await fetch(currentUrl, { method: 'HEAD' });
            console.log('✅ Frontend self-ping successful');
        } catch (error) {
            console.warn('⚠️ Frontend self-ping failed:', error.message);
        }
    }

    start() {
        if (this.intervalId) {
            console.log('Keep-alive service already running');
            return;
        }

        console.log('🚀 Starting keep-alive service (ping every 10 minutes)');

        // Initial ping
        this.pingBackend();
        this.pingFrontend();

        // Schedule periodic pings
        this.intervalId = setInterval(() => {
            this.pingBackend();
            this.pingFrontend();
        }, this.pingInterval);
    }

    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
            console.log('⏹️ Keep-alive service stopped');
        }
    }
}

// Create singleton instance
const keepAliveService = new KeepAliveService();

export default keepAliveService;
