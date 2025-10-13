import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute, AdminRoute } from "./service/Guard";
import RegisterPage from "./components/auth/RegisterPage";
import LoginPage from "./components/auth/LoginPage";
import CategoryPage from "./components/pages/CategoryPage";
import SupplierPage from "./components/pages/SupplierPage";
import AddEditSupplierPage from "./components/pages/AddEditSupplierPage";
import ProductPage from "./components/pages/ProductPage";
import AddEditProductPage from "./components/pages/AddEditProductPage";
import PurchasePage from "./components/pages/PurchasePage";
import SellPage from "./components/pages/SellPage";
import TransactionsPage from "./components/pages/TransactionsPage";
import TransactionDetailsPage from "./components/pages/TransactionDetailsPage";
import ProfilePage from "./components/pages/ProfilePage";
import DashboardPage from "./components/pages/DashboardPage";





function App() {

  return (
    <BrowserRouter>

        <Routes>
          
          {/* AUTH PAGES */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          

          {/* ADMIN ROUTES */}
          <Route path="/category" element={<AdminRoute element={<CategoryPage />} />} />
          <Route path="/supplier" element={<AdminRoute element={<SupplierPage />} />} />
          <Route path="/add-supplier" element={<AdminRoute element={<AddEditSupplierPage />} />} />
          <Route path="/edit-supplier/:supplierId" element={<AdminRoute element={<AddEditSupplierPage />} />} />
          <Route path="/product" element={<AdminRoute element={<ProductPage />} />} />
          <Route path="/add-product" element={<AdminRoute element={<AddEditProductPage />} />} />
          <Route path="/edit-product/:productId" element={<AdminRoute element={<AddEditProductPage />} />} />


          {/* ADMIN AND MANAGER ROUTES */}
          <Route path="/purchase" element={<ProtectedRoute element={<PurchasePage />} />} />
          <Route path="/sell" element={<ProtectedRoute element={<SellPage />} />} />
          <Route path="/transaction" element={<ProtectedRoute element={<TransactionsPage />} />} />
          <Route path="/transaction/:transactionId" element={<ProtectedRoute element={<TransactionDetailsPage />} />} />
          <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<DashboardPage />} />} />


          <Route path="*" element={<LoginPage />} />
          
        </Routes>

    </BrowserRouter>
  )

}

export default App;

