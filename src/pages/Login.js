import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hiddenPass, setHiddenPass] = useState(true);

  const handleUserName = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  /* Hide password function */
  let hidden = "eye";
  let inputType = "password";
  hiddenPass ? (hidden = "eye") : (hidden = "eye-slash");
  hiddenPass ? (inputType = "password") : (inputType = "text");
  const handlehiddenPassword = () => {
    if (hiddenPass) {
      return setHiddenPass(false);
    } else {
      return setHiddenPass(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const login = {};
    if (password && email) {
      login.email = email;
      login.password = password;
      const response = await axios.post(
        "https://vinted-api-chris.herokuapp.com/user/login",
        login
      );
      const userLogin = response.data.account.username;
      return alert(`Bienvenue ${userLogin}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="modal">
      <h2>Se Connecter</h2>
      <label htmlFor="username">
        <input
          value={email}
          onChange={handleUserName}
          type="text"
          placeholder="Nom d'utilisateur"
        />
      </label>
      <label htmlFor="password" className="inputPassword">
        <input
          value={password}
          onChange={handlePassword}
          type={inputType}
          placeholder="Mot de passe"
        />
        <FontAwesomeIcon
          className="iconPassword"
          onClick={handlehiddenPassword}
          icon={hidden}
        />
      </label>
      <button type="submit">Se connecter</button>
      <Link to="/user/signup">
        <p>Pas encore de compte ? Inscris-toi !</p>
      </Link>
    </form>
  );
};
export default Login;
