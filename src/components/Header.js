import logo from "../images/logo_vinted.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Range, getTrackBackground } from "react-range";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Cookies from "js-cookie";

const Header = (props) => {
  const {
    search,
    setSearch,
    toggleSwitch,
    setToggleSwitch,
    range,
    setRange,
    setFinalValue,
  } = props;
  const [token, setToken] = useState(Cookies.get("tokenLogin") || "");
  const [isShowing, setIsShowing] = useState([false, false]);

  const handleChangeSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleChangeToggleSwitch = () => {
    const toggle = !toggleSwitch;
    setToggleSwitch(toggle);
  };

  /* Modals showed */
  const newArr = [...isShowing];
  const toggle = (index) => {
    if (index === 0) {
      newArr[0] = !newArr[0];
      newArr[1] = false;
      document.body.style.overflow = "hidden";
    } else {
      newArr[1] = !newArr[1];
      newArr[0] = false;
      document.body.style.overflow = "hidden";
    }
    if (!newArr[1] && !newArr[0]) {
      document.body.style.overflow = "auto";
    }
    setIsShowing(newArr);
  };
  const openLogin = [false, true];
  const handleLoginOpen = () => {
    setIsShowing(openLogin);
  };

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
          <input
            type="text"
            value={search}
            onChange={handleChangeSearch}
            placeholder="Rechercher des articles"
          />
        </label>
        <div className="priceChois">
          <span>Trier par prix :</span>
          <label className="switch" htmlFor="switch">
            <input
              id="switch"
              checked={toggleSwitch}
              onChange={handleChangeToggleSwitch}
              type="checkbox"
            />
            <div className="slider"></div>
          </label>
          <div className="range">
            <span>Prix entre :</span>
            <Range
              step={5}
              min={0}
              max={2000}
              values={range}
              onChange={(values) => setRange(values)}
              onFinalChange={(values) => {
                setFinalValue(values);
              }}
              renderTrack={({ props, children }) => {
                return (
                  <div
                    className="track"
                    {...props}
                    style={{
                      background: getTrackBackground({
                        values: range,
                        colors: ["#ccc", "#09b0ba", "#ccc"],
                        min: 0,
                        max: 2000,
                      }),
                    }}
                  >
                    {children}
                  </div>
                );
              }}
              renderThumb={({ props }) => (
                <div className="trackThumb" {...props}>
                  <div className="price">{range[props.key]}</div>
                </div>
              )}
            />
          </div>
        </div>
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

        <Link className="buttonSell" to={token ? "/publish" : undefined}>
          <button onClick={() => toggle(0)}>Vends tes articles</button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
