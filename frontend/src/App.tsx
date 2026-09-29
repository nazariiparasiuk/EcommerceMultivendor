import React, { use, useEffect } from 'react';
import logo from './logo.svg';
import { Button, ThemeProvider } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Navbar from './customer/components/Navbar/Navbar';
import customTheme from './Theme/customTheme';
import Home from './customer/pages/Home/Home';
import Product from './customer/pages/Product/Product';
import ProductDetails from './customer/pages/PageDetails/ProductDetails';
import Review from './customer/pages/Review/Review';
import Cart from './customer/pages/Cart/Cart';
import Checkout from './customer/pages/Checkout/Checkout';
import Account from './customer/pages/Account/Account';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Reviews } from '@mui/icons-material';
import BecomeSeller from './customer/pages/Become Seller/BecomeSeller';
import SellerDashboard from './seller/pages/SellerDashboard/SellerDashboard';
import AdminDashboard from './admin/Pages/Dashboard/AdminDashboard';
import { fetchProducts } from './State/fetchProduct';
import store, { useAppDispatch, useAppSelector } from './State/Store';
import { fetchSellerProfile } from './State/seller/sellerSlice';
import { fetchUserProfile } from './State/AuthSlice';
import PaymentSuccess from './customer/pages/PaymentSuccess';
import Wishlist from './customer/wishlist/Wishlist';
import { createHomeCategories } from './State/customer/customerSlice';
import { homeCategories } from './data/homeCategories';
import SearchResults from './customer/pages/Search/SearchResult';
import { fetchCategories } from './State/customer/categorySlice';
import Footer from './customer/components/Footer/Footer';
import { getWishlistByUserId } from './State/customer/wishlistSlice';
import Register from './customer/pages/Auth/Register';
import ResetPassword from './customer/pages/Auth/ResetPassword';
import SellerSignIn from './customer/pages/Auth/SellerSignIn';
import SignIn from './customer/pages/Auth/SignIn';

const AUTH_PAGES = ['/login', '/register', '/reset-password', '/seller-login', '/become-seller'];

function App() {
  const dispatch = useAppDispatch();
  const {seller,auth} = useAppSelector(store => store);
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthPage = AUTH_PAGES.includes(location.pathname);

  useEffect(() => {
    dispatch(fetchSellerProfile(localStorage.getItem("jwt") || ""));
    dispatch(createHomeCategories(homeCategories));
    dispatch(fetchCategories());
  }, []);

  useEffect(() => {
    if(seller.profile) {
      navigate("/seller");
    }
  }, [seller.profile]);

  useEffect(() => {
    dispatch(fetchUserProfile({jwt: auth.jwt || localStorage.getItem("jwt")}));
  }, [auth.jwt]);

  useEffect(() => {
    if (auth.user) {
      dispatch(getWishlistByUserId());
    }
  }, [auth.user]);

  return (
    <ThemeProvider theme={customTheme}>
      <div>
        {!isAuthPage && <Navbar/>}
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<SignIn/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/reset-password" element={<ResetPassword/>}/>
          <Route path="/seller-login" element={<SellerSignIn/>}/>
          <Route path="/products/:category" element={<Product/>}/>
          <Route path="/reviews/:productId" element={<Reviews/>}/>
          <Route path="/product-details/:categoryId/:name/:productId" element={<ProductDetails/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/wishlist" element={<Wishlist/>}/>
          <Route path="/checkout" element={<Checkout/>}/>
          <Route path="/payment-success/:orderId" element={<PaymentSuccess/>}/>
          <Route path="/become-seller" element={<BecomeSeller/>}/>
          <Route path="/account/*" element={<Account/>}/>
          <Route path="/seller/*" element={<SellerDashboard/>}/>
          <Route path="/admin/*" element={<AdminDashboard/>}/>
          <Route path="/search" element={<SearchResults/>}/>
        </Routes>
        {!isAuthPage && <Footer/>}
      </div>
    </ThemeProvider>
  );
}

export default App;

