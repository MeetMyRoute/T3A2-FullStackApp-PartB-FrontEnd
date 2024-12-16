import React, { useState } from "react";
import axios from "axios";

export const SignUpForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        status: "",
        location: "",
        travelPreferencesAndGoals: "",
        socialMediaLink: "",
        isAdmin: false,
    });

    const [error, setError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password || !formData.status || !formData.location || !formData.travelPreferencesAndGoals || !formData.socialMediaLink) {
            setError("Please fill in all fields");
            return;
        }

        // Validate password
        const passwordRegex = /^(?=.*[A-Z]).{11,}$/;
        if (!passwordRegex.test(formData.password)) {
            setPasswordError("Password must have at least one capital letter and be 11 characters long.");
            return;
        }

        setError("");
        setPasswordError("");

        try {
          const response = await axios.post("http://localhost:4000/user", formData);
          
          if (response.status === 200) {
              alert("Registration successful");
          }
      } catch (err) {
          if (err.response) {
              setError(err.response.data.message || "Registration failed.");
          } else {
              setError("An error occurred. Please try again.");
          }
      }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                {error && <div className="error">{error}</div>}
                <div>
                    <label htmlFor="name">Full Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="First and Last Name"
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                    />
                    {passwordError && <div className="error">{passwordError}</div>}
                </div>
                <div>
                    <label htmlFor="status">Status:</label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="">Select status</option>
                        <option value="traveling">Traveling</option>
                        <option value="local">Local</option>
                        <option value="private">Private</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="location">Location:</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Enter your location"
                    />
                </div>
                <div>
                    <label htmlFor="travelPreferencesAndGoals">Travel Preferences and Goals:</label>
                    <textarea
                        id="travelPreferencesAndGoals"
                        name="travelPreferencesAndGoals"
                        value={formData.travelPreferencesAndGoals}
                        onChange={handleChange}
                        placeholder="Describe your travel preferences and goals"
                    />
                </div>
                <div>
                    <label htmlFor="socialMediaLink">Social Media Link:</label>
                    <input
                        type="text"
                        id="socialMediaLink"
                        name="socialMediaLink"
                        value={formData.socialMediaLink}
                        onChange={handleChange}
                        placeholder="Enter your social media link"
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

