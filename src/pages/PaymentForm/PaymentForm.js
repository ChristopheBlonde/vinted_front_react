import "./PaymentForm.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const Payment = (props) => {
  const { article, token, loading, setLoading } = props;
  const stripe = useStripe();
  const elements = useElements();
  const [completed, setCompleted] = useState(false);

  /* Function for price format */
  const intlFormat = (num) => {
    return Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(num);
  };

  const shippingFees = 0.8;
  const protectionFees = 0.4;
  const priceArticle = article.product_price;
  const result = priceArticle + shippingFees + protectionFees;

  /* Condition image in BDD Version  */
  let imageArticle;
  if (
    article.product_image &&
    article.product_image.picture1 &&
    article.product_image.picture1.result.secure_url
  ) {
    imageArticle = article.product_image.picture1.result.secure_url;
  } else {
    imageArticle = article.product_image.secure_url;
  }

  /* Submit payment */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading([true, false]);
    const cardElement = elements.getElement(CardElement);

    const stripeResponse = await stripe.createToken(cardElement, {
      price: priceArticle,
      article: article._id,
    });

    const response = await axios.post(
      "https://vinted-api-chris.herokuapp.com/payment",
      // "http://localhost:5000/payment",
      {
        stripeToken: stripeResponse.token.id,
        article: article,
        price: result,
      },
      {
        headers: {
          authorization: "Bearer " + token,
        },
      }
    );
    if (response.data.status === "succeeded") {
      setLoading([false, true]);
      setTimeout(() => {
        setLoading([false, false]);
        setCompleted(true);
      }, 2000);
    }
  };
  return (
    <>
      {completed ? (
        <div className="contentPayment">
          <div className="payment">
            <div className="resultPayment">
              <h3>
                Merci pour votre achat <span>{Cookies.get("userName")}</span>.
              </h3>
              <p>Vous venez de faire l'acquisition de cet article.</p>
              <img src={imageArticle} alt="" />
              <p>
                Ce produit est vendu par{" "}
                <span>{article.owner.account.username}.</span>
              </p>
              <Link to="/">
                <button className="btnHome hover1">Retour à l'accueil</button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="contentPayment">
          <form onSubmit={handleSubmit} className="payment">
            <h3>Résumé de la commande</h3>
            <section className="summary">
              <div className="infoPrice">
                <h4>Commande</h4>
                <san>{intlFormat(priceArticle)} </san>
              </div>
              <div className="infoPrice">
                <h4>Frais de protection acheteurs</h4>
                <san>{intlFormat(protectionFees)}</san>
              </div>
              <div className="infoPrice">
                <h4>Frais de port</h4>
                <san>{intlFormat(shippingFees)}</san>
              </div>
            </section>
            <section className="summary">
              <div className="infoPrice">
                <h4 className="bold">Total</h4>
                <span className="bold">{intlFormat(result)} </span>
              </div>
              <p>
                Il ne vous reste plus qu'une étape pour vous offir{" "}
                <span className="bold">{article.product_name}</span>. Vous allez
                payer <span className="bold">{intlFormat(result)}</span> (frais
                de protection et frais de port inclus).
              </p>
            </section>
            <section className="summary">
              <div className="cardElem">
                <CardElement className="cardInput" />
              </div>

              <button
                disabled={loading[0] || loading[1] ? true : false}
                className={
                  loading[0]
                    ? "onclic "
                    : loading[1]
                    ? "validate hoverSubmit"
                    : "hoverSubmit"
                }
                type="submit"
              >
                {loading[0] ? "" : loading[1] ? "Terminé" : "Acheter"}
              </button>
            </section>
          </form>
        </div>
      )}
    </>
  );
};

export default Payment;
