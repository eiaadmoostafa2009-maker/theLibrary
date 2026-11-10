
import { useLibrary } from "../context/LibraryContext";

export default function BookCard({ book }) {

    const { toggleFavourite, isFavourite } = useLibrary();

    const liked = isFavourite(book.id);

    return (
        <div className="book-card">

            <div className="book-poster">
                <img
                    src={book.url || "/placeholder-book.png"}
                    alt={book.title}
                />
            </div>

            <div className="book-name">
                <h2>{book.title}</h2>
            </div>

            <div className="like-btn">
                <button
                    type="button"
                    onClick={() => toggleFavourite(book.id)}
                    aria-label={
                        liked ? "Remove from favourites" : "Add to favourites"
                    }
                >
                    {liked ? "❤️" : "🤍"}
                </button>
            </div>

            <div className="book-info">
                <h4>{book.author}</h4>
                <h4>{book.release_date}</h4>
            </div>

        </div>
    );
}
