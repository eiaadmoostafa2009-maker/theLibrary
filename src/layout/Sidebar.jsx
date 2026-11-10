import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
    const location = useLocation();

    const navItems = [
        {
            to: "/home",
            label: "Home",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
            ),
        },
        {
            to: "/fav",
            label: "Favourites",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
            ),
        },
    ];

    return (
        <>
            {/* Desktop sidebar */}
            <aside className="sidebar" role="navigation" aria-label="Main navigation">
                <div className="sidebar-logo">
                    <Link to="/">The Library</Link>
                </div>

                <nav className="sidebar-nav">
                    {navItems.map((item) => (
                        <Link
                            key={item.to}
                            to={item.to}
                            className={`sidebar-link${location.pathname === item.to ? " active" : ""}`}
                            aria-current={location.pathname === item.to ? "page" : undefined}
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <Link to="/login" className="sidebar-footer-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                            <polyline points="10 17 15 12 10 7" />
                            <line x1="15" y1="12" x2="3" y2="12" />
                        </svg>
                        Sign In
                    </Link>
                </div>
            </aside>

            {/* Mobile bottom navigation */}
            <nav className="bottom-nav" aria-label="Main navigation">
                {navItems.map((item) => (
                    <Link
                        key={item.to}
                        to={item.to}
                        className={`bottom-nav-link${location.pathname === item.to ? " active" : ""}`}
                        aria-current={location.pathname === item.to ? "page" : undefined}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </Link>
                ))}
                <Link
                    to="/login"
                    className={`bottom-nav-link${location.pathname === "/login" ? " active" : ""}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                    <span>Account</span>
                </Link>
            </nav>
        </>
    );
}
