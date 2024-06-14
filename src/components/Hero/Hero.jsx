import "../Hero/_Hero.css";

function Hero({ children, className }) {
  return <section className={`hero ${className}`}>{children}</section>;
}

export default Hero;
