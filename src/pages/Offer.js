import { useParams } from "react-router-dom";

const Offer = (props) => {
  const { data } = props;
  const { id } = useParams();
  let article;
  for (let i = 0; i < data.offers.length; i++) {
    if (data.offers[i]._id === id) {
      article = data.offers[i];
    }
  }
  return (
    <div className="contentOffer">
      <img src={article.product_image.url} alt={article.product_description} />
    </div>
  );
};
export default Offer;
