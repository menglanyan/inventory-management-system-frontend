import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import Layout from "../common/Layout";
import PaginationComponent from "../common/PaginationComponent";


const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // Pagination set-up
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    
    const getProducts = async () => {

      try {
        const productData = await ApiService.getAllProducts();

        if (productData.statusCode === 200) {
          setTotalPages(Math.ceil(productData.products.length / itemsPerPage));

          setProducts(productData.products.slice(
            (currentPage - 1) * itemsPerPage, currentPage * itemsPerPage
          ));
        } 
      } catch (error) {
        showMessage(error.response?.data?.message || "Failed to get products: " + error.message);
      }

    };

    getProducts();
  }, [currentPage]);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 4000);
  }

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {

      try {
        await ApiService.deleteProduct(productId);
        showMessage("Product Deleted Successfully");
        // Reload the page
        window.location.reload();
      } catch (error) {
        showMessage(error.response?.data?.message || "Failed to delete product: " + error.message);
      }

    }
  }

  return (
    <Layout>

      {message && <div className="message">{message}</div>}

      <div className="product-page">

        <div className="product-header">
          <h1>Products</h1>
          <button className="add-product-btn" onClick={() => navigate("/add-product")}>Add Product</button>
        </div>

        {products && (
        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product-item">

              <img
                className="product-image"
                src={product.imageUrl}
                alt={product.name}
              />

              <div className="product-info">
                <h3 className="name">{product.name}</h3>
                <p className="sku">Sku: {product.sku}</p>
                <p className="price">Price: {product.price}</p>
                <p className="quantity">Quantity: {product.stockQuantity}</p>
              </div>

              <div className="product-actions">
                <button className="edit-btn" onClick={() => navigate(`/edit-product/${product.id}`)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
              </div>

            </div>
          ))}
        </div>
        )}

      </div>

      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

    </Layout>
  );

}

export default ProductPage;