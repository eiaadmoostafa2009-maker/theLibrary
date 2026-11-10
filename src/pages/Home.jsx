import { useCallback, useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import NavBar from "../layout/NavBar";
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
        <div className="home">

            <NavBar />

            <h1>Discover your library</h1>

            <div className="search-form">
                <form onSubmit={handleSubmit}>
                  <input
                     type="text"
                     placeholder="1984"
                     value={ searchQuery }
                     onChange={ (e) => {setSearchQuery(e.target.value)} }
                  />
                  <button type="submit">
                    {loading ? "Searching..." : "Search"}
                  </button>
               </form>
               {error && <p className="error">{error}</p>}
            </div>

            {loading ? <p className="loading-message">Loading...</p>
            :
            <div className="book-grid">
                {filteredBooks.map((book) => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>
            }

        </div>
    );
}
