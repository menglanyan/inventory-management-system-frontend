import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../common/Layout";
import ApiService from "../../service/ApiService";


const TransactionDetailsPage = () => {
  const {transactionId} = useParams();
  const [transaction, setTransaction] = useState(null);
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {

    const getTransaction = async () => {
      try {

        const transactionData = await ApiService.getTransactionById(transactionId);

        if (transactionData.statusCode === 200) {
          setTransaction(transactionData.transaction);
          setStatus(transactionData.transaction.status);
        }

      } catch (error) {
        showMessage(error.response?.data?.message || "Failed to get transaction: " + error.message);
      }
    }

    getTransaction();
  }, [transactionId]);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 4000);
  }

  // Update transaction status
  const handleUpdateStatus = async () => {
    try {
      await ApiService.updateTransactionStatus(transactionId, status);
      navigate("/transaction");
    } catch (error) {
      showMessage(error.response?.data?.message || "Failed to update transaction status: " + error.message);
    }
  }

  return (
    <Layout>

      {message && <div className="message">{message}</div>}

      <div className="transaction-details-page">
        {transaction && (
          <>

            <div className="section-card">
              <h2>Transaction Information</h2>
              <p>Type: {transaction.transactionType}</p>
              <p>Status: {transaction.status}</p>
              <p>Description: {transaction.description}</p>
              <p>Note: {transaction.note}</p>
              <p>Total Products: {transaction.totalProducts}</p>
              <p>Total Price: {transaction.totalPrice.toFixed(2)}</p>
              <p>Created At: {new Date(transaction.createdAt).toLocaleString()}</p>

              {transaction.updatedAt && (
                <p>Updated At: {new Date(transaction.updatedAt).toLocaleString()}</p>
              )}
            </div>

            <div className="section-card">
              <h2>Product Information</h2>
              <p>Name: {transaction.product.name}</p>
              <p>Sku: {transaction.product.sku}</p>
              <p>Price: {transaction.product.price.toFixed(2)}</p>
              <p>Stock Quantity: {transaction.product.stockQuantity}</p>
              <p>Description: {transaction.product.description}</p>

              {transaction.product.imageUrl && (
                <img src={transaction.product.imageUrl} alt={transaction.product.name} />
              )}
            </div>

            <div className="section-card">
              <h2>User Information</h2>
              <p>Name: {transaction.user.name}</p>
              <p>Email: {transaction.user.email}</p>
              <p>Phone Number: {transaction.user.phoneNumber}</p>
              <p>Role: {transaction.user.role}</p>
              <p>Create At: {new Date(transaction.createdAt).toLocaleString()}</p>
            </div>

          {transaction.supplier && (
           <div className="section-card">
            <h2>Supplier Information</h2>
            <p>Name: {transaction.supplier.name}</p>
            <p>Contact Address: {transaction.supplier.contactInfo}</p>
            <p>Address: {transaction.supplier.address}</p> 
           </div>
           )}

          <div className="section-card transaction-staus-update">
            <label>Status: </label>
            <select 
            value={status}
            onChange={(e)=> setStatus(e.target.value)}
            >
            <option value="PENDING">PENDING</option>
            <option value="PROCESSING">PROCESSING</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="CANCELLED">CANCELLED</option>
            </select>
            <button onClick={()=>handleUpdateStatus()}>Update Staus</button>
           </div>

          </>
        )}
      </div>

    </Layout>
  );

}

export default TransactionDetailsPage;