import { useEffect, useState } from "react"
import BookCard from "../components/BookCard";
import NavBar from "../layout/NavBar"
export default function Home(){
     const books = [
        {
            id: 1,
            title: "1984",
            author: "George Orwell",
            release_date: "1948"
        },
        {
            id: 2,
            title: "Achilles",
            author: "Homer",
            release_date: "56"
        },
        {
            id: 3,
            title: "Example Book",
            author: "Example Author",
            release_date: "657"
        },
    ];
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false); //set true after connecting the api
    const [error, setError] = useState(null); 

    useEffect( () => {
        //getting the books from the backend
    }, [])

    const filteredBooks = books.filter((book) => {
        return book.title.toLowerCase().includes(searchQuery.toLowerCase());
     });
    
    function handleSubmit(){
        if (!searchQuery.trim()) return
        if(loading) return

        //getting search results from the backend
    }

    return(
        <div className="home">
            <NavBar />
            <div className="search-bar">
                <form onSubmit={ handleSubmit } className="search-form">
                    <input 
                        type="text"
                        placeholder="1984"
                        value={ searchQuery }
                        onChange={ (e) => {
                            setSearchQuery(e.target.value)
                        }}
                    />
                    <button type="submit" className="search-btn">Search</button>
                </form>
            </div>
            { error && <p className="error">{ error }</p>}

            
            
            { loading ? <p>Loading...</p> : (
                <div className="book-grid">
                    {filteredBooks.map((book) => (
                        <BookCard key={book.id} book={book} />
                    ))}
                </div>
            )}
            
            
            
        </div>
    )
}