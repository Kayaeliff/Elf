import Main from "../../components/Main/Main";
import Hero from "../../components/Hero/Hero";
import ProductCategories from "../../components/ProductCategories/ProductCategories";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
import Claim from "../../components/Claim/Claim";
import Footer from "../../components/Footer/Footer";

import Button from "../../components/Button/Button";
import useTitle from "../../hooks/useTitle";
import "../Home/_Home.css";

function Home() {
  useTitle("Home");

  return (
    <>
    
      <Main className="home__main">
        <Hero className="home__hero">
       
          <p className="hero__overline overline">Yeni ürün</p>
          <h1 className="hero__heading">XX99 Mark II Kulaklıklar</h1>
          <p className="hero__body">
            Doğal, gerçekçi ses ve olağanüstü yapı kalitesini deneyimleyin
            tutkulu müzik meraklıları için üretilmiştir.
          </p>
          <Button
            linkTo="/product/xx99-mark-two-headphones"
            className="hero__link"
            kind="orange"
            buttonText="Ürünü gör" />
       
        </Hero>
        <ProductCategories className="home__product-categories" />
        <FeaturedProducts className="home__featured-products" />
        <Claim className="home__claim" />
      </Main>
     
      <Footer />
    </>
  );
}

export default Home;
