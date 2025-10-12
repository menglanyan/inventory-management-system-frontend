import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../common/Layout";
import ApiService from "../../service/ApiService";
import PaginationComponent from "../common/PaginationComponent";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("");
  const [valueToSearch, setValueToSearch] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // Pagination set-up
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const getTransactions = async () => {

      try {
        const transactionsData = await ApiService.getAllTransactions(valueToSearch);

        if (transactionsData.statusCode === 200) {
          setTotalPages(Math.ceil(transactionsData.transactions.length / itemsPerPage));

          setTransactions(
            transactionsData.transactions.slice(
              (currentPage - 1) * itemsPerPage,
              currentPage * itemsPerPage
            )
          );

        }

      } catch (error) {
        showMessage(error.response?.data?.message || "Failed to get transactions: " + error.message);
      }
    }

    getTransactions();
  }, [currentPage, valueToSearch])

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 4000);
  }

  // Handle search
  const handleSearch = () => {
    setCurrentPage(1);
    setValueToSearch(filter);
  }

  // Navigate to transaction details page
  const navigateToTransactionDetailsPage = (transactionId) => {
    navigate(`/transaction/${transactionId}`);
  }


  return (
    <Layout>

      {message && <div className="message">{message}</div>}

      <div className="transactions-page">

        <div className="transactions-header">
          <h1>Transactions</h1>

          <div className="transaction-search">
            <input
            placeholder="Search transaction"
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            />
            <button onClick={() => handleSearch()}>Search</button>
          </div>
        </div>

        {transactions && 
          <table className="transactions-table">
            <thead>
              <tr>
                <th>TYPE</th>
                <th>STATUS</th>
                <th>TOTAL PRICE</th>
                <th>QUANTATY</th>
                <th>DATE</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.transactionType}</td>
                  <td>{transaction.status}</td>
                  <td>{transaction.totalPrice.toFixed(2)}</td>
                  <td>{transaction.totalProducts}</td>
                  <td>{new Date(transaction.createdAt).toLocaleString()}</td>
                  <td>
                    <button onClick={() => navigateToTransactionDetailsPage(transaction.id)}>View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        }
        
      </div>

      <PaginationComponent
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
      />

    </Layout>
  );

}

export default TransactionsPage;