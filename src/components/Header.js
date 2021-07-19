import logo from "../images/logo_vinted.png";

const Header = () => {
  return (
    <header className="contain">
      <img src={logo} alt="logo vinted" />
      <label htmlFor="search">
        <input type="text" placeholder="Rechercher des articles" />
      </label>
      <nav>
        <button>S'incrire</button>
        <button>Se connecter</button>
        <button>Vendre tes articles</button>
      </nav>
    </header>
  );
};

export default Header;
