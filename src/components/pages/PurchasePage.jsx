import { useState, useEffect } from "react";
import ApiService from "../../service/ApiService";
import Layout from "../common/Layout";

const PurchasePage = () => {
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [productId, setProductId] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [description, setDescription] = useState("");
  const [note, setNote] = useState("");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");


  useEffect(() => {
    const fetchProductsAndSuppliers = async () => {

      try {
        const productData = await ApiService.getAllProducts();
        const supplierData = await ApiService.getAllSuppliers();
        setProducts(productData.products);
        setSuppliers(supplierData.suppliers);
      } catch (error) {
        showMessage(error.response?.data?.message || "Failed to get products and suppliers: " + error.message);
      }

    }

    fetchProductsAndSuppliers();
  }, [])

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 4000);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productId || !supplierId || !quantity) {
      showMessage("Please fill in all required fields");
      return;
    }

    const body = {
      productId,
      quantity: parseInt(quantity),
      supplierId,
      description,
      note
    }

    try {
      const resp = await ApiService.purchaseProduct(body);
      showMessage(resp.message);
      resetForm();
    } catch (error) {
      showMessage(error.response?.data?.message || "Failed to make purchase: " + error.message);
    }
  }

  const resetForm = () => {
    setProductId("");
    setQuantity("");
    setSupplierId("");
    setDescription("");
    setNote("");
  }


  return (
    <Layout>

      {message && <div className="message">{message}</div>}

      <div className="purchase-form-page">

        <h1>Receive Inventory</h1>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Product</label>
            <select
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
            >
              <option value="">
                Select a product
              </option>

              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Supplier</label>
            <select
            value={supplierId}
            onChange={(e) => setSupplierId(e.target.value)}
            required
            >
              <option value="">
                Select a supplier
              </option>

              {suppliers.map((supplier) => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Quantity</label>
            <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Note</label>
            <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <button type="submit">Purchase</button>

        </form>

      </div>

    </Layout>
  );

}

export default PurchasePage;
