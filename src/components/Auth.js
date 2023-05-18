import { useState, useContext } from "react";
import AuthContext from "../store/authContext";

import axios from "axios";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(true);

  const authCtx = useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();

    const body = {
      username,
      password,
    };

    const url = "https://socialmtn.devmountain.com";

    axios
      .post(register ? `${url}/register` : `${url}/login`, body)
      .then(({ data }) => {
        console.log("AFTER AUTH", data);
        authCtx.login(data.token, data.exp, data.userId)
      })
      .catch((err) => {
        console.log("Error", err)
        setPassword("");
        setUsername("");
      });
  };

  const usernameChangeHandler = (e) => {
    setUsername(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const toggleRegister = () => {
    setRegister((prev) => !prev);
  };

  return (
    <main>
      <h1>Welcome!</h1>
      <form className="form auth-form" onSubmit={submitHandler}>
        <input
          className="form-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={usernameChangeHandler}
        />
        <input
          className="form-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={passwordChangeHandler}
        />
        <button className="form-btn">{register ? "Sign Up" : "Login"}</button>
      </form>
      <button className="form-btn" onClick={toggleRegister}>
        Need to {register ? "Login" : "Sign Up"}?
      </button>
    </main>
  );
};

export default Auth;
