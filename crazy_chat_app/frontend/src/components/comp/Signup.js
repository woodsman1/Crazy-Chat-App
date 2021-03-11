import React from "react";
import Button from "./utilities/Button";
import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = ({onSignUp}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Enter all the fields");
    }

    // call function to fetch
    if (password === confirmPass) {
      onSignUp({ username, email ,password });
    } else {
      alert("confirm password not matched");
    }
    setUsername("");
    setPassword("");
  };

  return (
    <div className="create shadow-lg p-3 mb-5 bg-white rounded">
      <h2>Signup</h2>
      <label>Username: </label>
      <input
        type="text"
        required
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />

      <label>Email: </label>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
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
      <label>Confirm Password: </label>
      <input
        type="password"
        required
        value={confirmPass}
        onChange={(e) => {
          setConfirmPass(e.target.value);
        }}
      />

      <Button
        btn_type="success"
        text="Sign Up"
        type="submit"
        onCick={onSubmit}
      />
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Signup;
