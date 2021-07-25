import logo from "../images/logo_vinted.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="contain">
      <Link to="/">
        <img src={logo} alt="logo vinted" />{" "}
      </Link>
      <div className="containSearch">
        <label className="searchLabel" htmlFor="search">
          <FontAwesomeIcon className="searchIcon" icon="search" />
          <input type="text" placeholder="Rechercher des articles" />
        </label>
      </div>
      <nav>
        <Link className="buttonLogin" to="/user/signup">
          <button>S'incrire</button>
        </Link>
        <Link className="buttonLogin" to="/user/login">
          <button>Se connecter</button>
        </Link>
        <Link className="buttonSell" to="">
          <button>Vends tes articles</button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
