import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import reactDom from "react-dom";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

const Login = (props) => {
  const { isShowing, setIsShowing, isShowingIndex, setToken } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hiddenPass, setHiddenPass] = useState(true);

  let history = useHistory();

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
    setHiddenPass(!hiddenPass);
  };

  /* Submit request */

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
      const token = Cookies.set("tokenLogin", response.data.token, {
        expires: 7,
      });
      setToken(token);
      document.body.style.overflow = "auto";
      history.goBack();

      return alert(`Bienvenue ${userLogin}`);
    }
  };
  /* Modal */

  const newShowing = [...isShowing];
  const toggleLoginSignup = () => {
    newShowing[0] = !newShowing[0];
    newShowing[1] = !newShowing[1];
    setIsShowing(newShowing);
  };

  const closeAllModal = () => {
    const closeModals = [false, false];
    document.body.style.overflow = "auto";
    setIsShowing(closeModals);
  };

  return isShowingIndex
    ? reactDom.createPortal(
        <div className="containModal">
          <form onSubmit={handleSubmit} className="modal">
            <div className="iconCloseModal">
              <FontAwesomeIcon onClick={closeAllModal} icon="times" />
            </div>

            <h2>Se Connecter</h2>
            <label htmlFor="username">
              <input
                value={email}
                onChange={handleUserName}
                type="text"
                placeholder="Adresse mail"
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

            <p className="toggleLoginSignup" onClick={toggleLoginSignup}>
              Pas encore de compte ? Inscris-toi !
            </p>
          </form>
        </div>,
        document.body
      )
    : null;
};
export default Login;
