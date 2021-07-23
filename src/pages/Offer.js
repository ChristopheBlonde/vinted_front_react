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
      const res = await axios.get(
        `https://vinted-api-chris.herokuapp.com/offer/${id}`
      );
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

  return isLoading ? (
    <div>Chargement en cours...</div>
  ) : (
    <div className="contentOffer">
      <div className="offer contain">
        <div className="col-1">
          <img
            src={article.product_image.secure_url}
            alt={article.product_name}
          />
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
                  <div className="avatar">{article.owner.account.avatar}</div>
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
