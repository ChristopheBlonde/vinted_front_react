import "./Header.scss";
import logo from "../../images/logo_vinted.png";
import { useHistory, useLocation, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Range, getTrackBackground } from "react-range";
import Signup from "../Modals/Signup/Signup";
import Login from "../Modals/Login/Login";
import Cookies from "js-cookie";

const Header = (props) => {
  const {
    search,
    setSearch,
    toggleSwitch,
    setToggleSwitch,
    range,
    setRange,
    finalValue,
    setFinalValue,
    token,
    setToken,
    avatar,
    setAvatar,
    isShowing,
    setIsShowing,
    toggle,
    pageDirection,
    setPageDirection,
    handleLoginPublish,
  } = props;

  const location = useLocation();
  const history = useHistory();

  if (finalValue[1] === 2000) {
    const newPriceMax = [...finalValue];
    newPriceMax[1] = 100000;
    setFinalValue(newPriceMax);
  }

  const handleChangeSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleChangeToggleSwitch = () => {
    const toggle = !toggleSwitch;
    setToggleSwitch(toggle);
  };

  const handleDisconnected = () => {
    Cookies.remove("tokenLogin");
    setToken("");
    Cookies.remove("avatar");
    setAvatar(null);
    Cookies.remove("userName");
    if (isShowing[0]) {
      toggle(0);
    }
    history.push("/");
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
        {location.pathname === "/" ? (
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
                    <div className="price">{range[props.key] + "€"}</div>
                  </div>
                )}
              />
            </div>
          </div>
        ) : null}
      </div>
      <nav>
        {token ? (
          <div className="signOut">
            {avatar ? (
              <img className="avatarIcon" src={avatar} alt="user avatar" />
            ) : (
              <div className="connected">
                <div className="avatarIcon withOutAvatar">
                  <p> {Cookies.get("userName").substr(0, 1).toUpperCase()}</p>
                </div>
                <span className="userName">{Cookies.get("userName")}</span>
              </div>
            )}
            <button
              onClick={handleDisconnected}
              className="buttonDisconnection hover2 hover1"
            >
              Déconnexion
            </button>
          </div>
        ) : (
          <>
            <div>
              <button className="buttonLogin hover1" onClick={() => toggle(1)}>
                S'incrire
              </button>
              <Signup
                isShowing={isShowing}
                setIsShowing={setIsShowing}
                isShowingIndex={isShowing[1]}
              />
            </div>

            <div>
              <button className="buttonLogin hover1" onClick={() => toggle(0)}>
                Se connecter
              </button>
              <Login
                toggle={toggle}
                setToken={setToken}
                isShowing={isShowing}
                setIsShowing={setIsShowing}
                isShowingIndex={isShowing[0]}
                setAvatar={setAvatar}
                pageDirection={pageDirection}
                setPageDirection={setPageDirection}
              />
            </div>
          </>
        )}

        <Link
          className="buttonSell"
          to={token ? "/publish" : location.pathname}
        >
          <button
            className="hover1"
            onClick={token ? null : handleLoginPublish}
          >
            Vends tes articles
          </button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
