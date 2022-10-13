import { useState } from "react";
//styles

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <div className="auth-container">
      <h2 className="auth-header">Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button className="signup-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
