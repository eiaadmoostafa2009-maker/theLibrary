import { useState } from "react"

export default function BookCard({book}){
    const [Liked, setLiked] = useState(false);

    return(
        <div className="book-card">
            <div className="book-poster">
                <img src={book.url} alt={book.title}/>
            </div>

            <div className="book-name">
                <h2>{book.title}</h2>
            </div>
            <div className="like-btn">
                <button onClick={ () => { setLiked(!Liked) }}>{Liked ? '❤️' : '🤍' }</button>
            </div>

            <div className="book-info">
                <h4>{book.author}</h4>
                <h4>{book.release_date}</h4>
            </div>
        </div>
    )
}