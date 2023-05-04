import { useState } from "react";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(true);

  const submitHandler = (e) => {
    e.preventDefault();

    console.log("submitHandler called");
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
