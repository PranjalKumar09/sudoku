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

// Blog pages
const BlogIndex = lazy(() => import("./pages/blog/BlogIndex"));
const SudokuStrategies = lazy(() => import("./pages/blog/SudokuStrategies"));
const SudokuBenefits = lazy(() => import("./pages/blog/SudokuBenefits"));
const SudokuHistory = lazy(() => import("./pages/blog/SudokuHistory"));
const SudokuTips = lazy(() => import("./pages/blog/SudokuTips"));
const SudokuVsCrossword = lazy(() => import("./pages/blog/SudokuVsCrossword"));

// Stats page
const StatsPage = lazy(() => import("./pages/StatsPage"));

// Game modes
const TimeTrialPage = lazy(() => import("./pages/TimeTrialPage"));
const ChallengePage = lazy(() => import("./pages/ChallengePage"));
const CustomPuzzlePage = lazy(() => import("./pages/CustomPuzzlePage"));

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

            {/* Stats page */}
            <Route path="/stats" element={<StatsPage />} />

            {/* Game modes */}
            <Route path="/time-trial" element={<TimeTrialPage />} />
            <Route path="/challenge" element={<ChallengePage />} />
            <Route path="/custom" element={<CustomPuzzlePage />} />

            {/* Blog routes */}
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/sudoku-strategies" element={<SudokuStrategies />} />
            <Route path="/blog/sudoku-benefits" element={<SudokuBenefits />} />
            <Route path="/blog/sudoku-history" element={<SudokuHistory />} />
            <Route path="/blog/sudoku-tips" element={<SudokuTips />} />
            <Route path="/blog/sudoku-vs-crossword" element={<SudokuVsCrossword />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
