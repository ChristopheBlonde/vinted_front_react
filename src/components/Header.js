import logo from "../images/logo_vinted.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        <button>S'incrire</button>
        <button>Se connecter</button>
        <button>Vends tes articles</button>
      </nav>
    </header>
  );
};

export default Header;
