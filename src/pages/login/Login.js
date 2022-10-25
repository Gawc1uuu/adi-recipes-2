import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { ClipLoader } from "react-spinners";
//styles
import "../signup/Signup.css";

const Login = () => {
  const { mode } = useContext(ThemeContext);
  const { login, isPending, error } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="auth-page">
      <div className={`auth-container ${mode}`}>
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
          {isPending && (
            <button className="signup-button" disabled>
              <ClipLoader
                color={"white"}
                loading={isPending}
                size={15}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </button>
          )}
          {!isPending && <button className="signup-button">Login</button>}
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
