import { useNavigate, useParams } from "react-router";
import { v4 as uuidv4 } from "uuid";

import Main from "../../components/Main/Main";
import Button from "../../components/Button/Button";

import ProductCategories from "../../components/ProductCategories/ProductCategories";
import Claim from "../../components/Claim/Claim";
import Footer from "../../components/Footer/Footer";
import ProductDetails from "../../components/ProductDetails/ProductDetails";

import { products } from "../../../data";
import useTitle from "../../hooks/useTitle";
import "../Product/_Product.css";

function Product() {
  const { productName } = useParams();

  const navigate = useNavigate();

  const product = products.find((product) => product.slug === productName);

  useTitle(product.name);

  return (
    <>
      <Main key={uuidv4()} className="product__main">
        <Button
          isLink={false}
          onClick={() => navigate(-1)}
          className="product__back-button"
          kind="text"
          buttonText="Geri dön" />
        <ProductDetails product={product} />
        <ProductCategories className="product__product-categories" />
        <Claim className="product__claim" />
      </Main>
      <Footer />
    </>
  );
}

export default Product;
