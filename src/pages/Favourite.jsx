
import { useState } from "react";
import NavBar from "../layout/NavBar";
import BookCard from "../components/BookCard";
import { useLibrary } from "../context/LibraryContext";
import { Link } from "react-router-dom";

export default function Favourites() {

    const { favouriteBooks } = useLibrary();

    const [searchQuery, setSearchQuery] = useState("");

    const filteredBooks = favouriteBooks.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="fav">

            <NavBar />

            <main className="fav-container">

                <header className="fav-header">
                    <div>
                        <p className="eyebrow">YOUR COLLECTION</p>
                        <h1>Favourites</h1>
                        <p>Keep the books that mean something to you.</p>
                    </div>

                    <span className="fav-count">
                        {favouriteBooks.length} books
                    </span>
                </header>

                <div className="fav-toolbar">
                    <input
                        type="text"
                        placeholder="Search your favourites..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {filteredBooks.length === 0 ? (

                    <div className="empty-favourites">
                        <span>♡</span>

                        <h2>
                            {favouriteBooks.length === 0
                                ? "No favourites yet"
                                : "No books found"}
                        </h2>

                        <p>
                            {favouriteBooks.length === 0
                                ? "Explore your library and save the books you love."
                                : "Try another search."}
                        </p>

                        {favouriteBooks.length === 0 && (
                            <Link to="/home">
                                Explore books
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

            </main>
        </div>
    );
}
