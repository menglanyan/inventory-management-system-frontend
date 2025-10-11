import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiService from "../../service/ApiService";
import Layout from "../common/Layout";

const AddEditSupplierPage = () => {
  const {supplierId} = useParams("");
  const [name, setName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();
  

  useEffect(() => {

    if (supplierId) {
      setIsEditing(true);

      const fetchSupplier = async () => {
        try {
          const resp = await ApiService.getSupplierById(supplierId);

          if (resp.statusCode === 200) {
            setName(resp.supplier.name);
            setContactInfo(resp.supplier.contactInfo);
            setAddress(resp.supplier.address);
          }
        } catch (error) {
          showMessage(error.response?.data?.message || "Failed to get the supplier: " + error);
        }
      };
      fetchSupplier();
    }
  
  }, [supplierId]);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 4000);
  }

  // Handle form submission for both add and edit supplier
  const handleSubmit = async (e) => {
    e.preventDefault();
    const supplierData = {name, contactInfo, address};

    try {
      
      if (isEditing) {
        await ApiService.updateSupplier(supplierId, supplierData);
        showMessage("Supplier Updated Successfully");
        navigate("/supplier");
      } else {
        await ApiService.addSupplier(supplierData);
        showMessage("Supplier Added Successfully");
        navigate("/supplier");
      }

    } catch (error) {
      showMessage(error.response?.data?.message || "Fail: " + error);
    }
  }

  return (
    <Layout>

      {message && <div className="message">{message}</div>}

      <div className="supplier-form-page">
        <h1>{isEditing ? "Edit Supplier" : "Add Supplier"}</h1>
        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required></input>
          </div>
          
          <div className="form-group">
            <label>Contact Info</label>
            <input type="tel" value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} required></input>
          </div>

          <div className="form-group">
            <label>Address</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required></input>
          </div>

          <button type="submit">Save</button>

        </form>
      </div>

    </Layout>
  );

};

export default AddEditSupplierPage;
