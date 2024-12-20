import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Logo } from "./Logo";
import "../stylesheets/NavBar.css";

export function NavBar() {
    // Track the menu's open state
    const [menuOpen, setMenuOpen] = useState(false);
    // Access the current route
    const location = useLocation();

    // Get the logged in user userId
    const loggedInUserId = localStorage.getItem("userId");
    
    // Get the userId from URL parameters 
    const userId = useParams();

    // Toggle the menu open/close state
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    // Close the menu
    const closeMenu = () => {
        setMenuOpen(false);
    }

    // Close the menu when clicking outside the nav bar
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

    // Define navigation links based on the current route
    const renderNavLinks = () => {
        if (location.pathname.startsWith("/profile/")) {
            return (
                <ul className="navbar-links">
                <li><Link to={`/profile/${loggedInUserId}`} onClick={closeMenu}>Profile</Link></li>
                <li><Link to="/itinerary" onClick={closeMenu}>Itinerary</Link></li>
                <li><Link to="/search" onClick={closeMenu}>Search</Link></li>
                <li><Link to="/connects" onClick={closeMenu}>Connects</Link></li>
                <li><Link to="/" onClick={closeMenu}>Logout</Link></li>
            </ul>
            )
        }

        switch (location.pathname) {
            case "/login":
                return (
                    <ul className="navbar-links">
                        <li><Link to="/signup" onClick={closeMenu}>Sign Up</Link></li>
                    </ul>
                )
            case "/signup":
                return (
                    <ul className="navbar-links">
                        <li><Link to="/login" onClick={closeMenu}>Login</Link></li>
                    </ul>
                )
            case "/itinerary":
            case "/search":
            case "/connects":
                return (
                    <ul className="navbar-links">
                        <li><Link to={`/profile/${loggedInUserId}`} onClick={closeMenu}>Profile</Link></li>
                        <li><Link to="/itinerary" onClick={closeMenu}>Itinerary</Link></li>
                        <li><Link to="/search" onClick={closeMenu}>Search</Link></li>
                        <li><Link to="/connects" onClick={closeMenu}>Connects</Link></li>
                        <li><Link to="/" onClick={closeMenu}>Logout</Link></li>
                    </ul>
                )
            default:
                return null;
        }
    }

    return (
        <nav className="navbar">
            <Logo onClick={closeMenu} />

            {/* Hamburger icon for smaller screens*/}
            {location.pathname !== "/" && (
                <button className="navbar-toggle" onClick={toggleMenu} aria-label="Toggle menu">
                    <span className="hamburger">☰</span>
                </button>
            )}

            {/* Menu links */}
            <div className={`navbar-menu ${menuOpen ? "open" : ""}`}>
                {renderNavLinks()}
            </div>
        </nav>
    )
}