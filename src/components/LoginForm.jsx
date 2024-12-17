import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/UserContext"; 
import '../stylesheets/LoginForm.css';

// const API = import.meta.env.API_URL;  

export function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const requestBody = { 
        email: email, 
        password: password
      };

      const response = await axios.post("http://localhost:4000/user/login", requestBody); 
      // const response = await axios.post(`${API}user/login`, requestBody);

      const { token, userId, userData } = response.data;

      login({ token, userId, ...userData });

      setErrorMessage(""); 
      
      navigate(`/profile/${userId}`);

    } catch (error) {
      console.error("Login failed:", error);
      if (error.response && error.response.status === 404) {
        setErrorMessage("Sorry, no user found with this email. Please check your login details."); 
      } else if (error.response && error.response.status === 401) {
        setErrorMessage("Incorrect password. Please try again.")
      } else {
        setErrorMessage("Something went wrong. Please try again later.")
      }
    }
  }

return (
  <div className="login-main">
    <div className="login-center">
      <h2>Hi!</h2>
      <p>Please enter your details to sign in.</p>

      {errorMessage && <div className="error-message">{errorMessage}</div>}
      
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
                Don&#39;t have an account? <Link to="/signup">Sign Up!</Link>
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