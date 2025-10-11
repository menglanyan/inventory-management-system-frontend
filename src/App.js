import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute, AdminRoute } from "./service/Guard";
import RegisterPage from "./components/auth/RegisterPage";
import LoginPage from "./components/auth/LoginPage";
import CategoryPage from "./components/pages/CategoryPage";
import SupplierPage from "./components/pages/SupplierPage";
import AddEditSupplierPage from "./components/pages/AddEditSupplierPage";
import ProductPage from "./components/pages/ProductPage";
import AddEditProductPage from "./components/pages/AddEditProductPage";
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

        

          
 
        </Routes>

    
    </BrowserRouter>
  )

}

export default App;

