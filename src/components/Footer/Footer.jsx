import { NavLink } from "react-router-dom";

import "../Footer/_Footer.css";

const Footer = ({ className = "" }) => {
  return (
    <footer className={`footer ${className}`}>
      <h2> E.L.F </h2>
      <nav id="footer-navigation" className="footer__navigation">
        <ul className="footer__link-list">
          <li className="footer__link">
            <NavLink to="/home">Anasayfa</NavLink>
          </li>
          <li className="footer__link">
            <NavLink to="/headphones">Kulaklıklar</NavLink>
          </li>
          <li className="footer__link">
            <NavLink to="/speakers">Hoparlörler</NavLink>
          </li>
          <li className="footer__link">
            <NavLink to="/earphones">Airpods</NavLink>
          </li>
        </ul>
      </nav>
      <p className="footer__body">
        ELF, ses ihtiyaçlarınızı karşılamak için hepsi bir arada bir duraktır. Biz biriz
        kendini adamış müzik severler ve ses uzmanlarından oluşan küçük bir ekip
        kişisel sesten en iyi şekilde yararlanmanıza yardımcı olur. Gelin ve demomuzu ziyaret edin
        tesis - haftanın 7 günü açığız.
      </p>
      <p className="footer__copyright">
      Telif Hakkı {new Date().getFullYear()}. Tüm hakları saklıdır.
      </p>
      <div className="footer__social-container">
        
        <a
          className="footer__social-link footer__social-link--facebook"
          href="#"
        >

          <p>Facebook</p>
        </a>
        <a
          className="footer__social-link footer__social-link--twitter"
          href="#"
        >
          <p>Twitter</p>
        </a>
        <a
          className="footer__social-link footer__social-link--instagram"
          href="#"
        >
          <p>Instagram</p>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
