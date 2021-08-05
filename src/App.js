import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Offer from "./pages/Offer/Offer";
import Publish from "./pages/Publish/Publish";
import Footer from "./components/Footer/Footer";
import PaymentForm from "./pages/PaymentForm/PaymentForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Cookies from "js-cookie";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEye,
  faEyeSlash,
  faSearch,
  faTimes,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
library.add(faSearch, faEye, faEyeSlash, faTimes, faArrowUp, faArrowDown);

const stripePromise = loadStripe(
  "pk_test_51JKm6FISp0ptytvdagplHqb1ydTQX1CR9pWcmdCC7giNOyyxqQUOAtDFPs2NVfM1fOmKErzpyUdiDvgc6MNLsX6S00MHl9Ituf"
);

function App() {
  const [search, setSearch] = useState("");
  const [toggleSwitch, setToggleSwitch] = useState(false);
  const [range, setRange] = useState([0, 2000]);
  const [finalValue, setFinalValue] = useState([0, 2000]);
  const [isShowing, setIsShowing] = useState([false, false]);
  const [article, setArticle] = useState({});
  const [token, setToken] = useState(Cookies.get("tokenLogin") || "");
  const [avatar, setAvatar] = useState(Cookies.get("avatar") || "");

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

  return (
    <Router>
      <Header
        search={search}
        setSearch={setSearch}
        toggleSwitch={toggleSwitch}
        setToggleSwitch={setToggleSwitch}
        range={range}
        setRange={setRange}
        setFinalValue={setFinalValue}
        token={token}
        setToken={setToken}
        avatar={avatar}
        setAvatar={setAvatar}
        isShowing={isShowing}
        setIsShowing={setIsShowing}
        toggle={toggle}
      />
      <Switch>
        <Route path="/offer/:id">
          <Offer
            token={token}
            toggle={toggle}
            article={article}
            setArticle={setArticle}
          />
        </Route>
        <Route path="/publish">
          <Publish token={token} />
        </Route>
        <Route path="/payment">
          <Elements stripe={stripePromise}>
            <PaymentForm article={article} token={token} />
          </Elements>
        </Route>
        <Route exact path="/">
          <Home
            title={search}
            toggleSwitch={toggleSwitch}
            range={range}
            finalValue={finalValue}
          />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
