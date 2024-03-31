import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import UserPage from "./pages/UserPage";
import HomePage from "./pages/HomePage";

import "@fontsource/poppins"; // Defaults to weight 400
import "@fontsource/poppins/400.css"; // Specify weight
import "@fontsource/poppins/400-italic.css"; // Specify weight and style
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import PrivateRoutes from "./components/utils/PrivateRoutes";
import ProfilePage from "./pages/ProfilePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import AboutPage from "./pages/AboutPage";
import CartPage from "./pages/CartPage";
import ContactPage from "./pages/ContactPage";
import DashboardPage from "./pages/Admin/DashboardPage";
import CustomersPage from "./pages/Admin/CustomersPage";
import ProductsPage from "./pages/Admin/ProductsPage";
import OrdersPage from "./pages/Admin/OrdersPage";
import SettingsPage from "./pages/Admin/SettingsPage";

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId="692496984930-vs63scc0e53tm6lnvrmkvtrn3148o5r3.apps.googleusercontent.com">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/users/:id" element={<UserPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/product" element={<ProductDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/contact" element={<ContactPage />} />

            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;