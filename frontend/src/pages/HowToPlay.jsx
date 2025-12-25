import { Helmet } from "react-helmet-async";

export default function HowToPlay() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What are the basic rules of Sudoku?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "In Sudoku, every row, column, and 3×3 box must contain the numbers 1 through 9 exactly once, without repeating."
        }
      },
      {
        "@type": "Question",
        name: "Is Sudoku a game of luck or skill?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Sudoku is a logic-based puzzle. Every puzzle has a solution that can be reached without guessing."
        }
      },
      {
        "@type": "Question",
        name: "What is Pencil Mode in Sudoku?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Pencil Mode lets you write small candidate numbers in a cell to track possible values before committing to one."
        }
      },
      {
        "@type": "Question",
        name: "What is the best Sudoku difficulty for beginners?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Beginners should start with Easy Sudoku puzzles to learn patterns and logic techniques before moving to harder levels."
        }
      }
    ]
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* SEO */}
      <Helmet>
        <title>How to Play Sudoku (Beginner’s Guide) – Rules, Tips & Examples</title>
        <meta
          name="description"
          content="Learn how to play Sudoku step by step. Simple rules, beginner tips, common mistakes, and how to use pencil notes and hints."
        />
        <link
          rel="canonical"
          href="https://sudoku-frontend-pmdr.onrender.com/how-to-play"
        />
        <meta name="robots" content="index, follow" />

        {/* FAQ Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <h1 className="text-3xl font-bold mb-4">How to Play Sudoku</h1>

      <p className="mb-4 text-gray-700">
        Sudoku is a <strong>logic-based number puzzle</strong>. The goal is to
        fill a 9×9 grid so that every <strong>row</strong>, <strong>column</strong>,
        and <strong>3×3 box</strong> contains the numbers{" "}
        <strong>1 through 9</strong> exactly once.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        Basic Sudoku Rules
      </h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-1">
        <li>Each row must contain numbers 1–9 without repetition</li>
        <li>Each column must contain numbers 1–9 without repetition</li>
        <li>Each 3×3 box must contain numbers 1–9 without repetition</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        How to Start Solving a Sudoku
      </h2>
      <p className="text-gray-700">
        Start by scanning rows, columns, or boxes with many filled cells.
        Identify which numbers are missing and place them where they logically
        fit. Sudoku puzzles never require guessing.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        Helpful Sudoku Features
      </h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-1">
        <li><strong>Pencil Mode:</strong> Mark possible numbers before committing</li>
        <li><strong>Hints:</strong> Get help if you’re stuck (limited uses)</li>
        <li><strong>Timer:</strong> Track how long it takes you to solve</li>
        <li><strong>Mistake Limit:</strong> Too many incorrect moves ends the game</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        Common Sudoku Mistakes
      </h2>
      <p className="text-gray-700">
        Avoid random guessing. Sudoku rewards patience and logical thinking.
        Pencil notes help you explore possibilities safely without risking
        mistakes.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        Ready to Play Sudoku?
      </h2>
      <p className="text-gray-700">
        Start with <strong>Easy</strong> puzzles if you’re new, then work your way
        up. Try the{" "}
        <a href="/daily" className="text-blue-600 underline">
          Daily Sudoku
        </a>{" "}
        to challenge yourself with a new puzzle every day.
      </p>
    </div>
  );
}
