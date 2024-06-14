import { useState } from "react";

import "../ProductDetails/_ProductDetails.css";

import { v4 as uuidv4 } from "uuid";

import { useApp } from "../../contexts/AppContext/AppContext";
import { useCart } from "../../contexts/CartContext/CartContext";

import Button from "../../components/Button/Button";
import ItemAmountSelect from "../ItemAmountSelect/ItemAmountSelect";

import { numberToCurrency } from "../../utils/helpers";

function ProductDetails({ product, className = "" }) {
  const [addToCartAmount, setAddToCartAmount] = useState(1);

  const { dispatch: dispatchApp } = useApp();
  const { cartItems, dispatch: dispatchCart } = useCart();

  const handleAddToCartAmountIncrease = () => {
    setAddToCartAmount((curr) => curr + 1);
  };

  const handleAddToCartAmountDecrease = () => {
    setAddToCartAmount((curr) => (curr > 1 ? curr - 1 : curr));
  };

  const handleAddItemToCart = () => {
    if (!cartItems.some((cartItem) => cartItem.product.id === product.id)) {
      dispatchCart({
        type: "cart/added",
        payload: { product, amount: addToCartAmount },
      });

      dispatchApp({
        type: "toast/added",
        payload: {
          type: "success",
          message: `Ürünü "${product.name}" (x${addToCartAmount}) alışveriş sepetinize eklendi.`,
          id: uuidv4(),
        },
      });

      return;
    }

    dispatchApp({
      type: "toast/added",
      payload: {
        type: "error",
        message: `Ürünü "${product.name}" zaten alışveriş sepetinizde.`,
        id: uuidv4(),
      },
    });
  };

  return (
    <section className={`product__details ${className}`}>
      <article className="product__overview">
        <picture className="product__image-container">
          <source media="(max-width: 768px)" srcSet={product.image.mobile} />
          <source
            media="(min-width: 768px) and (max-width: 1439px)"
            srcSet={product.image.tablet} />
          <source media="(min-width: 1440px)" srcSet={product.image.desktop} />
          <img
            className="product__image"
            src={product.image.desktop}
            alt={`Picture of ${product.name}`} />
        </picture>
        <div className="product__info-container">
          {product.new && (
            <p className="product__overline overline">Yeni ürün</p>
          )}
          <h2 className="product__name">{product.name}</h2>
          <p className="product__description">{product.description}</p>
          <p className="product__price">{numberToCurrency(product.price)}</p>
          <div className="product__add-to-cart-container">
            <ItemAmountSelect
              amount={addToCartAmount}
              onDecrease={handleAddToCartAmountDecrease}
              onIncrease={handleAddToCartAmountIncrease} />
            <Button
              isLink={false}
              onClick={handleAddItemToCart}
              kind="orange"
              buttonText="Sepete ekle" />
          </div>
        </div>
      </article>
      <article className="product__features">
        <h3 className="product__features-heading">Özellikler</h3>
        <p className="product__features-body">{product.features}</p>
      </article>
      <article className="product__in-the-box">
        <h3 className="product__in-the-box-heading">Kutu içerisinde</h3>
        <ul className="product__in-the-box-list">
          {product.includes.map((item) => {
            return (
              <li key={item.item} className="product__in-the-box-item">
                <p className="product__in-the-box-item-amount">
                  {item.quantity}x
                </p>
                <p className="product__in-the-box-item-name">{item.item}</p>
              </li>
            );
          })}
        </ul>
      </article>
      <article className="product__gallery">
        <picture className="product__gallery-image-container product__gallery-image-container--first">
          <source
            media="(max-width: 768px)"
            srcSet={product.gallery.first.mobile} />
          <source
            media="(min-width: 768px) and (max-width: 1439px)"
            srcSet={product.gallery.first.tablet} />
          <source
            media="(min-width: 1440px)"
            srcSet={product.gallery.first.desktop} />
          <img
            className="product__gallery-image"
            src={product.gallery.first.desktop}
            alt={`First picture in the gallery of ${product.name}`} />
        </picture>
        <picture className="product__gallery-image-container product__gallery-image-container--second">
          <source
            media="(max-width: 768px)"
            srcSet={product.gallery.second.mobile} />
          <source
            media="(min-width: 768px) and (max-width: 1439px)"
            srcSet={product.gallery.second.tablet} />
          <source
            media="(min-width: 1440px)"
            srcSet={product.gallery.second.desktop} />
          <img
            className="product__gallery-image"
            src={product.gallery.second.mobile}
            alt={`Second picture in the gallery of ${product.name}`} />
        </picture>
        <picture className="product__gallery-image-container product__gallery-image-container--third">
          <source
            media="(max-width: 768px)"
            srcSet={product.gallery.third.mobile} />
          <source
            media="(min-width: 768px) and (max-width: 1439px)"
            srcSet={product.gallery.third.tablet} />
          <source
            media="(min-width: 1440px)"
            srcSet={product.gallery.third.desktop} />
          <img
            className="product__gallery-image"
            src={product.gallery.third.mobile}
            alt={`Third picture in the gallery of ${product.name}`} />
        </picture>
      </article>
      <article className="product__you-may-like">
        <h3 className="product__you-may-like-heading">Bunları da beğenebilirsiniz</h3>
        {product.others.map((other) => {
          return (
            <div key={other.name} className="product__you-may-like-item">
              <picture className="product__you-may-like-item-image-container">
                <source
                  media="(max-width: 768px)"
                  srcSet={other.image.mobile} />
                <source
                  media="(min-width: 768px) and (max-width: 1439px)"
                  srcSet={other.image.tablet} />
                <source
                  media="(min-width: 1440px)"
                  srcSet={other.image.desktop} />
                <img
                  className="product__you-may-like-item-image"
                  src={other.image.desktop}
                  alt={`Picture of ${other.name}`} />
              </picture>
              <h3 className="product__you-may-like-item-name">{other.name}</h3>
              <Button
                linkTo={`/product/${other.slug}`}
                kind="orange"
                buttonText="Ürünü gör" />
            </div>
          );
        })}
      </article>
    </section>
  );
}

export default ProductDetails;
