import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
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

  return (
    <Router>
      <Header
        search={search}
        setSearch={setSearch}
        toggleSwitch={toggleSwitch}
        setToggleSwitch={setToggleSwitch}
      />
      <Switch>
        <Route path="/offer/:id">
          <Offer />
        </Route>
        <Route exact path="/">
          <Home title={search} toggleSwitch={toggleSwitch} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
