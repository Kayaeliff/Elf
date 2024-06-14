import claimImageMobile from "/images/shared/mobile/image-best-gear.jpg";
import claimImageTablet from "/images/shared/tablet/image-best-gear.jpg";
import claimImageDesktop from "/images/shared/desktop/image-best-gear.jpg";
import "../Claim/_Claim.css";

function Claim({ className = "" }) {
  return (
    <section className={`claim ${className}`}>
      <picture className="claim__image-container">
        <source media="(max-width: 768px)" srcSet={claimImageMobile} />
        <source
          media="(min-width: 768px) and (max-width: 1439px)"
          srcSet={claimImageTablet} />
        <source media="(min-width: 1440px)" srcSet={claimImageDesktop} />
        <img
          className="claim__image"
          src={claimImageDesktop}
          alt="Person wearing headphones, right hand cuffing the right headphone driver." />
      </picture>
      <h2 className="claim__heading">
      Size <span>en iyi</span> ses donanımını sunuyoruz
      </h2>
      <p className="claim__body">
        Türkiye'nin kalbinde yer alan ELF önde gelen mağazadır.
        İleri teknoloji kulaklıklar, airpods, hoparlörler ve ses aksesuarları için. Biz
        sizin için geniş bir showroom ve lüks gösteri odaları var
        Geniş ürün yelpazemize göz atmak ve ürünlerimizi deneyimlemek için. Mağazamıza uğrayın
        Audiophile'ı en iyi yer haline getiren harika insanlardan bazılarıyla tanışmak
        Taşınabilir ses ekipmanınızı satın almak için.
      </p>
    </section>
  );
}

export default Claim;
