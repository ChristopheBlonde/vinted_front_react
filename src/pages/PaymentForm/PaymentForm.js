import "./PaymentForm.scss";
import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const Payment = (props) => {
  const { article, token } = props;
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

  const URL = window.location.href;
  console.log(URL);
  const shippingFees = 0.8;
  const protectionFees = 0.4;
  const priceArticle = article.product_price;
  const result = priceArticle + shippingFees + protectionFees;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const cardElement = elements.getElement(CardElement);

    const stripeResponse = await stripe.createToken(cardElement, {
      price: priceArticle,
      article: article._id,
      owner: article.owner._id,
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
    console.log(response);
  };
  return (
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
            payer <span className="bold">{intlFormat(result)}</span> (frais de
            protection et frais de port inclus).
          </p>
        </section>
        <section className="summary">
          <div className="test">
            <CardElement className="cardInput" />
          </div>

          <button type="submit">Achetez</button>
        </section>
      </form>
    </div>
  );
};

export default Payment;
