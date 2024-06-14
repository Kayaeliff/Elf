import ProductItem from "../ProductItem/ProductItem";
import "../ProductList/_ProductList.css";

function ProductList({ className = "", products }) {
  return (
    <section className={`product-list ${className}`}>
      {products.map((product) => {
        return <ProductItem key={product.id} product={product} />;
      })}
    </section>
  );
}

export default ProductList;
