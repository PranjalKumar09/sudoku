import { Helmet } from "react-helmet-async";

export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* SEO */}
      <Helmet>
        <title>Contact – Free Online Sudoku</title>
        <meta
          name="description"
          content="Contact the developer of this free online Sudoku game. Share feedback, report issues, or suggest improvements."
        />
        <link
          rel="canonical"
          href="https://sudoku-frontend-pmdr.onrender.com/contact"
        />
      </Helmet>

      <h1 className="text-3xl font-bold mb-4">Contact</h1>

      <p className="mb-4 text-gray-700">
        Have feedback, suggestions, or found a bug while playing Sudoku?
        I’d love to hear from you.
      </p>

      <p className="mb-4 text-gray-700">
        This project is actively maintained, and user feedback helps improve
        the overall experience.
      </p>

      <div className="mt-6 p-4 bg-gray-50 border rounded">
        <p className="font-semibold mb-2">📧 Email</p>
        <p className="text-blue-600 break-all">
          coderkumarshukla@gmail.com
        </p>
      </div>

      <p className="mt-6 text-gray-700">
        You can also share feedback directly through the in-game feedback
        button after completing or losing a puzzle.
      </p>

      <p className="mt-4 text-gray-700">
        Thank you for playing and helping make this Sudoku platform better.
      </p>
    </div>
  );
}
