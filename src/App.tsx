import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";
import UserPage from "./pages/UserPage";
import HomePage from "./pages/HomePage";

import "@fontsource/poppins"; // Defaults to weight 400
import "@fontsource/poppins/400.css"; // Specify weight
import "@fontsource/poppins/400-italic.css"; // Specify weight and style
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import PrivateRoutes, {
  PrivateAdminRoutes,
} from "./components/utils/PrivateRoutes";
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
import AddEditProductPage from "./pages/Admin/AddEditProductPage";
import CategoriesPage from "./pages/Admin/CategoriesPage";
import SearchPage from "./pages/SearchPage";
import { Categories } from "./components/constants/categories";
import LandingCategoryPage from "./pages/LandingCategoryPage";
import AdminLoginPage from "./pages/Admin/AdminLoginPage";

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <GoogleOAuthProvider clientId="692496984930-vs63scc0e53tm6lnvrmkvtrn3148o5r3.apps.googleusercontent.com">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/users/:id" element={<UserPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/product" element={<ProductDetailPage />} />
            <Route path="/about" element={<AboutPage />} />

            <Route path="/contact" element={<ContactPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/admin-login" element={<AdminLoginPage />} />
            {Categories.map((category: any) => {
              return (
                <Route
                  path={`/category/${category.value}`}
                  element={<LandingCategoryPage type={category.value} />}
                />
              );
            })}

            <Route element={<PrivateRoutes />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/cart" element={<CartPage />} />
            </Route>

            <Route element={<PrivateAdminRoutes />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/customers" element={<CustomersPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route
                path="/products/create"
                element={<AddEditProductPage type="create" />}
              />
              <Route
                path="/products/edit/:id"
                element={<AddEditProductPage type="edit" />}
              />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
