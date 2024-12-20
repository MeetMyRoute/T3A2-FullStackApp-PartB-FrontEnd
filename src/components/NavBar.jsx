import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Logo } from "./Logo";
import "../stylesheets/NavBar.css";

export function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    // Get the current route
    const location = useLocation();

    // Get the logged in user userId
    const loggedInUserId = localStorage.getItem("userId");
    
    // Get the userId from URL parameters 
    const userId = useParams();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    const closeMenu = () => {
        setMenuOpen(false);
    }

    // Close menu when clicking outside the navbar
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".navbar")) {
                closeMenu();
            }
        }

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        }
    }, []);

    // Define links based on page location
    let navLinks = null;

    switch (location.pathname) {
        case "/login":
            navLinks = (
                <ul className="navbar-links">
                    <li><Link to="/signup" onClick={closeMenu}>Sign Up</Link></li>
                </ul>
            )
            break;
        case "/signup":
            navLinks = (
                <ul className="navbar-links">
                    <li><Link to="/login" onClick={closeMenu}>Login</Link></li>
                </ul>
            )
            break;
        case "/itinerary":
        case "/search":
        case "/connects":
            navLinks = (
                <ul className="navbar-links">
                    <li><Link to={`/profile/${loggedInUserId}`} onClick={closeMenu}>Profile</Link></li>
                    <li><Link to="/itinerary" onClick={closeMenu}>Itinerary</Link></li>
                    <li><Link to="/search" onClick={closeMenu}>Search</Link></li>
                    <li><Link to="/connects" onClick={closeMenu}>Connects</Link></li>
                    <li><Link to="/" onClick={closeMenu}>Logout</Link></li>
                </ul>
            )
            break;
        default:
            navLinks = null;
            break;
    }

    if (location.pathname.startsWith(`/profile/`)) {
        navLinks = (
            <ul className="navbar-links">
                <li><Link to={`/profile/${loggedInUserId}`} onClick={closeMenu}>Profile</Link></li>
                <li><Link to="/itinerary" onClick={closeMenu}>Itinerary</Link></li>
                <li><Link to="/search" onClick={closeMenu}>Search</Link></li>
                <li><Link to="/connects" onClick={closeMenu}>Connects</Link></li>
                <li><Link to="/" onClick={closeMenu}>Logout</Link></li>
            </ul>
        );
    }

    return (
        <nav className="navbar">
            <Logo onClick={closeMenu} />

            {/* Hamburger icon */}
            {location.pathname !== "/" && (
                <button className="navbar-toggle" onClick={toggleMenu} aria-label="Toggle menu">
                    <span className="hamburger">☰</span>
                </button>
            )}

            {/* Menu links */}
            <div className={`navbar-menu ${menuOpen ? "open" : ""}`}>{navLinks}</div>
        </nav>
    )
}