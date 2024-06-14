import { createContext, useContext, useEffect, useReducer } from "react";

const CartContext = createContext();

const VAT_PERCENTAGE = 20;
const SHIPPING_PRICE_PER_ITEM = 50;

const initialState = {
  cartItems: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "cart/added":
      return {
        ...state,
        cartItems: [action.payload, ...state.cartItems],
      };
    case "cart/removedAll":
      return { ...state, cartItems: [] };
    case "cart/increasedAmount":
      return {
        ...state,
        cartItems: state.cartItems.map((cartItem) =>
          cartItem.product.id === action.payload
            ? { ...cartItem, amount: cartItem.amount + 1 }
            : cartItem
        ),
      };
    case "cart/decreasedAmount":
      return {
        ...state,
        cartItems: state.cartItems.map((cartItem) =>
          cartItem.product.id === action.payload
            ? {
                ...cartItem,
                amount:
                  cartItem.amount > 1 ? cartItem.amount - 1 : cartItem.amount,
              }
            : cartItem
        ),
      };
    default:
      throw new Error("Unknown action");
  }
};

const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(reducer, getInitialState());

  const { cartItems } = cartState;

  function getInitialState() {
    const data = localStorage.getItem("CART_STATE");
    const savedCartData = JSON.parse(data);
    return savedCartData || initialState;
  }

  useEffect(() => {
    const data = JSON.stringify(cartState);
    localStorage.setItem("CART_STATE", data);
  }, [cartState]);

  const cartItemsAmount = cartItems.reduce((acc, curr) => acc + curr.amount, 0);

  const cartTotalPrice = cartItems.reduce(
    (acc, curr) => acc + curr.product.price * curr.amount,
    0
  );

  const cartShippingPrice = cartItems.reduce(
    (acc, curr) => acc + curr.amount * SHIPPING_PRICE_PER_ITEM,
    0
  );

  const cartVat = (cartTotalPrice * VAT_PERCENTAGE) / 100;

  const cartGrandTotal = cartTotalPrice + cartShippingPrice + cartVat;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartItemsAmount,
        cartShippingPrice,
        cartTotalPrice,
        cartVat,
        cartGrandTotal,
        dispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);

  if (context === undefined)
    throw new Error("This context was used outside of CartProvider!");

  return context;
};

export { useCart, CartProvider };
