
import { useLibrary } from "../context/LibraryContext";

export default function BookCard({ book }) {

    const { toggleFavourite, isFavourite } = useLibrary();

    const liked = isFavourite(book.id);

    // Use coverUrl from normalized data, fall back to url for legacy compatibility
    const coverSrc = book.coverUrl || book.url || null;

    return (
        <div className="book-card">

            <div className="book-cover">
                <button
                    type="button"
                    className="fav-btn"
                    onClick={() => toggleFavourite(book)}
                    aria-label={
                        liked ? `Remove ${book.title} from favourites` : `Add ${book.title} to favourites`
                    }
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

                {coverSrc ? (
                    <img
                        src={coverSrc}
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
            <div className="book-author">{book.author || "Unknown author"}</div>
            {book.firstPublishYear && (
                <div className="book-year">{book.firstPublishYear}</div>
            )}

        </div>
    );
}
