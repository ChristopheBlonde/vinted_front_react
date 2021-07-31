import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Publish from "./pages/Publish";
import Footer from "./components/Footer/Footer";
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

function App() {
  const [search, setSearch] = useState("");
  const [toggleSwitch, setToggleSwitch] = useState(false);
  const [range, setRange] = useState([0, 2000]);
  const [finalValue, setFinalValue] = useState([0, 2000]);

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
      />
      <Switch>
        <Route path="/offer/:id">
          <Offer />
        </Route>
        <Route path="/publish">
          <Publish />
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
