import { useState } from "react";
import reactDom from "react-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Signup = (props) => {
  const { isShowing, setIsShowing, isShowingIndex } = props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkBox, setCheckBox] = useState(false);
  const [phone, setPhone] = useState("");
  const [hiddenPass, setHiddenPass] = useState(true);
  const handleName = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const handleEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePhone = (event) => {
    const value = event.target.value;

    setPhone(value);
  };

  const handlePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleCheckBox = () => {
    if (!checkBox) {
      setCheckBox(true);
    } else {
      setCheckBox(false);
    }
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
    try {
      event.preventDefault();
      const result = {};
      let response;
      if (name && email && password && (checkBox || !checkBox) && phone) {
        result.username = name;
        result.email = email;
        result.password = password;
        result.phone = phone;
        result.checkBox = checkBox;
        response = await axios.post(
          "https://vinted-api-chris.herokuapp.com/user/signup",
          result
        );
        const token = response.data.token;
        Cookies.set("token", { token: token }, { expires: 1 });
        return alert(
          `Merci ${result.username} votre compte a bien était créé.`
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const newShowing = [...isShowing];
  const handleLinkLogin = () => {
    newShowing[0] = !newShowing[0];
    newShowing[1] = !newShowing[1];
    setIsShowing(newShowing);
  };
  return isShowingIndex
    ? reactDom.createPortal(
        <div className="containModal">
          <form className="modal" onSubmit={handleSubmit}>
            <h2>S'inscrire</h2>
            <label htmlFor="username">
              <input
                placeholder="Nom d'utilisateur"
                onChange={handleName}
                value={name}
                type="text"
                required
              />
            </label>
            <label htmlFor="phone">
              <input
                placeholder="Téléphone"
                onChange={handlePhone}
                value={phone}
                type="tel"
                required
              />
            </label>
            <label htmlFor="email">
              <input
                placeholder="Email"
                onChange={handleEmail}
                value={email}
                type="email"
                required
              />
            </label>
            <label htmlFor="password" className="inputPassword">
              <input
                placeholder="Password"
                onChange={handlePassword}
                value={password}
                type={inputType}
                required
              />
              <FontAwesomeIcon
                className="iconPassword"
                onClick={handlehiddenPassword}
                icon={hidden}
              />
            </label>
            <div className="newLetter">
              <div className="title">
                <input
                  onChange={handleCheckBox}
                  type="checkbox"
                  checked={checkBox}
                />
                <h3>S'inscrire à notre newsletter</h3>
              </div>

              <p>
                En m'inscrivant, je confirme que j'ai accepté les Termes &
                Conditions de Vinted, avoir lu la Politique de Confidentialité,
                et que j'ai plus de 18 ans.
              </p>
              <button type="submit">S'inscrire</button>
              <p className="toggleLoginSignup" onClick={handleLinkLogin}>
                Tu as déjà un compte ? Connecte-toi !
              </p>
            </div>
          </form>
        </div>,
        document.body,
        (document.body.style.overflow = "hidden")
      )
    : null;
};

export default Signup;
