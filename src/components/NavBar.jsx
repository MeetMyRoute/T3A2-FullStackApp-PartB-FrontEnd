import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavBar.css";
import { Logo } from "./Logo";

export function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    // Get the current route
    const location = useLocation();

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
        case "/profile":
        case "/itinerary":
        case "/search":
        case "/messages":
            navLinks = (
                <ul className="navbar-links">
                    <li><Link to="/profile" onClick={closeMenu}>Profile</Link></li>
                    <li><Link to="/itinerary" onClick={closeMenu}>Itinerary</Link></li>
                    <li><Link to="/search" onClick={closeMenu}>Search</Link></li>
                    <li><Link to="/messages" onClick={closeMenu}>Messages</Link></li>
                    <li><Link to="/logout" onClick={closeMenu}>Logout</Link></li>
                </ul>
            )
            break;
        default:
            navLinks = null;
            break;
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