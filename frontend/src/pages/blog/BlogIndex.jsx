import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function BlogIndex() {
    const articles = [
        {
            slug: "sudoku-strategies",
            title: "10 Expert Sudoku Strategies for Beginners to Advanced Players",
            description:
                "Master Sudoku with these 10 proven strategies. Learn techniques from naked singles to X-Wing patterns.",
            date: "2026-01-15",
            readTime: "8 min",
            category: "Strategy",
        },
        {
            slug: "sudoku-benefits",
            title: "5 Surprising Brain Benefits of Playing Sudoku Daily",
            description:
                "Discover the scientifically-proven brain benefits of playing Sudoku daily. Improve memory and concentration.",
            date: "2026-01-16",
            readTime: "6 min",
            category: "Health",
        },
        {
            slug: "sudoku-history",
            title: "The Fascinating History of Sudoku: From Ancient Puzzles to Global Phenomenon",
            description:
                "Discover the rich history of Sudoku, from its ancient mathematical roots to becoming the world's most popular logic puzzle.",
            date: "2026-01-14",
            readTime: "7 min",
            category: "History",
        },
        {
            slug: "sudoku-tips",
            title: "How to Solve Hard Sudoku Puzzles: Expert Tips and Techniques",
            description:
                "Stuck on hard Sudoku puzzles? Learn expert tips and advanced techniques to crack extreme-level challenges.",
            date: "2026-01-17",
            readTime: "7 min",
            category: "Tips",
        },
        {
            slug: "sudoku-vs-crossword",
            title: "Sudoku vs Crossword: Which Puzzle is Better for Your Brain?",
            description:
                "Compare Sudoku and Crossword puzzles to find which is better for cognitive health and brain training.",
            date: "2026-01-18",
            readTime: "6 min",
            category: "Comparison",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Helmet>
                <title>Sudoku Blog - Tips, Strategies, and Brain Benefits | Free Online Sudoku</title>
                <meta
                    name="description"
                    content="Expert Sudoku tips, strategies, history, and brain benefits. Learn how to solve hard puzzles and improve your Sudoku skills."
                />
            </Helmet>

            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Header */}
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Sudoku Blog
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Expert tips, strategies, history, and the science behind Sudoku's brain benefits
                    </p>
                </header>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((article) => (
                        <article
                            key={article.slug}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                                        {article.category}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        {article.readTime}
                                    </span>
                                </div>

                                <h2 className="text-xl font-bold text-gray-900 mb-3">
                                    <Link
                                        to={`/blog/${article.slug}`}
                                        className="hover:text-blue-600 transition-colors"
                                    >
                                        {article.title}
                                    </Link>
                                </h2>

                                <p className="text-gray-600 mb-4 line-clamp-3">
                                    {article.description}
                                </p>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">{article.date}</span>
                                    <Link
                                        to={`/blog/${article.slug}`}
                                        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                                    >
                                        Read More →
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
                    <h2 className="text-3xl font-bold mb-4">
                        Ready to Practice What You've Learned?
                    </h2>
                    <p className="text-xl mb-6 opacity-90">
                        Apply these strategies in our free online Sudoku game
                    </p>
                    <Link
                        to="/"
                        className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        Play Sudoku Now
                    </Link>
                </div>
            </div>
        </div>
    );
}
