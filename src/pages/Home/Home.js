import "./Home.scss";
import imgFondCrashed from "../../images//fond_img_head.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Home = (props) => {
  const { title, toggleSwitch, finalValue } = props;
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isLimit, setIsLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const handleChangeCurrentPage = (key) => {
    setCurrentPage(key);
  };

  const handleChangeLimit = (event) => {
    if (event.target.value < 5) {
      return;
    }
    setIsLimit(event.target.value);
  };
  let sort;
  if (toggleSwitch) {
    sort = "price-desc";
  } else {
    sort = "price-asc";
  }

  useEffect(() => {
    const fetchData = async () => {
      // const res = await axios.get(
      //   `http://localhost:5000/offer?page=${currentPage}&limit=${isLimit}&title=${title}&sort=${sort}&priceMin=${finalValue[0]}&priceMax=${finalValue[1]}`
      // );
      const res = await axios.get(
        `https://vinted-api-chris.herokuapp.com//offer?page=${currentPage}&limit=${isLimit}&title=${title}&sort=${sort}&priceMin=${finalValue[0]}&priceMax=${finalValue[1]}`
      );
      setData(res.data);
      setIsLoading(false);
    };
    fetchData();
  }, [title, toggleSwitch, currentPage, isLimit, sort, finalValue]);

  const pages = Math.ceil(data.count / isLimit);
  const pagesArr = [];
  for (let i = 0; i < pages; i++) {
    pagesArr.push([i + 1]);
  }

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
      <div className="paging">
        <span>Page(s) :</span>
        <div className="pageNumbers">
          {pagesArr.map((elem, index) => {
            return (
              <Link
                to={`/?page=${index + 1}`}
                onClick={() => handleChangeCurrentPage(index + 1)}
                className={
                  index + 1 === currentPage
                    ? "pageNumber currentPage"
                    : "pageNumber"
                }
                key={index}
              >
                {elem}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="limitOfferPage">
        <span>Nombre d'offres souhaité par page (5-100)</span>
        <input
          value={isLimit}
          onChange={handleChangeLimit}
          type="number"
          min="5"
          max="100"
        />
      </div>
      <div className="articles contain">
        {data.offers.map((elem) => {
          return (
            <Link key={elem._id} to={`/offer/${elem._id}`}>
              <div className="article">
                <h3>{elem.owner.account.username}</h3>
                {elem.product_image &&
                elem.product_image.secure_url !== undefined ? (
                  <img
                    src={elem.product_image.secure_url}
                    alt={elem.product_name}
                  />
                ) : (
                  <img
                    src={elem.product_image.picture1.result.secure_url}
                    alt={elem.product_image.picture1.result.product_name}
                  />
                )}

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
