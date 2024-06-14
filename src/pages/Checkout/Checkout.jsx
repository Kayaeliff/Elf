import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import "../Checkout/_Checkout.css";

import { useCart } from "../../contexts/CartContext/CartContext";

import Button from "../../components/Button/Button";
import Main from "../../components/Main/Main";
import Footer from "../../components/Footer/Footer";
import Modal from "../../components/Modal/Modal";

import checkoutOrderConfirmIcon from "/images/checkout/icon-order-confirmation.svg";
import cashOnDeliveryIcon from "/images/checkout/icon-cash-on-delivery.svg";
import Input from "../../components/Input/Input";
import useTitle from "../../hooks/useTitle";

import { numberToCurrency } from "../../utils/helpers";

function Checkout() {
  const [inputs, setInputs] = useState({ paymentMethod: "cashOnDelivery" });
  const [isCheckoutModalShowAll, setCheckoutModalShowAll] = useState(false);

  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const order = useRef();
  const orderGrantTotal = useRef();

  const navigate = useNavigate();

  useTitle("Ödeme");

  const {
    cartItems, cartItemsAmount, cartTotalPrice, cartShippingPrice, cartVat, cartGrandTotal, dispatch: dispatchCart,
  } = useCart();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!cartItemsAmount) {
      return;
    }

    order.current = cartItems;
    orderGrantTotal.current = cartGrandTotal;

    dispatchCart({ type: "cart/removedAll" });

    setIsCheckoutModalOpen(true);

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    console.log({ userInfo: inputs, userOrder: cartItems });
  };

  return (
    <>
      <Main className="checkout__main">
        <Button
          isLink={false}
          onClick={() => navigate(-1)}
          className="checkout__back-button"
          kind="text"
          buttonText="Alışverişe devam et" />
        <form onSubmit={handleSubmit} className="checkout__form-container">
          <div className="checkout__form-info-container">
            <h2>Ödeme</h2>
            <div className="checkout__form-billing-details">
              <p className="sub-title">Fatura Detayları</p>
              <Input
                id="name"
                type="text"
                isRequired={true}
                labelText="İsim"
                onChange={handleChange}
                checks={["valueMissing"]}
                errorMessage="This field is required."
                inputProps={{
                  placeholder: "Elif KAYA",
                  autoComplete: "name",
                  value: inputs.name || "",
                }} />
              <Input
                id="email"
                type="email"
                isRequired={true}
                labelText="E-mail adresi"
                onChange={handleChange}
                checks={["typeMismatch", "valueMissing"]}
                errorMessage="Wrong format."
                inputProps={{
                  placeholder: "alexei@mail.com",
                  autoComplete: "email",
                  value: inputs.email || "",
                }} />
              <Input
                id="phone"
                type="tel"
                isRequired={true}
                labelText="Telefon numarası"
                onChange={handleChange}
                checks={["valueMissing"]}
                errorMessage="This field is required."
                inputProps={{
                  placeholder: "+90 xxx-xxx-xxxx",
                  autoComplete: "tel",
                  value: inputs.phone || "",
                }} />
            </div>
            <div className="checkout__form-shipping-info">
              <p className="sub-title">Gönderim Bilgileri</p>
              <Input
                id="adres"
                type="text"
                isRequired={true}
                labelText="Teslimat Adresi"
                onChange={handleChange}
                checks={["valueMissing"]}
                errorMessage="This field is required."
                inputProps={{
                  placeholder: "1137 Williams Avenue",
                  autoComplete: "teslimat adresi",
                  value: inputs.adres || "",
                }} />
              <Input
                id="zip"
                type="text"
                isRequired={true}
                labelText="Posta Kodu"
                onChange={handleChange}
                checks={["valueMissing"]}
                errorMessage="This field is required."
                inputProps={{
                  placeholder: "10001",
                  autoComplete: "postal-code",
                  value: inputs.zip || "",
                }} />
              <Input
                id="city"
                type="text"
                isRequired={true}
                labelText="Şehir"
                onChange={handleChange}
                checks={["valueMissing"]}
                errorMessage="This field is required."
                inputProps={{
                  placeholder: "İstanbul",
                  autoComplete: "Şehir",
                  value: inputs.city || "",
                }} />
              <Input 
                id="country"
                type="text"
                isRequired={true}
                labelText="Ülke"
                onChange={handleChange}
                checks={["valueMissing"]}
                errorMessage="This field is required."
                inputProps={{
                  placeholder: "Türkiye",
                  autoComplete: "Ülke",
                  value: inputs.country || "",
                }} />
                

            </div>
            <div className="checkout__form-payment-details">
              <p className="sub-title">Ödeme detayları</p>
              <p>Ödeme yöntemi</p>
              <Input
                type="radio"
                labelText="Kredi Kartı"
                onChange={handleChange}
                id="e-money"
                inputProps={{
                  checked: inputs.paymentMethod === "kredi kartı",
                  value: "kredi kartı",
                  name: "paymentMethod",
                }} />
              <Input
                type="radio"
                labelText="Kapıda ödeme"
                onChange={handleChange}
                id="cash-on-delivery"
                inputProps={{
                  checked: inputs.paymentMethod === "Kapıda ödeme",
                  value: "Kapıda ödeme",
                  name: "paymentMethod",
                }} />
            </div>
            {inputs.paymentMethod === "Kapıda ödeme" && (
              <div className="checkout__form-payment-cash-on-delivery-info">
                <img
                  src={cashOnDeliveryIcon}
                  alt="Minimalistic icon depicting a person paying on delivery." />
                <p>
                  Kapıda Ödeme' seçeneği, ödemenizi istediğiniz zaman nakit olarak yapmanızı sağlar.
                  Teslimat kuryemiz evinize varır. Sadece emin ol
                  adresiniz doğru olduğundan siparişiniz verilmeyecektir
                  iptal edildi.
                </p>
              </div>
            )}
            {inputs.paymentMethod === "kredi kartı" && (
              <div className="checkout__form-payment-e-money-inputs-container">
                <Input
                  id="eMoneyNumber"
                  type="text"
                  isRequired={true}
                  labelText="Kart Numarası"
                  onChange={handleChange}
                  checks={["tooShort", "tooLong", "valueMissing"]}
                  errorMessage="Input must be 9 numbers."
                  inputProps={{
                    maxLength: 9,
                    minLength: 9,
                    placeholder: "238521993",
                    type: "text",
                    value: inputs.eMoneyNumber || "",
                  }} />
                <Input
                  id="eMoneyPin"
                  type="text"
                  isRequired={true}
                  labelText="CVV"
                  onChange={handleChange}
                  checks={["tooShort", "tooLong", "valueMissing"]}
                  errorMessage="Input must be 4 numbers."
                  inputProps={{
                    maxLength: 4,
                    minLength: 4,
                    placeholder: "6891",
                    value: inputs.eMoneyPin || "",
                  }} />
              </div>
            )}
          </div>
          <div className="checkout__form-summary-container">
            <h6>Özet</h6>
            <div className="checkout__form-summary-items-container">
              {cartItems.length === 0 && <p>Sepetiniz boş.</p>}
              {!!cartItems.length &&
                cartItems.map((cartItem) => (
                  <div
                    key={cartItem.product.id}
                    className="checkout__form-summary-item"
                  >
                    <img
                      className="checkout__form-summary-item-image"
                      src={cartItem.product.image.mobile}
                      alt={`Picture of ${cartItem.product.name}`} />
                    <div className="checkout__form-sumamry-item-info">
                      <p className="checkout__form-summary-item-name">
                        {cartItem.product.cartName}
                      </p>
                      <p className="checkout__form-summary-item-price">
                        {numberToCurrency(cartItem.product.price)}
                      </p>
                    </div>
                    <p className="checkout__form-summary-item-amount">
                      x{cartItem.amount}
                    </p>
                  </div>
                ))}
            </div>
            <div className="checkout__form-summary-price-container">
              <div className="checkout__form-summary-price-kind">
                <p className="checkout__form-summary-price-kind-name">Toplam</p>
                <p className="checkout__form-summary-price-kind-amount">
                  {numberToCurrency(cartTotalPrice)}
                </p>
              </div>
              <div className="checkout__form-summary-price-kind">
                <p className="checkout__form-summary-price-kind-name">
                  Kargo
                </p>
                <p className="checkout__form-summary-price-kind-amount">
                  {numberToCurrency(cartShippingPrice)}
                </p>
              </div>
              <div className="checkout__form-summary-price-kind">
                <p className="checkout__form-summary-price-kind-name">
                  KDV (dahil)
                </p>
                <p className="checkout__form-summary-price-kind-amount">
                  {numberToCurrency(cartVat)}
                </p>
              </div>
              <div className="checkout__form-summary-price-kind grand-total">
                <p className="checkout__form-summary-price-kind-name grand-total">
                  Genel Toplam
                </p>
                <p className="checkout__form-summary-price-kind-amount grand-total">
                  {numberToCurrency(cartGrandTotal)}
                </p>
              </div>
            </div>
            <Button
              isDisabled={!cartItemsAmount}
              isLink={false}
              type="submit"
              kind="orange"
              buttonText={!cartItemsAmount ? "Your cart is empty" : "Devam et & öde"} />
          </div>
        </form>
      </Main>
      <Footer className="checkout__footer" />
      {isCheckoutModalOpen && (
        <Modal>
          <img
            className="checkout__modal-icon"
            src={checkoutOrderConfirmIcon}
            alt="Icon with a white check mark inside of an orange circle" />
          <div className="checkout__modal-header">
            <h3 className="checkout__modal-heading">
              Siparişiniz için <br /> teşekkürler
            </h3>
            <p className="checkout__modal-body">
              Kısa süre içinde bir e-posta onayı alacaksınız.
            </p>
          </div>
          <div className="checkout__modal-summary">
            <div className="checkout__modal-summary-items">
              {order.current.length > 0 ? (
                <>
                  <div className="checkout__modal-summary-item">
                    <img
                      className="checkout__form-summary-item-image"
                      src={order.current.at(0).product.image.mobile}
                      alt={`Picture of ${order.current.at(0).product.name}`} />
                    <div className="checkout__form-sumamry-item-info">
                      <p className="checkout__form-summary-item-name">
                        {order.current.at(0).product.cartName}
                      </p>
                      <p className="checkout__form-summary-item-price">
                        {numberToCurrency(order.current.at(0).product.price)}
                      </p>
                    </div>
                    <p className="checkout__form-summary-item-amount">
                      x{order.current.at(0).amount}
                    </p>
                  </div>
                  {isCheckoutModalShowAll &&
                    order.current.slice(1).map((item) => {
                      return (
                        <div
                          key={item.product.id}
                          className="checkout__modal-summary-item"
                        >
                          <img
                            className="checkout__form-summary-item-image"
                            src={item.product.image.mobile}
                            alt={`Picture of ${item.product.name}`} />
                          <div className="checkout__form-sumamry-item-info">
                            <p className="checkout__form-summary-item-name">
                              {item.product.cartName}
                            </p>
                            <p className="checkout__form-summary-item-price">
                              {numberToCurrency(item.product.price)}
                            </p>
                          </div>
                          <p className="checkout__form-summary-item-amount">
                            x{item.amount}
                          </p>
                        </div>
                      );
                    })}
                  {order.current.length > 1 && (
                    <div className="checkout__modal-summary-other-items">
                      <Button
                        onClick={() => setCheckoutModalShowAll((curr) => !curr)}
                        isLink={false}
                        kind="text"
                        buttonText={!isCheckoutModalShowAll
                          ? `and other ${order.current.length - 1} item(s)`
                          : "Show less"}
                      ></Button>
                    </div>
                  )}
                </>
              ) : (
                "Sepetiniz boş!"
              )}
            </div>
            <div className="checkout__modal-summary-total">
              <p>Genel Toplam</p>
              <h6>
                {orderGrantTotal.current
                  ? numberToCurrency(orderGrantTotal.current)
                  : "N/A"}
              </h6>
            </div>
          </div>
          <Button kind="orange" linkTo="/home" buttonText="Anasayfaya dön" />
        </Modal>
      )}
    </>
  );
}

export default Checkout;
