import logo from "../images/logo_vinted.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useState } from "react";

import useModal from "./useModal";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Cookies from "js-cookie";

const Header = () => {
  const { isShowing, toggle, setIsShowing } = useModal();

  const [token, setToken] = useState(Cookies.get("tokenLogin") || "");

  const closeModals = [false, false];
  const handleDisconnected = () => {
    Cookies.remove("tokenLogin");
    setToken("");

    setIsShowing(closeModals);
  };

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
        {token ? (
          <div>
            <button
              onClick={handleDisconnected}
              className="buttonDisconnection"
            >
              Déconnection
            </button>
          </div>
        ) : (
          <>
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
                toggle={toggle}
                setToken={setToken}
                isShowing={isShowing}
                setIsShowing={setIsShowing}
                isShowingIndex={isShowing[0]}
              />
            </div>
          </>
        )}

        <Link className="buttonSell" to="">
          <button>Vends tes articles</button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
