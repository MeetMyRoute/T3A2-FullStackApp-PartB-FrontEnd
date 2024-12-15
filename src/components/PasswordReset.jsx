import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../stylesheets/PasswordReset.css";

// const API = import.meta.env.VITE_API_URL;

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [message, setMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [step, setStep] = useState("forget");
  const [loading, setLoading] = useState(false); 

  const navigate = useNavigate();

  // Email Validation Helper
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password Validation Helper
  const isValidPassword = (password) => {
    return (
      password.length === 11 &&
      /[A-Z]/.test(password)
    );
  };

  // Handle Forget Password
  const handleForgetPassword = async () => {
    const errors = {};
    if (!email) {
      errors.email = "Email is required.";
    } else if (!isValidEmail(email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:4000/user/forgetPassword",
        { email }
      );
      setMessage(response.data.message);
      setStep("reset");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle Reset Password
  const handleResetPassword = async () => {
    const errors = {};
    if (!resetToken) {
      errors.resetToken = "Reset token is required.";
    }

    if (!newPassword) {
      errors.newPassword = "Password is required.";
    } else if (!isValidPassword(newPassword)) {
      errors.newPassword =
        "Password must be exactly 11 characters long and include at least one uppercase letter.";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    setLoading(true);

    try {
      const response = await axios.patch(
        "http://localhost:4000/user/reset-password",
        { resetToken, newPassword }
      );
      setMessage(response.data.message);

      // After a successful reset, navigate to login page immediately after success message
      setTimeout(() => {
        navigate("/login"); 
      }, 3000);

      setEmail("");
      setNewPassword("");
      setResetToken("");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>{step === "forget" ? "Forget Password" : "Reset Password"}</h1>

      {message && <p className="message">{message}</p>}

      {step === "forget" && (
        <div className="form-group">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            disabled={loading}
          />
          {validationErrors.email && (
            <p className="error">{validationErrors.email}</p>
          )}
          <button onClick={handleForgetPassword} className="button" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Email"}
          </button>
        </div>
      )}

      {step === "reset" && (
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter your reset token"
            value={resetToken}
            onChange={(e) => setResetToken(e.target.value)}
            className="input-field"
            disabled={loading}
          />
          {validationErrors.resetToken && (
            <p className="error">{validationErrors.resetToken}</p>
          )}
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="input-field"
            disabled={loading} 
          />
          {validationErrors.newPassword && (
            <p className="error">{validationErrors.newPassword}</p>
          )}
          <button onClick={handleResetPassword} className="button" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </div>
      )}
    </div>
  );
};

export { ForgetPassword }; 




