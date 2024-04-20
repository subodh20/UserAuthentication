import classes from "./UserForm.module.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
const Signup = () => {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    username: "",
    password: "",
  });
  const { email, username, password } = userCredentials;
  const navigateToLoginPage = () => {
    navigate("/login");
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };
  const handleSuccess = (message) => {
    toast.success(message, { position: "bottom-left" });
  };
  const handleError = (message) => {
    toast.error(message, { position: "bottom-left" });
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:4000/signup", {
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
  const inputHasValue = () => {
    return (
      email.trim() !== "" && username.trim() !== "" && password.trim() !== ""
    );
  };
  return (
    <>
      <div className={classes.Signup}>
        <h1>Signup</h1>
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
          <button disabled={busy || !inputHasValue()} onClick={handleSignup}>
            Sign Up
          </button>
        </div>
        <p style={{ fontSize: "0.8em", textAlign: "center" }}>
          Already have an account?
          <span
            style={{ color: "#0000FF", marginLeft: "5px", cursor: "pointer" }}
            onClick={navigateToLoginPage}
          >
            Log In
          </span>
        </p>
      </div>
      <ToastContainer />
    </>
  );
};
export default Signup;
