import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import '../stylesheets/SignUpForm.css';

const API = import.meta.env.VITE_API_URL;  

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
        profilePic: null,
    });

    const [error, setError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();

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
        const passwordRegex = /^(?=.*\d).{11,}$/;
        if (!passwordRegex.test(formData.password)) {
            setPasswordError("Password must be at least 11 characters long and contain at least one numeral.");
            return;
        }

        setError("");
        setPasswordError("");    

        // Ensure socialMediaLink has protocol
        if (formData.socialMediaLink && !/^https?:\/\//.test(formData.socialMediaLink)) {
            setError("Social media link must start with http:// or https://");
            return;
        }

        setError("");

        try {
            // Create FormData to send both file and text
            const data = new FormData();
            data.append("name", formData.name);
            data.append("email", formData.email);
            data.append("password", formData.password);
            data.append("status", formData.status);
            data.append("location", formData.location);
            data.append("travelPreferencesAndGoals", formData.travelPreferencesAndGoals);
            data.append("socialMediaLink", formData.socialMediaLink);
            data.append("isAdmin", formData.isAdmin);
            if (formData.profilePic) {
                data.append("profilePic", formData.profilePic);
            }
    
            // Send FormData to the backend
            // const response = await axios.post("http://localhost:4000/user/", data, {
            //     headers: {
            //         "Content-Type": "multipart/form-data", 
            //     },
            // });

            const response = await axios.post(`${API}/user/`, data, {
                headers: {
                    "Content-Type": "multipart/form-data", 
                },
            });
    
            if (response.status === 201) {
                alert("Registration successful");
                navigate(`/login`);
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
        <div className="signup-form">
            <h2>Create an Account</h2>
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
                        <option value="Travelling">Travelling</option>
                        <option value="Local">Local</option>
                        <option value="Private">Private</option>
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
                    />
                </div>
                <div>
                    <label htmlFor="travelPreferencesAndGoals">Travel Preferences and Goals:</label>
                    <textarea
                        id="travelPreferencesAndGoals"
                        name="travelPreferencesAndGoals"
                        value={formData.travelPreferencesAndGoals}
                        onChange={handleChange}
                        placeholder="Tell us about your travel preferences and goals – give others a glimpse into your adventure plans!"
                    />
                </div>
                <div>
                    <label htmlFor="profilePicture">Profile Picture:</label>
                    <input
                        type="file"
                        id="profilePicture"
                        name="profilePicture"
                        accept="image/*" 
                        onChange={(e) => setFormData({ ...formData, profilePicture: e.target.files[0] })} />
                </div>
                <div>
                    <label htmlFor="socialMediaLink">Social Media Link:</label>
                    <input
                        type="text"
                        id="socialMediaLink"
                        name="socialMediaLink"
                        value={formData.socialMediaLink}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Sign Up</button>
                <p className="login-bottom-p">
                    Already have an account? <Link to="/login" className="login-link">Login</Link>
                </p>
            </form>
        </div>
    );
};

