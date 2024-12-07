import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./NavBar.css";
import { Logo } from "./Logo";

export function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    const location = useLocation();

    // Define links based on page location
    const getNavLinks = () => {
        switch (location.pathname) {
            case "/":
                return [
                    {path: "/login", label: "Login"},
                    {path: "/signup", label: "Sign Up"}
                ]
            case "/login":
                return [
                    {path: "/signup", label: "Sign Up"}
                ]
            case "/signup":
                return [
                    {path: "/login", label: "Login"}
                ]
            default:
                return [
                    {path: "/profile", label: "Profile"},
                    {path: "/itinerary", label: "Itinerary"},
                    {path: "/Search", label: "Search"},
                    {path: "/messages", label: "Messages"},
                    {path: "/logout", label: "Logout"}
                ]
        }
    }

    const navLinks = getNavLinks();

    return (
        <nav className="navbar">
            <Logo />

            {/* Hamburger icon */}
            <button
                className="navbar-toggle"
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                <span className="hamburger">☰</span>
            </button>

            {/* Menu links */}
            <div className={`navbar-menu ${menuOpen ? "open" : ""}`}>
                <ul className="navbar-links">
                    {navLinks.map((link) => (
                        <li key={link.path}>
                            <a href={link.path}>{link.label}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}