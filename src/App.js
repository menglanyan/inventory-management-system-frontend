import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "./components/common/Sidebar";
import { ProtectedRoute, AdminRoute } from "./service/Guard";
import RegisterPage from "./components/auth/RegisterPage";
import LoginPage from "./components/auth/LoginPage";



function App() {

  return (
    <BrowserRouter>


        <Routes>
          
          {/* AUTH PAGES */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

 
        </Routes>

    
    </BrowserRouter>
  )

}

export default App;

