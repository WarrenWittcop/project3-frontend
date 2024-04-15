
import { useState } from "react";
import "../css/Login.css";

const URL = process.env.REACT_APP_URL

const Login = (props) => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = form;

    // Determine the identifier to use based on what the user has entered
    const identifier = username ? username : email;

    // Check if either username or email is provided
    if (!identifier) {
      setErrorMsg("Please provide either username or email.");
      return;
    }

    // Call handleLogin function with the determined identifier
    let submission = await props.handleLogin({ identifier, password });

    if (submission) {
      setErrorMsg(submission.error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
  };

  return (
    <div className="form-container">
      <h1>Welcome Back!</h1>
      <form onSubmit={handleSubmit}>
        <span>
          <label htmlFor="username">Username or Email: </label>
          <input
            type="text"
            name="username"
            value={form.username || form.email} // Use either username or email from the state
            onChange={handleChange}
          />
        </span>
        <span>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </span>
        <input type="submit" value="Login" className="submit" />
      </form>
      {errorMsg ? <h4 style={{ color: "red" }}>{errorMsg}</h4> : ""}
    </div>
  );
};

export default Login;