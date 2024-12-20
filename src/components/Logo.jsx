import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import "../stylesheets/Logo.css";

export function Logo({onClick}) {
    return (
        <div className="logo" onClick={onClick}>
            <Link to="/">
                <img src={logo} alt="Logo" className="logo-image" />
            </Link>
        </div>
    )
}