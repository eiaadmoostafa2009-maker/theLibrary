
import { useState } from "react";
import BookCard from "../components/BookCard";
import { useLibrary } from "../context/LibraryContext";
import { Link } from "react-router-dom";

export default function Favourites() {

    const { favourites = [] } = useLibrary();

    const [searchQuery, setSearchQuery] = useState("");

    const filteredBooks = favourites.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="fav-page">
            <div className="page-content">

                <header className="fav-header">
                    <div>
                        <p className="fav-eyebrow">Your Collection</p>
                        <h1 className="fav-title">Favourites</h1>
                        <p className="fav-subtitle">
                            The books that mean something to you.
                        </p>
                    </div>

                    <span className="fav-count">
                        {favourites.length} {favourites.length === 1 ? "book" : "books"}
                    </span>
                </header>

                {favourites.length > 0 && (
                    <div className="fav-toolbar">
                        <input
                            type="text"
                            placeholder="Search your favourites…"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            aria-label="Search favourites"
                        />
                    </div>
                )}

                {filteredBooks.length === 0 ? (

                    <div className="empty-favourites">
                        <span className="empty-heart" aria-hidden="true">♡</span>

                        <h2>
                            {favourites.length === 0
                                ? "No favourites yet"
                                : "No books found"}
                        </h2>

                        <p>
                            {favourites.length === 0
                                ? "Explore the library and save the books you love."
                                : "Try another search term."}
                        </p>

                        {favourites.length === 0 && (
                            <Link to="/home" className="explore-link">
                                Explore Books
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                </svg>
                            </Link>
                        )}
                    </div>

                ) : (

                    <section className="book-grid">
                        {filteredBooks.map((book) => (
                            <BookCard
                                key={book.id}
                                book={book}
                            />
                        ))}
                    </section>

                )}

            </div>
        </div>
    );
}
