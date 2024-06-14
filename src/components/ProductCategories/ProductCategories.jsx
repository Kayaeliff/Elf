import { AnimatePresence, motion } from "framer-motion";

import { useApp } from "../../contexts/AppContext/AppContext";

import Button from "../Button/Button";

import headphonesCategoryImage from "/images/shared/desktop/image-category-thumbnail-headphones.png";
import speakersCategoryImage from "/images/shared/desktop/image-category-thumbnail-speakers.png";
import earphonesCategoryImage from "/images/shared/desktop/image-category-thumbnail-earphones.png";

import "../ProductCategories/_ProductCategories.css";

function ProductCategories({ isAnimated = false, className = "" }) {
  const { dispatch } = useApp();

  return (
    <section className={`product-categories ${className}`}>
      <AnimatePresence>
        <motion.div
          key={1}
          initial={isAnimated ? { opacity: 0 } : { opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={isAnimated ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="product-category"
        >
          <img
            className="product-category__image"
            src={headphonesCategoryImage}
            alt="An image on headphones" />
          <p className="product-category__category-name">Kulaklıklar</p>
          <Button
            className="product-category__link"
            kind="right-arrow"
            buttonText="Alışveriş"
            linkTo="/headphones"
            onClick={() => dispatch({ type: "all/closed" })} />
        </motion.div>
        <motion.div
          key={2}
          initial={isAnimated ? { opacity: 0 } : { opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={isAnimated ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="product-category"
        >
          <img
            className="product-category__image"
            src={speakersCategoryImage}
            alt="An image of a singular speaker." />
          <p className="product-category__category-name">Hoparlörler</p>
          <Button
            className="product-category__link"
            kind="right-arrow"
            buttonText="Alışveriş"
            linkTo="/speakers"
            onClick={() => dispatch({ type: "all/closed" })} />
        </motion.div>
        <motion.div
          key={3}
          initial={isAnimated ? { opacity: 0 } : { opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={isAnimated ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="product-category"
        >
          <img
            className="product-category__image"
            src={earphonesCategoryImage}
            alt="An image of earphone case." />
          <p className="product-category__category-name">Airport</p>
          <Button
            className="product-category__link"
            kind="right-arrow"
            buttonText="Alışveriş"
            linkTo="/earphones"
            onClick={() => dispatch({ type: "all/closed" })} />
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

export default ProductCategories;
