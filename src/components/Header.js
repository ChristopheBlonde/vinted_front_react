import logo from "../images/logo_vinted.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="contain">
      <img src={logo} alt="logo vinted" />
      <div className="containSearch">
        <label className="searchLabel" htmlFor="search">
          <FontAwesomeIcon className="searchIcon" icon="search" />
          <input type="text" placeholder="Rechercher des articles" />
        </label>
      </div>
      <nav>
        <Link to="/user/signup">
          <button>S'incrire</button>
        </Link>
        <Link to="/user/login">
          <button>Se connecter</button>
        </Link>

        <button>Vends tes articles</button>
      </nav>
    </header>
  );
};

export default Header;
