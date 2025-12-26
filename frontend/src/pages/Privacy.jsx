import { Helmet } from "react-helmet-async";

export default function Privacy() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* SEO */}
      <Helmet>
        <title>Privacy Policy – Free Online Sudoku</title>
        <meta
          name="description"
          content="Privacy Policy for this free online Sudoku game. Learn how data, cookies, and third-party services are handled."
        />
        <link
          rel="canonical"
          href="https://sudoku-frontend-pmdr.onrender.com/privacy"
        />
      </Helmet>

      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>

      <p className="mb-4 text-gray-700">
        Your privacy is important to us. This website allows users to play Sudoku
        online without creating an account or providing personal information.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Information We Collect</h2>
      <p className="mb-4 text-gray-700">
        We do not collect personally identifiable information such as name,
        email address, or phone number. Gameplay data (such as progress or
        settings) may be stored locally in your browser for a better user
        experience.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        Cookies & Third-Party Services
      </h2>
      <p className="mb-4 text-gray-700">
        This website may use third-party services such as Google Analytics or
        Google AdSense in the future. These services may use cookies or similar
        technologies to analyze traffic or display relevant advertisements.
      </p>

      <p className="mb-4 text-gray-700">
        Cookies are small data files stored on your device. You can choose to
        disable cookies through your browser settings. Disabling cookies may
        affect some site functionality.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Children’s Information</h2>
      <p className="mb-4 text-gray-700">
        This website does not knowingly collect any personal information from
        children under the age of 13. If you believe that a child has provided
        personal information on this website, please contact us so that we can
        remove it.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        Changes to This Policy
      </h2>
      <p className="mb-4 text-gray-700">
        This Privacy Policy may be updated from time to time. Any changes will
        be reflected on this page.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Contact</h2>
      <p className="text-gray-700">
        If you have any questions about this Privacy Policy, please reach out
        through the <strong>Contact</strong> page.
      </p>
    </div>
  );
}
