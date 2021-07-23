import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Offer = () => {
  const { id } = useParams();

  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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

  const intlFormat = (num) => {
    return Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(num);
  };
  const detailsArticle = (offer, detail) => {
    for (let i = 0; i < offer.length; i++) {
      if (offer[i][detail]) {
        return offer[i][detail];
      }
    }
  };
  const detailsArticleKeys = (offer, detail) => {
    for (let i = 0; i < offer.length; i++) {
      const object = offer[i];
      const key = Object.keys(object);
      if (key[0] === detail) {
        return key[0];
      }
    }
  };

  return isLoading ? (
    <div>Chargement en cours...</div>
  ) : (
    <div className="contentOffer">
      <div className="offer contain">
        <div className="col-1">
          <img
            src={article.product_image.secure_url}
            alt={article.product_description}
          />
        </div>
        <div className="col-2">
          <span className="priceArticle">
            {intlFormat(article.product_price)}
          </span>
          <div className="offerDetails">
            <div className="offerDetailsName">
              <span>
                {detailsArticleKeys(article.product_details, "MARQUE")}
              </span>
              <span>
                {detailsArticleKeys(article.product_details, "TAILLE")}
              </span>
              <span>{detailsArticleKeys(article.product_details, "ETAT")}</span>
              <span>
                {detailsArticleKeys(article.product_details, "COULEUR")}
              </span>
              <span>
                {detailsArticleKeys(article.product_details, "EMPLACEMENT")}
              </span>
            </div>
            <div className="offerDetailsArticle">
              <span>{detailsArticle(article.product_details, "MARQUE")}</span>
              <span>{detailsArticle(article.product_details, "TAILLE")}</span>
              <span>{detailsArticle(article.product_details, "ETAT")}</span>
              <span>{detailsArticle(article.product_details, "COULEUR")}</span>
              <span>
                {detailsArticle(article.product_details, "EMPLACEMENT")}
              </span>
            </div>
          </div>
          <div className="byIt"></div>
        </div>
      </div>
    </div>
  );
};
export default Offer;
