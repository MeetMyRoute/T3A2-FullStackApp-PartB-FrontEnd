import React from "react";
import logo from "../assets/logo.png";
import "./Logo.css";
import { Link } from "react-router-dom";

export function Logo() {
    return (
        <div className="logo">
            <Link to="/">
                <img
                    src={logo}
                    alt="Logo"
                    className="logo-image"
                />
            </Link>
        </div>
    )
}