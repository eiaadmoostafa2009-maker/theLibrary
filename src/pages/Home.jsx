import { useState } from "react";
import BookCard from "../components/BookCard";
import NavBar from "../layout/NavBar";
import { useLibrary } from "../context/LibraryContext";

export default function Home() {

    const { books } = useLibrary();
    const [searchQuery, setSearchQuery] = useState("");

    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="home">

            <NavBar />

            <h1>Discover your library</h1>

            <input
                type="text"
                placeholder="Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="book-grid">
                {filteredBooks.map((book) => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>

        </div>
    );
}
