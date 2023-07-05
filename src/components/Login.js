import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import styles from "../login.module.css";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!password || !email) {
      setErrorMessage("Please fill empty fields.");
      return;
    }
    navigate("/dashboard");
  };
  return (
    <div className={styles.loginMain}>
      <div className="container">
        <div className="loginForm">
          <div className="d-flex justify-content-center">
            <h4>MANAGE COURSES</h4>
          </div>

          <h3>SIGN IN</h3>
          <span>Enter your credentials to access your account</span>
          <form id="loginForm" onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Şifre
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {errorMessage && <p>{errorMessage}</p>}
              <div className="col-12 mt-4">
                <button className="btn btn-primary" type="submit">
                  SIGN IN
                </button>
              </div>
              <span>
                Forgot your password? <a href="/">Reset Password</a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
