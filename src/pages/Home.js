import imgFondCrashed from "../images/fond_img_head.svg";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import * as qs from "qs";

const Home = (props) => {
  const { title, toggleSwitch } = props;
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  console.log(title);

  const location = useLocation();
  const params = qs.parse(location.search.substring(1));
  const page = params.page;
  const limit = params.limit;
  let sort;
  if (toggleSwitch) {
    sort = "price-desc";
  } else {
    sort = "price-asc";
  }

  const fetchData = async () => {
    const res = await axios.get(
      `https://vinted-api-chris.herokuapp.com/offer?page=${page}&limit=${limit}&title=${title}&sort=${sort}`
    );
    setData(res.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [title, toggleSwitch]);

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

  return isLoading ? (
    <div>Chargement en cours...</div>
  ) : (
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
                  alt={elem.product_name}
                />
                <span>{intlFormat(elem.product_price)} </span>
                <span className="detail">
                  {detailsArticle(elem.product_details, "MARQUE")}
                </span>
                <span className="detail">
                  {detailsArticle(elem.product_details, "TAILLE")}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
