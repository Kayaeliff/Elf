import { createContext, useContext, useReducer } from "react";

const AppContext = createContext();

const initialState = {
  isMenuOpen: false,
  isCartOpen: false,
  isBackdropShown: false,
  toastNotifications: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "all/closed":
      return {
        ...state,
        isBackdropShown: false,
        isMenuOpen: false,
        isCartOpen: false,
      };
    case "menu/toggled":
      return {
        ...state,
        isMenuOpen: action.payload,
        isBackdropShown: action.payload,
        isCartOpen: false,
      };
    case "cart/toggled":
      return {
        ...state,
        isCartOpen: action.payload,
        isBackdropShown: action.payload,
        isMenuOpen: false,
      };

    case "toast/added":
      return {
        ...state,
        toastNotifications: [...state.toastNotifications, action.payload],
      };

    case "toast/removed":
      return {
        ...state,
        toastNotifications: state.toastNotifications.filter(
          (toast) => toast.id !== action.payload.id
        ),
      };
    default:
      throw new Error("Unknown action");
  }
};

const AppProvider = ({ children }) => {
  const [
    { isMenuOpen, isCartOpen, isBackdropShown, toastNotifications },
    dispatch,
  ] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider
      value={{
        isMenuOpen,
        isCartOpen,
        isBackdropShown,
        toastNotifications,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useApp = () => {
  const context = useContext(AppContext);

  if (context === undefined)
    throw new Error("This context was used outside of AppProvider!");

  return context;
};

export { useApp, AppProvider };
