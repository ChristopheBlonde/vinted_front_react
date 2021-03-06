import "./Offer.scss";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Offer = (props) => {
  const {
    token,
    toggle,
    article,
    setArticle,
    pageDirection,
    setPageDirection,
  } = props;
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  /* fetch data */
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://vinted-api-chris.herokuapp.com/offer/${id}`
      );
      // const res = await axios.get(`http://localhost:5000/offer/${id}`);
      setArticle(res.data[0]);
      setIsLoading(false);
    };
    fetchData();
  }, [id, setArticle]);

  /* Function for price format */
  const intlFormat = (num) => {
    return Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(num);
  };

  /* Variable for details*/
  const offerDetails = article.product_details;

  /* fetch images */
  const fetchImages = () => {
    const images = [];
    const imagesKeys = Object.keys(article.product_image);
    imagesKeys.forEach((key) => {
      if (article.product_image[key].success) {
        images.push(article.product_image[key].result.secure_url);
      } else if (key === "secure_url") {
        images.push(article.product_image[key]);
      }
    });
    return images;
  };

  /* Login befor payment */
  const handleLoginPayment = () => {
    const pagePayment = [...pageDirection];
    pagePayment[1] = true;
    setPageDirection(pagePayment);
    toggle(0);
  };

  return isLoading ? (
    <div>Chargement en cours...</div>
  ) : (
    <div className="contentOffer">
      <div className="offer contain">
        <div className="col-1">
          {fetchImages().map((elem, index) => {
            return <img key={index} src={elem} alt="article à vendre" />;
          })}
        </div>
        <div className="col-2">
          <div className="offerDetails">
            <span className="priceArticle">
              {intlFormat(article.product_price)}
            </span>
            {offerDetails.map((detail, index) => {
              const keys = Object.keys(detail);
              return (
                <li key={index}>
                  <div>{keys[0]}</div>
                  <div>{detail[keys[0]]}</div>
                </li>
              );
            })}
          </div>
          <div className="byIt">
            <div>
              <h2>{article.product_name}</h2>
              {offerDetails.map((element, index) => {
                const keys = Object.keys(element);
                let result;
                if (keys[0] === "ETAT") {
                  result = element[keys[0]];
                }
                return <p key={index}> {result}</p>;
              })}

              {article.owner.account.avatar ? (
                <div className="author">
                  <img
                    className="avatar"
                    src={article.owner.account.avatar.secure_url}
                    alt=""
                  />
                  {article.owner.account.username}
                </div>
              ) : (
                <div className="author">{article.owner.account.username}</div>
              )}
            </div>
            <Link to={token ? "/payment" : `/offer/${id}`}>
              <button
                className="hover1"
                onClick={token ? null : handleLoginPayment}
              >
                Acheter
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Offer;
