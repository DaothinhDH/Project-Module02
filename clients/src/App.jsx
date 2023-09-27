import { Route, Routes } from "react-router-dom";
import "./assets/styles/main.css";
import Home from "./pages/public/homePages/Home";
import Contact from "./pages/public/contact/Contact";
import About from "./pages/public/about/About";
import Login from "./pages/public/login/Login";
import Register from "./pages/public/register/Register";
import HomeIndex from "./pages/public/homePages/HomeIndex";
import PrivateRouter from "./pages/private/PrivateRouter";
import Category from "./pages/private/category/Category";
import Order from "./pages/private/order/Order";
import Product from "./pages/private/product/Product";
import User from "./pages/private/user/User";
import Cart from "./pages/private/cart/Cart";
import Home_Admin from "./pages/private/Home_Admin";
import CartDetail from "./pages/public/shoppingcartdetails/ProductDetail";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductDetail from "./pages/public/shoppingcartdetails/ProductDetail";
import Products from "./pages/public/productLists/Products";
import NotFound from "./pages/notfound/NotFound";

function App() {
  const [cartLength, setCartLength] = useState(0);
  const [isLoad, setIsLoad] = useState(false);

  const cartUser = JSON.parse(localStorage.getItem("cartUser")) || -1;

  const handleSetCartLength = async () => {
    // console.log(cartUser);
    if (cartUser == -1) {
      return;
    } else {
      const res = await axios.get(`http://localhost:3000/carts/${cartUser.id}`);
      const cart = res.data.cart;
      setCartLength(cart.length);
    }
  };

  useEffect(() => {
    handleSetCartLength();
  }, [isLoad]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home cartLength={cartLength} />}>
          <Route index element={<HomeIndex setIsLoad={setIsLoad} />} />
          <Route path="/product_list" element={<Products />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart setIsLoad={setIsLoad} />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />

        <Route path="/admin" element={<PrivateRouter />}>
          <Route index element={<Home_Admin />} />
          <Route path="category" element={<Category />} />
          <Route path="oder" element={<Order />} />
          <Route path="product" element={<Product />} />
          <Route path="user" element={<User />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
