import React from "react";
import logo from "../assets/logo.png";
import "./Logo.css";

export function Logo() {
    return (
        <div className="logo">
            <img src={logo} alt="Logo" />
        </div>
    )
}