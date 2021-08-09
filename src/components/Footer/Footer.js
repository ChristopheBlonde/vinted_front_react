import React from "react";
import "./Footer.scss";
import git from "./images/logo_github.png";
import logoReacteur from "./images/reacteur.png";
import logoReact from "./images/logo_react.png";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <nav className="navFooter">
          <span>Made with</span>
          <a className="linkFooter " href="https://create-react-app.dev/">
            <img src={logoReact} alt="logo react" />
            React
          </a>
          <span>at</span>
          <a className="linkFooter" href="https://www.lereacteur.io/">
            <img
              className="logoReacteur"
              src={logoReacteur}
              alt="logo reacteur"
            />
            Le Reacteur
          </a>
          <span>by</span>
          <a className="linkFooter" href="https://github.com/ChristopheBlonde">
            <img src={git} alt="logo github" />
            Chris
          </a>
        </nav>
      </div>
    </footer>
  );
};
export default Footer;
