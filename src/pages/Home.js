import imgFondCrashed from "../images/fond_img_head.svg";
import { Link } from "react-router-dom";

const Home = (props) => {
  const { data } = props;

  const detailsArticle = (offer, detail) => {
    for (let i = 0; i < offer.length; i++) {
      if (offer[i][detail]) {
        return offer[i][detail];
      }
    }
  };

  const intlFormat = (num) => {
    return Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(num);
  };

  return (
    <div className="home">
      <div className="headHome">
        <div className="pictureBack">
          <img className="test" src={imgFondCrashed} alt="" />
        </div>

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
                <span>{intlFormat(elem.product_price)} </span>
                <span>{detailsArticle(elem.product_details, "MARQUE")}</span>
                <span>{detailsArticle(elem.product_details, "TAILLE")}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
