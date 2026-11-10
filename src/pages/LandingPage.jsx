import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { bookService } from "../service/openLibraryService";
import { useLibrary } from "../context/LibraryContext";

export default function LandingPage() {
    const [featuredBooks, setFeaturedBooks] = useState([]);
    const [popularBooks, setPopularBooks] = useState([]);
    const [recentBooks, setRecentBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const { toggleFavourite, isFavourite } = useLibrary();

    const loadCollections = useCallback(async () => {
        setLoading(true);
        try {
            const [editorResult, popularResult, recentResult] = await Promise.allSettled([
                bookService.searchBooks("literature classics", { limit: 5 }),
                bookService.searchBooks("bestseller fiction", { limit: 5 }),
                bookService.searchBooks("new novel 2024", { limit: 5 }),
            ]);

            if (editorResult.status === "fulfilled") {
                setFeaturedBooks(editorResult.value.books);
            }
            if (popularResult.status === "fulfilled") {
                setPopularBooks(popularResult.value.books);
            }
            if (recentResult.status === "fulfilled") {
                setRecentBooks(recentResult.value.books);
            }
        } catch (err) {
            console.error("Failed to load collections:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadCollections();
    }, [loadCollections]);

    const heroBook = featuredBooks[0] || null;

    return (
        <div className="landing-layout">
            {/* Top navigation for landing */}
            <nav className="landing-nav">
                <Link to="/" className="landing-nav-logo">The Library</Link>
                <div className="landing-nav-links">
                    <Link to="/home" className="landing-nav-link">Browse</Link>
                    <Link to="/fav" className="landing-nav-link">Favourites</Link>
                    <Link to="/login" className="landing-nav-link landing-nav-link--cta">Sign In</Link>
                </div>
            </nav>

            {/* Hero */}
            <section className="landing-hero">
                <div className="landing-hero-text">
                    <p className="landing-hero-eyebrow">Your Personal Library</p>
                    <h1 className="landing-hero-title">
                        Every book tells a story. Yours starts here.
                    </h1>
                    <p className="landing-hero-description">
                        Discover, collect, and curate your favourite reads.
                        A quiet corner of the internet for book lovers.
                    </p>
                    <Link to="/home" className="landing-hero-cta">
                        Start Exploring
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    </Link>
                </div>

                {heroBook && (
                    <div className="landing-hero-book">
                        {heroBook.coverUrl ? (
                            <img
                                className="landing-hero-cover"
                                src={heroBook.coverUrl.replace("-M.jpg", "-L.jpg")}
                                alt={`Cover of ${heroBook.title}`}
                            />
                        ) : (
                            <div className="landing-hero-cover-placeholder">
                                📖
                            </div>
                        )}
                        <div className="landing-hero-book-info">
                            <div className="landing-hero-book-title">{heroBook.title}</div>
                            <div className="landing-hero-book-author">{heroBook.author}</div>
                        </div>
                    </div>
                )}
            </section>

            {/* Collections */}
            {loading ? (
                <div className="landing-loading">Curating your collection…</div>
            ) : (
                <div className="landing-collections">
                    {featuredBooks.length > 0 && (
                        <LandingSection
                            title="Editor's Picks"
                            books={featuredBooks}
                            isFavourite={isFavourite}
                            toggleFavourite={toggleFavourite}
                        />
                    )}
                    {popularBooks.length > 0 && (
                        <LandingSection
                            title="Popular Reads"
                            books={popularBooks}
                            isFavourite={isFavourite}
                            toggleFavourite={toggleFavourite}
                        />
                    )}
                    {recentBooks.length > 0 && (
                        <LandingSection
                            title="Recently Added"
                            books={recentBooks}
                            isFavourite={isFavourite}
                            toggleFavourite={toggleFavourite}
                        />
                    )}
                </div>
            )}
        </div>
    );
}


function LandingSection({ title, books, isFavourite, toggleFavourite }) {
    return (
        <section className="landing-section">
            <div className="landing-section-header">
                <h2 className="landing-section-title">{title}</h2>
                <Link to="/home" className="landing-section-link">View all →</Link>
            </div>
            <div className="landing-book-row">
                {books.map((book) => (
                    <LandingBookCard
                        key={book.id}
                        book={book}
                        isFavourite={isFavourite}
                        toggleFavourite={toggleFavourite}
                    />
                ))}
            </div>
        </section>
    );
}


function LandingBookCard({ book, isFavourite, toggleFavourite }) {
    const liked = isFavourite(book.id);

    return (
        <div className="book-card">
            <div className="book-cover">
                <button
                    type="button"
                    className="fav-btn"
                    onClick={() => toggleFavourite(book)}
                    aria-label={liked ? `Remove ${book.title} from favourites` : `Add ${book.title} to favourites`}
                    aria-pressed={liked}
                >
                    {liked ? (
                        <svg className="heart-filled" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                    ) : (
                        <svg className="heart-empty" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                    )}
                </button>

                {book.coverUrl ? (
                    <img
                        src={book.coverUrl}
                        alt={`Cover of ${book.title}`}
                        loading="lazy"
                    />
                ) : (
                    <div className="cover-placeholder">
                        <span>{book.title}</span>
                    </div>
                )}
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-author">{book.author}</div>
            {book.firstPublishYear && (
                <div className="book-year">{book.firstPublishYear}</div>
            )}
        </div>
    );
}
