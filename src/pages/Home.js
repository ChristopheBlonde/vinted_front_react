import imgFond from "../images/fond_header.jpg";
import { Link } from "react-router-dom";

const Home = (props) => {
  const { data } = props;

  return (
    <div className="home">
      <div className="headHome">
        <img src={imgFond} alt="femme présentant une robe" />
        <div className="headSell">
          <h2>Prêts à faire du tri dans vos placards ?</h2>
          <button>Commencer à vendre</button>
        </div>
      </div>
      <div className="articles contain">
        {data.offers.map((elem) => {
          return (
            <Link key={elem._id} to={`/offer/${elem._id}`}>
              <div className="article">
                <h3>{elem.owner.account.username}</h3>
                <img
                  src={elem.product_image.secure_url}
                  alt={elem.product_description}
                />
                <span>{elem.product_price} </span>
                <span>{}</span>
                <span>{}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
