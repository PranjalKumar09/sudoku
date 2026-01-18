import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import keepAliveService from "./services/keepAlive";
import { ThemeProvider } from "./context/ThemeContext";

window.adsbygoogle = window.adsbygoogle || [];
window.adsbygoogle.push({});

// Start keep-alive service to prevent Render from sleeping
keepAliveService.start();

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <HelmetProvider>
      <ThemeProvider>
        <StrictMode>
          <App />
        </StrictMode>
      </ThemeProvider>
    </HelmetProvider>
  </BrowserRouter>
);
