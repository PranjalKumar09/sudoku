import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/ScrollToTop";
import AdBlockDetector from "./components/AdBlockDetector";

// Lazy-loaded pages (SEO + performance friendly)
const GamePage = lazy(() => import("./pages/GamePage"));
const DailyPage = lazy(() => import("./pages/DailyPage"));
const HowToPlay = lazy(() => import("./pages/HowToPlay"));
const About = lazy(() => import("./pages/About"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Contact = lazy(() => import("./pages/Contact"));

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <ScrollToTop />
      <AdBlockDetector />

      <main className="flex-grow">
        <Suspense fallback={<div className="text-center mt-10">Loading…</div>}>
          <Routes>
            <Route path="/" element={<GamePage />} />
            <Route path="/daily" element={<DailyPage />} />
            <Route path="/how-to-play" element={<HowToPlay />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
