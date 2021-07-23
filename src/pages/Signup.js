import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Sign_up = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkBox, setCheckBox] = useState(false);
  const [phone, setPhone] = useState("");

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

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const result = {};
      if (name && email && password && checkBox) {
        result.username = name;
        result.email = email;
        result.password = password;
        console.log(result);
        const response = await axios.post(
          "https://lereacteur-vinted-api.herokuapp.com/user/signup",
          result
        );
        return console.log(response);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
          // pattern="[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}"
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
      <label htmlFor="password">
        <input
          placeholder="Password"
          onChange={handlePassword}
          value={password}
          type="password"
          required
        />
      </label>
      <div className="newLetter">
        <input onChange={handleCheckBox} type="checkbox" checked={checkBox} />
        <h3>S'inscrire à notre newsletter</h3>
        <p>
          En m'inscrivant, je confirme que j'ai accepté les Termes & Conditions
          de Vinted, avoir lu la Politique de Confidentialité, et que j'ai plus
          de 18 ans.
        </p>
        <button type="submit">S'inscrire</button>
        <Link to="/user/login">Tu as déjà un compte ? Connecte-toi !</Link>
      </div>
    </form>
  );
};

export default Sign_up;
