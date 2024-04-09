import classes from "./UserForm.module.scss";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
  const navigateToLoginPage = () => {
    navigate("/login");
  };
  return (
    <div className={classes.Signup}>
      <h1>Signup</h1>
      <div className={classes.Email}>
        <label htmlFor="email">Email</label>
        <input name="email" type="email" />
      </div>
      <div className={classes.Username}>
        <label htmlFor="username">Username</label>
        <input name="username" type="text" />
      </div>
      <div className={classes.Password}>
        <label htmlFor="password">Password</label>
        <input name="password" type="password" />
      </div>
      <div className={classes.Button}>
        <button>Sign Up</button>
      </div>
      <p style={{ fontSize: "0.8em", textAlign: "center" }}>
        Already have an account?
        <span
          style={{ color: "#0000FF", marginLeft: "5px" }}
          onClick={navigateToLoginPage}
        >
          Log In
        </span>
      </p>
    </div>
  );
};
export default Signup;
