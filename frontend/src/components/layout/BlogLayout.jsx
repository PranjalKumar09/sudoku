import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function BlogLayout({
    title,
    description,
    children,
    publishDate,
    readTime = "5 min read"
}) {
    const articles = [
        { slug: "sudoku-strategies", title: "10 Expert Sudoku Strategies" },
        { slug: "sudoku-benefits", title: "Brain Benefits of Playing Sudoku" },
        { slug: "sudoku-history", title: "The History of Sudoku" },
        { slug: "sudoku-tips", title: "How to Solve Hard Puzzles" },
        { slug: "sudoku-vs-crossword", title: "Sudoku vs Crossword" },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Helmet>
                <title>{title} | Free Online Sudoku</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:type" content="article" />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        "headline": title,
                        "description": description,
                        "author": {
                            "@type": "Person",
                            "name": "Pranjal Kumar Shukla"
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": "Free Online Sudoku"
                        },
                        "datePublished": publishDate || new Date().toISOString(),
                    })}
                </script>
            </Helmet>

            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <nav className="text-sm text-gray-600 mb-6">
                    <Link to="/" className="hover:text-blue-600">Home</Link>
                    <span className="mx-2">›</span>
                    <Link to="/blog" className="hover:text-blue-600">Blog</Link>
                    <span className="mx-2">›</span>
                    <span className="text-gray-900">{title}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <article className="lg:col-span-2 bg-white rounded-lg shadow-md p-8">
                        <header className="mb-6">
                            <h1 className="text-4xl font-bold text-gray-900 mb-3">{title}</h1>
                            <div className="flex items-center text-sm text-gray-600 gap-4">
                                <span>📅 {publishDate || new Date().toLocaleDateString()}</span>
                                <span>⏱️ {readTime}</span>
                            </div>
                        </header>

                        <div className="prose prose-lg max-w-none">
                            {children}
                        </div>

                        {/* Call to Action */}
                        <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                            <h3 className="text-xl font-bold text-blue-900 mb-2">
                                Ready to Practice?
                            </h3>
                            <p className="text-blue-700 mb-4">
                                Apply these strategies in our free online Sudoku game!
                            </p>
                            <Link
                                to="/"
                                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                Play Now
                            </Link>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">
                                Related Articles
                            </h3>
                            <ul className="space-y-3">
                                {articles.map((article) => (
                                    <li key={article.slug}>
                                        <Link
                                            to={`/blog/${article.slug}`}
                                            className="text-blue-600 hover:text-blue-800 hover:underline"
                                        >
                                            {article.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <h3 className="font-bold text-gray-900 mb-3">Quick Links</h3>
                                <ul className="space-y-2 text-sm">
                                    <li>
                                        <Link to="/how-to-play" className="text-gray-600 hover:text-blue-600">
                                            How to Play
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/daily" className="text-gray-600 hover:text-blue-600">
                                            Daily Puzzle
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/about" className="text-gray-600 hover:text-blue-600">
                                            About Us
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
