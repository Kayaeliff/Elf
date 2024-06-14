import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AppProvider } from "./contexts/AppContext/AppContext";

import { CartProvider } from "./contexts/CartContext/CartContext";

import Navigation from "./components/Navigation/Navigation";
import Home from "./pages/Home/Home";
import ProductCategoryPage from "./pages/ProductCategoryPage/ProductCategoryPage";
import Product from "./pages/Product/Product";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Checkout from "./pages/Checkout/Checkout";

import ToastList from "./components/ToastList/ToastList";




const App = () => {
  
  return (
    <>
      <BrowserRouter>
        <ScrollToTop>
          <AppProvider>
            <CartProvider>
              <Navigation />
              <ToastList />
              <Routes>
                <Route index path="/home" element={<Home />} />
                <Route path="/" element={<Navigate to="/home" />} />
                <Route
                  path="/headphones"
                  element={<ProductCategoryPage productCategory="headphones" />}
                />
                <Route
                  path="/earphones"
                  element={<ProductCategoryPage productCategory="earphones" />}
                />
                <Route
                  path="/speakers"
                  element={<ProductCategoryPage productCategory="speakers" />}
                />
                <Route path="/product/:productName" element={<Product />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </CartProvider>
          </AppProvider>
        </ScrollToTop>
      </BrowserRouter>
    </>
  );
};

export default App;
