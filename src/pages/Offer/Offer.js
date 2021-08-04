import "./Offer.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Offer = () => {
  const { id } = useParams();

  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  /* fetch data */
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:5000/offer/${id}`);
      setArticle(res.data[0]);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

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
            <button>Acheter</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Offer;
