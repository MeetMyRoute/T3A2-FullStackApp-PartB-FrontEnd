import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./NavBar.css";
import { Logo } from "./Logo";

export function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);
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
            <button
                className="navbar-toggle"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-label="Toggle Menu"
            >
                ☰
            </button>
            <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
                {navLinks.map((link) => (
                    <li key={link.path}>
                        <a href={link.path}>{link.label}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}