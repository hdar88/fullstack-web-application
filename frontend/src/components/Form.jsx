import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";
import Loader from "./Loader";

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";

  // strong password policy
  const validatePasswordStrength = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (method === "register" && !validatePasswordStrength(password)) {
      setError(
        "Oops! Your password must be at least 8 characters long, include one uppercase and one lowercase letter, one number, one special character."
      );
      setLoading(false);
      return;
    }

    try {
      const res = await api.post(route, { username, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      // Log the entire error response for debugging purposes
      console.log("Error response:", error.response);

      if (error.response) {
        if (method === "login") {
          if (error.response.status === 400) {
            setError("Oops! No username/password provided.");
          } else if (error.response.status === 401) {
            setError("Oops! Wrong password or username!");
          }
          // Check for specific status codes and set appropriate messages
        } else if (method === "register") {
          if (error.response.status === 400) {
            const errorMessage =
              error.response.data?.username?.[0] ||
              error.response.data?.password?.[0];

            if (errorMessage === "This field may not be blank.") {
              setError("Oops! No username/password provided.");
            } else if (
              errorMessage === "A user with that username already exists."
            ) {
              setError("Oops! This username already exists.");
            } else {
              setError("Oops! Please try again later.");
            }
          }
        }
      } else {
        // Handle network or other unknown errors
        setError("Network error. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="full-page-wrapper">
      <form onSubmit={handleSubmit} className="form-container">
        <h1 className="main-form-header">{name}</h1>
        <input
          className="main-form-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          className="main-form-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        {loading && <Loader />}
        <button className="form-button" type="submit">
          <span className="form-button-span">{name}</span>
        </button>
        {error && <div className="error-message">{error}</div>}

        {method === "login" ? (
          <>
            <div className="redirect-to-div">
              <span className="span">No account yet?</span>
              <button
                className="redirect-to-register"
                onClick={() => navigate("/register")}
              >
                <span className="redirect-to-span">Register here</span>
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="redirect-to-div">
              <span className="span">Already have an account?</span>
              <button
                className="redirect-to-login"
                onClick={() => navigate("/login")}
              >
                <span className="redirect-to-span">Login</span>
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default Form;
