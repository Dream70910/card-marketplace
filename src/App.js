import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Marketplace from "./pages/Marketplace";
import MarketplaceCategories from "./pages/Marketplace/MarketplaceCategories";
import MarketplaceItemDetails from "./pages/Marketplace/MarketplaceItemDetails";
import MarketplaceCreateListing from "./pages/Marketplace/MarketplaceCreateListing";
import UserProfile from "./pages/UserProfile";
import Cart from "./pages/Cart";
import MarketplaceChat from "./pages/Marketplace/MarketplaceChat";
import Faq from "./pages/Faq";
import Support from "./pages/Support";
import Tickets from "./pages/Tickets";
import AdminLogin from "./pages/Admin/Login";
import Admin from "./pages/Admin";
import Navigator from "./components/commons/Navigator";
import { AuthProvider } from './context/authContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PrivateRoute from "./components/PrivateRoute";
import PaymentSettings from "./pages/PaymentSettings";
import MyListingsPage from "./pages/MyListingsPage";
import Layout from "./components/Layout";


function App() {
  return (
    <AuthProvider>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
      />

      <Router>

        <Navigator />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route
            path="/marketplace/categories"
            element={<MarketplaceCategories />}
          />
          <Route
            path="/marketplace/:cardId"
            element={<MarketplaceItemDetails />}
          />
          <Route path="/support" element={<Support />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/payment-settings" element={<PaymentSettings />} />

          <Route path="/my-listings" element={<MyListingsPage />} />

          <Route path="/purchase-sale" element={<Cart />} />
          <Route
            path="/marketplace/create-listing"
            element={<MarketplaceCreateListing />}
          />
          <Route path={`/marketplace/chat/:recipientId`} element={<MarketplaceChat />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
