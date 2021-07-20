import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import axios from "axios";
import { useState, useEffect } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch);

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const res = await axios.get(
      "https://lereacteur-vinted-api.herokuapp.com/offers"
    );
    setData(res.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <div>Chargement en cours...</div>
  ) : (
    <Router>
      <Header />
      <Switch>
        <Route path="/offer/:id">
          <Offer data={data} />
        </Route>
        <Route exact path="/">
          <Home data={data} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
