import { Link } from "react-router-dom";

export default function NavBar(){
    return (
        <nav className="nav-bar">
            <div className="logo">
                RoseLibrary
            </div>
            
            <div className="nav-links">
                <Link to="/home" className="nav-link">Home</Link>
                <Link to="/fav" className="nav-link">Favourites</Link>
                <Link to="/login">SignIn</Link>
            </div>
        </nav>
    )
}