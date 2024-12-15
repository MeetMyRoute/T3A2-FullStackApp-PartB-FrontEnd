import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import '../stylesheets/LoginForm.css';

// const API = import.meta.env.VITE_API_URL;  

export function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const requestBody = { email, password };
      const response = await axios.post("http://localhost:4000/user/login", requestBody); 

      // If login is successful, store the token
      const { token } = response.data;
      localStorage.setItem('authToken', token);
      
      navigate("/itinerary");
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

return (
  <div className="login-main">
    <div className="login-center">
      <h2>Hi!</h2>
      <p>Please enter your details to sign in.</p>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label"></label>
          <input 
            type="email" 
            className="form-control" 
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label"></label>
          <div className="pass-input-div">
            <input 
              type="password"
              className="form-control" 
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="pass-links">
              <p className="forgot-pass-p">
                <Link to="/forgot-password">Forgot your password?</Link>
              </p>
              <p className="login-bottom-p">
                Don&#39;t have an account? <Link to="/register">Sign Up!</Link>
              </p>
            </div>
          </div>
        </div>
        <div className="login-center-buttons">
          <button type="submit">Log In</button>
        </div>
      </form>
    </div>
  </div>
);
} 