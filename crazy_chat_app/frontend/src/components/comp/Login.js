import React from "react";
import Button from "./utilities/Button";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Enter all the fields");
    }

    // call function to fetch
    onLogin({ username, password });

    setUsername("");
    setPassword("");
  };

  return (
    <div className="create shadow-lg p-3 mb-5 bg-white rounded">
      <h2>Login</h2>
      <label>Username: </label>
      <input
        type="text"
        required
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />

      <label>Password: </label>
      <input
        type="password"
        required
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <Button btn_type="success" text="Login" type="submit" onCick={onSubmit} />
      <Link to="/sign-up">SignUp</Link>
    </div>
  );
};

export default Login;
