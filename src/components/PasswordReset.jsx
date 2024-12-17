import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../stylesheets/PasswordReset.css";

// const API = import.meta.env.API_URL;

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
      password.length >= 11 &&
      /\d/.test(password) 
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
      // try {
      //   const response = await axios.post(
      //     `${API}user/forgetPassword`,
      //     { email }
      //   );

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
        "Password must be at least 11 characters long and include at least one numeral."
    };

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    setLoading(true);

    // try {
    //   const response = await axios.patch(
    //     `${API}user/reset-password`,
    //     { resetToken, newPassword }
    //   );
    
    try {
      const response = await axios.patch(
        "http://localhost:4000/user/reset-password",
        { resetToken, newPassword }
      );
      setMessage(response.data.message);

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
    <div className="forget-reset-page">
      <h1>{step === "forget" ? "Forget Password?" : "Reset Password"}</h1>

      {step === "forget" && (
        <p className="instruction-text">
          Enter your email address, and we&apos;ll send you a reset token to help you set a new password.
        </p>
      )}

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




