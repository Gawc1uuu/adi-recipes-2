import { useState } from "react";
//styles

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="auth-container">
      <h2 className="auth-header">Login</h2>
      <form>
        <label>
          <input type="email" placeholder="email" />
        </label>
        <label>
          <input type="password" placeholder="password" />
        </label>
        <button className="signup-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
