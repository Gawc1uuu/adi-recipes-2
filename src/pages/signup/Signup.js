import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
//styles
import "./Signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarError, setAvatarError] = useState(null);
  const { signup } = useSignup();

  const handleFileChange = (e) => {
    setAvatar(null);
    let selected = e.target.files[0];
    if (!selected) {
      setAvatarError("Please select a file");
      return;
    }
    if (!selected.type.includes("image")) {
      setAvatarError("Selected file must be an image");
      return;
    }
    if (selected.size > 100000) {
      setAvatarError("Size must be less than 100kb");
      return;
    }
    setAvatarError(null);
    setAvatar(selected);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, username, password, avatar);
  };

  return (
    <div className="auth-container">
      <h2>Sign up</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            required
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <input
            required
            type="text"
            placeholder="username"
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
        <label>
          <input
            required
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          <span>Add an avatar</span>
          <input required type="file" onChange={handleFileChange} />
        </label>
        <button className="signup-button">Sign up</button>
        {avatarError && <p className="error">{avatarError}</p>}
      </form>
    </div>
  );
};

export default Signup;
