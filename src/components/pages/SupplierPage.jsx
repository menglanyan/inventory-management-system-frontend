import { useState, useEffect } from "react";
import ApiService from "../../service/ApiService";
import Layout from "../common/Layout";
import { useNavigate } from "react-router-dom";


const SupplierPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all suppliers
    const getSuppliers = async () => {
      try {

        const resp = await ApiService.getAllSuppliers();
        if (resp.statusCode === 200) {
          setSuppliers(resp.suppliers);
        } else {
          showMessage(resp.message);
        }

      } catch (error) {
        showMessage(error.response?.data?.message || "Suppliers Not Found: " + error)
      }
    };

    getSuppliers();

  }, []);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 4000);
  }

  const handleDeleteCategory = async (supplierId) => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      try {
        await ApiService.deleteSupplier(supplierId);
        showMessage("Supplier Deleted Successfully");
        // Reload the page
        window.location.reload();
      } catch (error) {
        showMessage(error.response?.data?.message || "Failed to delete supplier: " + error);
      }
    }
  }



  return (
    <Layout>

      {message && <div className="message">{message}</div>}

      <div className="supplier-page">

        <div className="supplier-header">
          <h1>Suppliers</h1>
          <div className="add-sup">
            <button onClick={() => navigate("/add-supplier")}>Add Supplier</button>
          </div>
        </div>

      </div>

    {suppliers && (
      <ul className="supplier-list">

        {suppliers.map((supplier) => (
          <li className="supplier-item" key={supplier.id}>

            <span>{supplier.name}</span>

            <div className="supplier-actions">
              <button onClick={() => navigate(`/edit-supplier/${supplier.id}`)}>Edit</button>
              <button onClick={() => handleDeleteCategory(supplier.id)}>Delete</button>
            </div>

          </li>
        ))}

      </ul>
    )}

    </Layout>
  );

};

export default SupplierPage;