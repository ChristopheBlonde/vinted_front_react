import logo from "../images/logo_vinted.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import useModal from "./useModal";
import Signup from "../pages/Signup";
import Login from "../pages/Login";

const Header = () => {
  const { isShowing, toggle, setIsShowing } = useModal();

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
        <div>
          <button className="buttonLogin" onClick={() => toggle(1)}>
            S'incrire
          </button>
          <Signup
            isShowing={isShowing}
            setIsShowing={setIsShowing}
            isShowingIndex={isShowing[1]}
          />
        </div>

        <div>
          <button className="buttonLogin" onClick={() => toggle(0)}>
            Se connecter
          </button>
          <Login
            isShowing={isShowing}
            setIsShowing={setIsShowing}
            isShowingIndex={isShowing[0]}
          />
        </div>
        <Link className="buttonSell" to="">
          <button>Vends tes articles</button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
