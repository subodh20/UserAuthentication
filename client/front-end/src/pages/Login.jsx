import classes from "./UserForm.module.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Page from "../components/Page";
const Login = () => {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    username: "",
    password: "",
  });
  const { email, username, password } = userCredentials;
  const navigateToSignupPage = () => {
    navigate("/signup");
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserCredentials({
      ...userCredentials,
      [name]: value,
    });
  };
  const inputHasValue = () => {
    return (
      email.trim() !== "" && username.trim() !== "" && password.trim() !== ""
    );
  };
  const handleSuccess = (message) => {
    toast.success(message, { position: "bottom-center" });
  };
  const handleError = (message) => {
    toast.error(message, { position: "bottom-center" });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:4000/login", {
        ...userCredentials,
      });
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 200);
      } else {
        handleError(message);
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Page>
      <div className={classes.Signup}>
        <h1>Login</h1>
        <div className={classes.Email}>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            value={email}
            onChange={handleInputChange}
          />
        </div>
        <div className={classes.Username}>
          <label htmlFor="username">Username</label>
          <input
            name="username"
            type="text"
            value={username}
            onChange={handleInputChange}
          />
        </div>
        <div className={classes.Password}>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={handleInputChange}
          />
        </div>
        <div className={classes.Button}>
          <button disabled={busy || !inputHasValue()} onClick={handleLogin}>
            Log in
          </button>
        </div>
        <p style={{ fontSize: "0.8em", textAlign: "center" }}>
          Do not have an account?
          <span
            style={{ color: "#0000FF", marginLeft: "5px", cursor: "pointer" }}
            onClick={navigateToSignupPage}
          >
            Sign Up
          </span>
        </p>
      </div>
      <ToastContainer />
    </Page>
  );
};
export default Login;
