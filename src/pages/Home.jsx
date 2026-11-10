import { useCallback, useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import { bookService } from "../service/openLibraryService";

export default function Home() {
    //results from api request
    const [books, setBooks] = useState([]);
    const [total, setTotal] = useState(0);
    //search query
    const [searchQuery, setSearchQuery] = useState("");
    //loading and errors
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const loadBooks = useCallback(async (query) => {
       if (!query.trim()){
        setBooks([]);
        setTotal(0);
        return
       } 
       
       setLoading(true); 
       setError(null);

       try{
          const result = await bookService.searchBooks(query);
          setBooks(result.books);
          setTotal(result.total)
       }catch(err){
          console.error("Failed to load books:", err);
          setError(err.message);
       }finally{
        setLoading(false);
       }
    },[]);

    useEffect(() => {
        loadBooks("fiction");
    },[loadBooks]);

    async function handleSubmit(e){
        e.preventDefault();
        await loadBooks(searchQuery);
    }

    return (
        <div className="home-page">
            <div className="page-content">

                <div className="page-header">
                    <h1 className="page-title">Discover</h1>
                    <p className="page-subtitle">
                        Search the world's largest open book catalogue
                    </p>
                </div>

                <div className="search-form">
                    <form onSubmit={handleSubmit}>
                      <span className="search-icon" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="11" cy="11" r="8" />
                          <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                      </span>
                      <input
                         type="text"
                         placeholder="Search by title, author, or keyword…"
                         value={ searchQuery }
                         onChange={ (e) => {setSearchQuery(e.target.value)} }
                         aria-label="Search books"
                      />
                      <button type="submit">
                        {loading ? "Searching…" : "Search"}
                      </button>
                   </form>
                   {error && <p className="error">{error}</p>}
                </div>

                {!loading && total > 0 && (
                    <p className="results-count">
                        Showing {filteredBooks.length} of {total.toLocaleString()} results
                    </p>
                )}

                {loading ? (
                    <p className="loading-message">Finding books…</p>
                ) : filteredBooks.length > 0 ? (
                    <div className="book-grid">
                        {filteredBooks.map((book) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                ) : !loading && books.length === 0 && searchQuery ? (
                    <div className="empty-state">
                        <p>No books found. Try a different search term.</p>
                    </div>
                ) : null}

            </div>
        </div>
    );
}
