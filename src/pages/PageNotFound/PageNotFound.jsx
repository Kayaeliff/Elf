import useTitle from "../../hooks/useTitle";

import Main from "../../components/Main/Main";
import Button from "../../components/Button/Button";
import "../PageNotFound/_PageNotFound.css";
function PageNotFound() {
  useTitle("404");

  return (
    <Main className="page-not-found__main">
      <p className="page-not-found__error-code">404</p>
      <p className="page-not-found__body">Sayfa bulunamadı</p>
      <Button
        linkTo={"/home"}
        kind="right-arrow"
        buttonText={"Anasayfaya git"} />
    </Main>
  );
}

export default PageNotFound;
